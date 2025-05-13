
import { Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/e9c116e9-57ac-444d-8203-0ff5a6eeaf66.png"
            alt="Lovety Logo"
            className="h-12 mr-3"
          />
          <div className="text-white font-serif">
            <h1 className="text-3xl font-bold">Lovety</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            className="bg-lovely-red hover:bg-opacity-90"
            onClick={scrollToNewsletter}
          >
            Get our newsletter
          </Button>
          <div className="ml-2 flex items-center space-x-2">
            <a href="https://www.facebook.com/profile.php?id=61571042866497" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/lovetysweden/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
