
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data - in a real application this would come from an API
const activities = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    title: "Filosofikväll på café",
    date: "Torsdag, 18 maj",
    time: "18:30 - 21:30",
    location: "Stockholm",
    description: "En avslappnad kväll med filosofiska diskussioner på ett mysigt café i centrala Stockholm. Alla är välkomna oavsett tidigare erfarenhet av filosofi.",
    price: "150 kr",
    isFull: false
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    title: "Vandring i Tyresta",
    date: "Söndag, 21 maj",
    time: "10:00 - 14:00",
    location: "Tyresta",
    description: "Upplev naturen i Tyresta nationalpark med en guidad vandring. Vi samlas vid entrén och går en vacker led tillsammans.",
    price: "200 kr",
    isFull: false
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
    price: "350 kr",
    isFull: false
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    title: "Paddla kajak",
    date: "Onsdag, 24 maj",
    time: "17:00 - 20:00",
    location: "Djurgården",
    description: "Utforska Stockholms vattenvägar från kajak. Utrustning och instruktör ingår.",
    price: "300 kr",
    isFull: false
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
    price: "200 kr",
    isFull: false
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    title: "Cykeltur runt Mälaren",
    date: "Lördag, 3 juni",
    time: "09:00 - 16:00",
    location: "Stockholm",
    description: "En vacker cykeltur runt delar av Mälaren med flera stopp för fika och bad.",
    price: "250 kr",
    isFull: false
  }
];

const ActivityPage = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = parseInt(id || "0");
  
  const activity = activities.find(a => a.id === activityId);
  
  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Aktiviteten kunde inte hittas</h1>
            <Button className="bg-lovely-red hover:bg-opacity-90" onClick={() => window.history.back()}>
              Tillbaka
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-24 pb-12 px-4 md:px-8 bg-lovely-beige/30">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img 
                src={activity.image} 
                alt={activity.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{activity.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Datum & Tid</h3>
                  <p className="text-lovely-slate">{activity.date}</p>
                  <p className="text-lovely-slate">{activity.time}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Plats</h3>
                  <p className="text-lovely-slate">{activity.location}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Pris</h3>
                  <p className="text-lovely-slate">{activity.price}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Om aktiviteten</h3>
                <p className="text-lovely-slate">{activity.description}</p>
              </div>
              
              <Button 
                className={`${activity.isFull ? 'bg-lovely-sage' : 'bg-lovely-red'} text-white px-8 py-3 text-lg`}
                disabled={activity.isFull}
              >
                {activity.isFull ? 'Fullbokad' : 'Köp biljett'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ActivityPage;
