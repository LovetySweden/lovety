
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const NewsletterSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Vänligen fyll i alla fält",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send email to info@singelaktiviteter.se
      const emailData = {
        to: "info@singelaktiviteter.se",
        subject: "Newsletter subscription",
        body: `Ny prenumeration på nyhetsbrev:\n\nNamn: ${name}\nE-post: ${email}\nDatum: ${new Date().toLocaleString()}`
      };
      
      // In a real implementation, this would be sent to a backend service
      console.log("Newsletter subscription:", emailData);
      
      // Clear form and show success message
      setName("");
      setEmail("");
      toast({
        title: "Tack!",
        description: "Tack för din prenumeration på vårt nyhetsbrev!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Fel",
        description: "Något gick fel. Vänligen försök igen senare.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="newsletter" className="bg-lovely-beige py-12 px-4 md:px-8 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="section-title">Prenumerera på vårt nyhetsbrev</h2>
        <p className="mb-6">Få nya aktiviteter direkt i din inkorg</p>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Namn</label>
            <Input 
              type="text" 
              id="name" 
              placeholder="Ditt namn" 
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Din e-post" 
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              type="submit" 
              className="bg-lovely-red hover:bg-opacity-90 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Skickar..." : "Prenumerera"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
