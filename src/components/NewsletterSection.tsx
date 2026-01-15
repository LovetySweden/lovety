
import { useEffect, useState} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useLocation } from 'react-router-dom';

const NewsletterSection = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hash = location.hash;
    if (hash == '#newsletter') {
      const element = document.getElementById("newsletter");
      if (element) {
        const navigate = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(navigate);
      }
    }
  }, [location]);

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

      const subject = encodeURIComponent("Prenumeration på nyhetsbrev");
      const body = encodeURIComponent(`
Namn: ${name}
Email: ${email}
    `);

      // Open the user's email client
      window.location.href = `mailto:info@singelaktiviteter.se?subject=${subject}&body=${body}`;

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
    <div id="newsletter" className="bg-white py-12 px-4 md:px-8 scroll-mt-24">
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
