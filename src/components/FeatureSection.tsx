
import { ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { useToast } from "./ui/use-toast";

const initialFeatures = [
  {
    id: 1,
    text: "Gemenskap: Lär dig mer och utvecklas tillsammans med andra",
    votes: 12,
  },
  {
    id: 2,
    text: "Trygghet: Vi anordnar aktiviteter där alla får vara sig själva",
    votes: 8,
  },
  {
    id: 3,
    text: "Aktiviteter: Allt ifrån fikaträffar till promenader och fester",
    votes: 15,
  },
  {
    id: 4,
    text: "Kvalitetskontroll: Trots få anställda, säkrar vi att alla aktiviteter har hög kvalitet",
    votes: 5,
  },
  {
    id: 5,
    text: "Personanpassat: Träffa människor som har liknande intressen som dig",
    votes: 10,
  },
];

// Local storage key for votes
const VOTED_FEATURES_KEY = "lovely_voted_features";

const FeatureSection = () => {
  const [features, setFeatures] = useState(initialFeatures);
  const [votedFeatures, setVotedFeatures] = useState<number[]>([]);
  const { toast } = useToast();

  // Load previously voted features from local storage
  useEffect(() => {
    const savedVotes = localStorage.getItem(VOTED_FEATURES_KEY);
    if (savedVotes) {
      setVotedFeatures(JSON.parse(savedVotes));
    }
  }, []);

  const handleVote = (id: number) => {
    // Check if user already voted for this feature
    if (votedFeatures.includes(id)) {
      return;
    }
    
    // Update votes
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
  };

  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Rösta på kommande aktiviteter</h2>
        <p className="mb-6">Har du preferenser på aktiviteter? Rösta på nedanstående eller föreslå egna!</p>
        
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
                    {hasVoted && (
                      <HoverCardContent className="text-sm">
                        Du har redan röstat på denna aktivitet
                      </HoverCardContent>
                    )}
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
      </div>
    </div>
  );
};

export default FeatureSection;
