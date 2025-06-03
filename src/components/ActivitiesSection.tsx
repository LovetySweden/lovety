
import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { Button } from "./ui/button";
import { Activity } from "@/types/activities";
import { useToast } from "./ui/use-toast";
import { googleSheetService } from "@/services/GoogleSheetService";
import { Link as ScrollLink } from "react-scroll";

const ActivitiesSection = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to load activities from Google Sheet
  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await googleSheetService.fetchActivities();

      if (Array.isArray(data) && data.length > 0) {
        setActivities(data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to load activities");
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda aktiviteter. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch activities when component mounts
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="bg-lovely-cream py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Aktiviteter</h2>
        <p className="mb-6">
          Delta i någon av våra populära aktiviteter och träffa andra singlar med liknande intressen. 
          Du kan också{" "}
          <ScrollLink to="vote" smooth={true} duration={500} className="text-lovely-red hover:underline cursor-pointer">
            rösta på kommande aktiviteter
          </ScrollLink>
          {" "}eller{" "}
          <ScrollLink to="suggest-activity" smooth={true} duration={500} className="text-lovely-red hover:underline cursor-pointer">
            föreslå en aktivitet
          </ScrollLink>
          .
        </p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-lg">Laddar aktiviteter...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchActivities} className="bg-lovely-red hover:bg-opacity-90">
              Försök igen
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activities.map(activity => (
              <ActivityCard
                key={activity.id}
                id={activity.id}
                image={activity.image}
                title={activity.title}
                date={activity.date}
                time={activity.time}
                location={activity.location}
                price={activity.price}
                isFull={activity.isFull}
                isOnSale={activity.isOnSale !== false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesSection;
