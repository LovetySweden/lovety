import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { Button } from "./ui/button";
import { Activity } from "./ActivityManager";

// Initial mock data
const initialActivities = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    title: "Filosofikväll på café",
    date: "Torsdag, 18 maj",
    time: "18:30 - 21:30",
    location: "Stockholm",
    description: "En avslappnad kväll med filosofiska diskussioner på ett mysigt café i centrala Stockholm.",
    price: "150 kr"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    title: "Vandring i Tyresta",
    date: "Söndag, 21 maj",
    time: "10:00 - 14:00",
    location: "Tyresta",
    description: "Upplev naturen i Tyresta nationalpark med en guidad vandring.",
    price: "200 kr"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Matlagningskurs",
    date: "Fredag, 19 maj",
    time: "18:00 - 22:00",
    location: "Stockholm",
    description: "Lär dig laga italiensk mat från grunden under ledning av en professionell kock.",
    price: "450 kr",
    isFull: true
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "Vinprovning för nybörjare",
    date: "Lördag, 20 maj",
    time: "18:30 - 21:00",
    location: "Stockholm",
    description: "Introduktion till vinets värld med fokus på röda viner från olika regioner.",
    price: "350 kr"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    title: "Paddla kajak",
    date: "Onsdag, 24 maj",
    time: "17:00 - 20:00",
    location: "Djurgården",
    description: "Utforska Stockholms vattenvägar från kajak. Utrustning och instruktör ingår.",
    price: "300 kr"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    title: "Tjejkväll med Spa",
    date: "Lördag, 27 maj",
    time: "17:00 - 21:00",
    location: "Stockholm",
    description: "En avkopplande kväll med spa-behandlingar, bubbel och snacks.",
    price: "500 kr",
    isFull: true
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
    title: "Dans för nybörjare",
    date: "Tisdag, 23 maj",
    time: "18:30 - 20:30",
    location: "Stockholm",
    description: "Grundläggande steg i pardans för nybörjare. Ingen partner krävs!",
    price: "200 kr"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    title: "Cykeltur runt Mälaren",
    date: "Lördag, 3 juni",
    time: "09:00 - 16:00",
    location: "Stockholm",
    description: "En vacker cykeltur runt delar av Mälaren med flera stopp för fika och bad.",
    price: "250 kr"
  }
];

const ActivitiesSection = () => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load activities from Google Sheet
  const fetchActivities = async () => {
    // URL for your Google Apps Script Web App
    const sheetUrl = "YOUR_GOOGLE_SHEET_READ_URL";

    setIsLoading(true);
    setError(null);

    try {
      // Try to fetch from Google Sheet
      const response = await fetch(sheetUrl);
      
      // If fetch fails or returns no data, use the initial activities
      if (!response.ok) {
        console.log("Using initial activities data");
        return;
      }
      
      const data = await response.json();
      
      // Only update activities if we got valid data
      if (Array.isArray(data) && data.length > 0) {
        setActivities(data);
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to load activities");
      // Keep using the initial activities on error
    } finally {
      setIsLoading(false);
    }
  };

  // Uncomment this to fetch from Google Sheet when component mounts
  /*
  useEffect(() => {
    fetchActivities();
  }, []);
  */

  return (
    <div className="bg-lovely-cream py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Aktiviteter</h2>
        <p className="mb-6">Delta i någon av våra populära aktiviteter och träffa nya vänner</p>
        
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
                isFull={activity.isFull}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesSection;
