
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

interface InterestRegistrationProps {
  activityTitle: string;
  onClose: () => void;
}

const InterestRegistration = ({ activityTitle, onClose }: InterestRegistrationProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Fel",
        description: "Vänligen fyll i alla fält",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to info@singelaktiviteter.se
      const emailBody = `Ny intresseanmälan för: ${activityTitle}\n\nNamn: ${name}\nE-post: ${email}`;
      
      // In a real implementation, you would send this to a backend service
      // For now, we'll simulate the request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error sending interest registration:", error);
      toast({
        title: "Fel",
        description: "Kunde inte skicka intresseanmälan. Försök igen senare.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md border rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4">Tack!</h3>
        <p className="mb-4">Tack för att du visat intresse, vi hör av oss när biljettförsäljningen öppnar för denna aktivitet.</p>
        <Button 
          onClick={onClose}
          className="bg-lovely-red text-white"
        >
          Stäng
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md border rounded-lg p-6 bg-white">
      <h3 className="text-lg font-medium mb-4">Anmäl intresse</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">Namn</label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">E-post</label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="flex gap-2">
          <Button 
            type="submit" 
            className="bg-lovely-red text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Skickar..." : "Skicka"}
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Avbryt
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InterestRegistration;
