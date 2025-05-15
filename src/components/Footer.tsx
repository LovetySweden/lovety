
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lovely-beige text-lovely-slate border-t border-lovely-sage/20 pt-10 pb-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-serif font-bold text-lovely-red">Lovety</h3>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.instagram.com/lovetysweden/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-lovely-red hover:text-opacity-80">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61571042866497" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-lovely-red hover:text-opacity-80">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-lovely-sage/20 pt-4 text-sm text-lovely-slate">
          <p>© {new Date().getFullYear()} Lovety. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
