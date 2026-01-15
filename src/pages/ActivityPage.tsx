
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { googleSheetService, ActivityDetails } from '@/services/GoogleSheetService';
import InterestRegistration from '@/components/InterestRegistration';
import { MapPin } from 'lucide-react';

const ActivityPage = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = parseInt(id || "0");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activity, setActivity] = useState<ActivityDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showInterestForm, setShowInterestForm] = useState(false);
  
  // Fetch activity details
  useEffect(() => {
    const fetchActivity = async () => {
      setIsLoading(true);
      try {
        const activityData = await googleSheetService.fetchActivityDetails(activityId);
        if (activityData) {
          setActivity(activityData);
          setError(null);
        } else {
          setError("Aktiviteten kunde inte hittas");
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
        setError("Kunde inte ladda aktiviteten");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchActivity();
  }, [activityId]);

  // Check if early bird price is still valid using the expiry date
  const isEarlyBirdValid = (earlyBirdExpiryDate: string) => {
    const today = new Date();
    const expiryDate = new Date(earlyBirdExpiryDate);
    return today <= expiryDate;
  };

  // Generate early bird display text from expiry date
  const getEarlyBirdDisplayText = (earlyBirdExpiryDate: string) => {
    const expiryDate = new Date(earlyBirdExpiryDate);
    const day = expiryDate.getDate();
    const months = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
    const month = months[expiryDate.getMonth()];
    return `Early Bird pris - gäller till ${day} ${month}`;
  };

  // Create Google Maps link
  const getGoogleMapsLink = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-24">
          <p>Laddar aktivitet...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{error || "Aktiviteten kunde inte hittas"}</h1>
            <Button className="bg-lovely-red hover:bg-opacity-90" onClick={() => navigate('/')}>
              Tillbaka till startsidan
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyTicket = () => {
    if (activity.externalPaymentLink) {
      window.open(activity.externalPaymentLink, '_blank');
    } else {
      toast({
        title: "Fel",
        description: "Betalningslänk saknas för denna aktivitet.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-24 pb-12 px-4 md:px-8 bg-lovely-beige/30">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: '#C0392B' }}>{activity.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Datum & Tid</h3>
                  <p className="text-lovely-slate">{activity.date}</p>
                  <p className="text-lovely-slate">{activity.time}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Plats</h3>
                  <p className="text-lovely-slate">{activity.location}</p>
                  {activity.address && (
                    <a 
                      href={getGoogleMapsLink(activity.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-lovely-red hover:underline mt-1"
                    >
                      <MapPin size={16} className="mr-1" />
                      {activity.address}
                    </a>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Pris</h3>
                  {activity.earlyBirdPrice && activity.earlyBirdExpiryDate ? (
                    <div>
                      {isEarlyBirdValid(activity.earlyBirdExpiryDate) ? (
                        <>
                          <p className="font-medium" style={{ color: '#C0392B' }}>
                            {activity.earlyBirdPrice} {getEarlyBirdDisplayText(activity.earlyBirdExpiryDate)}
                          </p>
                          <p className="text-lovely-slate">Ordinarie: {activity.price}</p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium" style={{ color: '#C0392B' }}>{activity.price}</p>
                          <p className="text-lovely-slate line-through">
                            {activity.earlyBirdPrice} {getEarlyBirdDisplayText(activity.earlyBirdExpiryDate)}
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="font-medium" style={{ color: '#C0392B' }}>{activity.price}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">{activity.activityHeading || "Om aktiviteten"}</h3>
                <p className="text-lovely-slate whitespace-pre-line">{activity.description}</p>
              </div>
              
              {activity.isFull ? (
                <Button 
                  className="bg-lovely-sage text-white px-8 py-3 text-lg"
                  disabled
                >
                  Fullbokad
                </Button>
              ) : activity.isOnSale ? (
                <Button 
                  className="bg-lovely-red text-white px-8 py-3 text-lg"
                  onClick={handleBuyTicket}
                >
                  Köp biljett
                </Button>
              ) : (
                <div>
                  {showInterestForm ? (
                    <InterestRegistration 
                      activityTitle={activity.title}
                      onClose={() => setShowInterestForm(false)}
                    />
                  ) : (
                    <div>
                      <Button 
                        className="bg-lovely-coral text-white px-8 py-3 text-lg"
                        onClick={() => setShowInterestForm(true)}
                      >
                        Anmäl intresse
                      </Button>
                      <p className="italic text-lovely-slate mt-2 text-sm">
                        du får ett meddelande när biljetterna släpps och kan vara först till kvarn.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ActivityPage;
