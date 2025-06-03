
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { googleSheetService, ActivityDetails, ParticipantField } from '@/services/GoogleSheetService';
import { Card, CardContent } from "@/components/ui/card";
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
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'swish'>('card');
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  
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

  // Check if early bird price is still valid
  const isEarlyBirdValid = (earlyBirdUntil: string) => {
    const today = new Date();
    const untilDate = new Date(earlyBirdUntil);
    return today <= untilDate;
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
    setShowPaymentForm(true);
  };

  const handleRegisterInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Fel",
        description: "Vänligen fyll i alla obligatoriska fält",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const success = await googleSheetService.registerInterest(activityId, name, email);
      
      if (success) {
        toast({
          title: "Intresse registrerat",
          description: "Vi meddelar dig när aktiviteten släpps för bokning.",
        });
        
        // Reset form
        setName("");
        setEmail("");
        setShowInterestForm(false);
      } else {
        throw new Error("Failed to register interest");
      }
    } catch (error) {
      console.error("Error registering interest:", error);
      toast({
        title: "Fel",
        description: "Kunde inte registrera ditt intresse. Försök igen senare.",
        variant: "destructive"
      });
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    const requiredFields = activity.participantFields.filter(field => field.required);
    for (const field of requiredFields) {
      if (!formValues[field.id]) {
        toast({
          title: "Fel",
          description: `Vänligen fyll i fältet: ${field.name}`,
          variant: "destructive"
        });
        return;
      }
    }
    
    if (!termsAccepted) {
      toast({
        title: "Fel",
        description: "Du måste acceptera villkoren för att fortsätta",
        variant: "destructive"
      });
      return;
    }
    
    // Process payment
    try {
      const success = await googleSheetService.purchaseTicket(activityId, paymentMethod, formValues);
      
      if (success) {
        // In a real implementation, you would redirect to a payment gateway
        toast({
          title: "Betalning initierad",
          description: "Du kommer nu att omdirigeras till betalningssidan.",
        });
        
        // Simulate redirect to payment page
        setTimeout(() => {
          toast({
            title: "Betalning godkänd",
            description: "Din bokning har bekräftats!",
          });
          setShowPaymentForm(false);
          setFormValues({});
          setTermsAccepted(false);
        }, 2000);
      } else {
        throw new Error("Failed to process payment");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Betalningsfel",
        description: "Något gick fel vid betalningen. Försök igen senare.",
        variant: "destructive"
      });
    }
  };
  
  const renderFormField = (field: ParticipantField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id} className="block mb-1 text-sm font-medium">
              {field.name} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input 
              id={field.id}
              type={field.type === 'email' ? 'email' : 'text'} 
              value={formValues[field.id] || ''}
              onChange={(e) => setFormValues({...formValues, [field.id]: e.target.value})}
              required={field.required}
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id} className="block mb-1 text-sm font-medium">
              {field.name} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <select 
              id={field.id}
              className="w-full border rounded-md p-2"
              value={formValues[field.id] || ''}
              onChange={(e) => setFormValues({...formValues, [field.id]: e.target.value})}
              required={field.required}
            >
              <option value="">Välj ett alternativ</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center mb-4">
            <Checkbox 
              id={field.id}
              checked={formValues[field.id] === 'true'}
              onCheckedChange={(checked) => 
                setFormValues({...formValues, [field.id]: checked ? 'true' : 'false'})
              }
            />
            <Label htmlFor={field.id} className="ml-2 text-sm">
              {field.name} {field.required && <span className="text-red-500">*</span>}
            </Label>
          </div>
        );
      default:
        return null;
    }
  };

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
                  {activity.earlyBirdPrice && activity.earlyBirdUntil ? (
                    <div>
                      {isEarlyBirdValid(activity.earlyBirdUntil) ? (
                        <>
                          <p className="text-lovely-red font-medium">{activity.earlyBirdPrice} (t.o.m. {activity.earlyBirdUntil})</p>
                          <p className="text-lovely-slate">Ordinarie: {activity.price}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-lovely-slate line-through">{activity.earlyBirdPrice} (t.o.m. {activity.earlyBirdUntil})</p>
                          <p className="text-lovely-slate">{activity.price}</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-lovely-slate">{activity.price}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Om aktiviteten</h3>
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
                showPaymentForm ? (
                  <Card className="mt-6 max-w-2xl">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-4">Boka biljett</h3>
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        {/* Participant information fields */}
                        {activity.participantFields.map(renderFormField)}
                        
                        {/* Payment method selection */}
                        <div className="mb-6">
                          <h4 className="text-lg font-medium mb-2">Betalningsmetod</h4>
                          <RadioGroup 
                            value={paymentMethod} 
                            onValueChange={(value) => setPaymentMethod(value as 'card' | 'swish')}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card">Kortbetalning</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="swish" id="swish" />
                              <Label htmlFor="swish">Swish</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {/* Terms and conditions */}
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="terms" 
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(!!checked)} 
                          />
                          <Label htmlFor="terms" className="text-sm">
                            Jag accepterar <a href="#" className="text-lovely-red underline">villkoren</a> för denna aktivitet
                          </Label>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            type="submit" 
                            className="bg-lovely-red text-white"
                          >
                            Betala {activity.earlyBirdPrice && activity.earlyBirdUntil && isEarlyBirdValid(activity.earlyBirdUntil) ? activity.earlyBirdPrice : activity.price}
                          </Button>
                          <Button 
                            type="button"
                            variant="outline" 
                            onClick={() => setShowPaymentForm(false)}
                          >
                            Avbryt
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                ) : (
                  <Button 
                    className="bg-lovely-red text-white px-8 py-3 text-lg"
                    onClick={handleBuyTicket}
                  >
                    Köp biljett
                  </Button>
                )
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
