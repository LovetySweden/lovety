
import ActivityCard from "./ActivityCard";

const activities = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    title: "Filosofikväll på café",
    date: "Torsdag, 18 maj",
    time: "18:30 - 21:30",
    location: "Stockholm"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    title: "Vandring i Tyresta",
    date: "Söndag, 21 maj",
    time: "10:00 - 14:00",
    location: "Tyresta"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Matlagningskurs",
    date: "Fredag, 19 maj",
    time: "18:00 - 22:00",
    location: "Stockholm",
    isFull: true
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "Vinprovning för nybörjare",
    date: "Lördag, 20 maj",
    time: "18:30 - 21:00",
    location: "Stockholm"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    title: "Paddla kajak",
    date: "Onsdag, 24 maj",
    time: "17:00 - 20:00",
    location: "Djurgården"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    title: "Tjejkväll med Spa",
    date: "Lördag, 27 maj",
    time: "17:00 - 21:00",
    location: "Stockholm",
    isFull: true
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
    title: "Dans för nybörjare",
    date: "Tisdag, 23 maj",
    time: "18:30 - 20:30",
    location: "Stockholm"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    title: "Cykeltur runt Mälaren",
    date: "Lördag, 3 juni",
    time: "09:00 - 16:00",
    location: "Stockholm"
  }
];

const ActivitiesSection = () => {
  return (
    <div className="bg-lovely-cream py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Aktiviteter</h2>
        <p className="mb-6">Delta i någon av våra populära aktiviteter och träffa nya vänner</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activities.map(activity => (
            <ActivityCard 
              key={activity.id}
              image={activity.image}
              title={activity.title}
              date={activity.date}
              time={activity.time}
              location={activity.location}
              isFull={activity.isFull}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSection;
