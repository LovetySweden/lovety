
import { ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { useToast } from "./ui/use-toast";
import { googleSheetService, VoteActivity } from "@/services/GoogleSheetService";

// Local storage key for votes
const VOTED_FEATURES_KEY = "lovety_voted_features";

const FeatureSection = () => {
  const [features, setFeatures] = useState<VoteActivity[]>([]);
  const [votedFeatures, setVotedFeatures] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load previously voted features from local storage
  useEffect(() => {
    const savedVotes = localStorage.getItem(VOTED_FEATURES_KEY);
    if (savedVotes) {
      setVotedFeatures(JSON.parse(savedVotes));
    }
  }, []);

  // Fetch upcoming activities to vote on
  const fetchVoteActivities = async () => {
    setIsLoading(true);
    try {
      const data = await googleSheetService.fetchVoteActivities();
      if (Array.isArray(data)) {
        setFeatures(data);
      }
    } catch (error) {
      console.error("Error fetching vote activities:", error);
      toast({
        title: "Fel",
        description: "Kunde inte ladda aktiviteter att rösta på. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch activities when component mounts
  useEffect(() => {
    fetchVoteActivities();
  }, []);

  const handleVote = async (id: number) => {
    // Check if user already voted for this feature
    if (votedFeatures.includes(id)) {
      return;
    }
    
    try {
      const success = await googleSheetService.addVote(id);
      
      if (success) {
        // Update votes locally
        setFeatures(features.map(feature => 
          feature.id === id 
          ? { ...feature, votes: feature.votes + 1 } 
          : feature
        ));
        
        // Save vote in state and local storage
        const updatedVotes = [...votedFeatures, id];
        setVotedFeatures(updatedVotes);
        localStorage.setItem(VOTED_FEATURES_KEY, JSON.stringify(updatedVotes));
        
        // Show success toast
        toast({
          title: "Tack för din röst!",
          description: "Din röst har registrerats.",
        });
      } else {
        throw new Error("Failed to register vote");
      }
    } catch (error) {
      console.error("Error adding vote:", error);
      toast({
        title: "Fel",
        description: "Kunde inte registrera din röst. Försök igen senare.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Rösta på kommande aktiviteter</h2>
        <p className="mb-6">Har du preferenser på aktiviteter? Rösta på nedanstående eller föreslå egna!</p>
        
        {isLoading ? (
          <div className="flex justify-center py-6">
            <p>Laddar aktiviteter att rösta på...</p>
          </div>
        ) : (
          <ul className="space-y-4 max-w-2xl">
            {features.map((feature) => {
              const hasVoted = votedFeatures.includes(feature.id);
              
              return (
                <li key={feature.id} className="flex items-center group">
                  <div className="flex items-center mr-3">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div>
                          <Button 
                            onClick={() => handleVote(feature.id)}
                            variant="ghost" 
                            className={`h-auto p-1 ${hasVoted ? 'text-lovely-red' : 'text-gray-400'} hover:text-lovely-red hover:bg-lovely-beige/50`}
                            disabled={hasVoted}
                          >
                            <ThumbsUp className="h-6 w-6 flex-shrink-0" />
                          </Button>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="text-sm">
                        {hasVoted ? 'Du har redan röstat på denna aktivitet' : 'Klicka för att rösta på denna aktivitet'}
                      </HoverCardContent>
                    </HoverCard>
                    
                    <span className="bg-lovely-beige rounded-full px-3 py-1 text-sm">
                      {feature.votes}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <span>{feature.text}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeatureSection;
