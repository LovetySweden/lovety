
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lovely-cream text-gray-800 pt-10 pb-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-serif font-bold text-lovely-red">Lovely</h3>
            <p className="mt-2">Meningsfulla möten</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-lovely-red hover:text-opacity-80">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="Facebook" className="text-lovely-red hover:text-opacity-80">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="mb-6 md:mb-0">
              <h4 className="font-medium mb-3">Aktiviteter</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Kommande aktiviteter</a></li>
                <li><a href="#" className="hover:underline">Föreslå en aktivitet</a></li>
                <li><a href="#" className="hover:underline">Bli värd</a></li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h4 className="font-medium mb-3">Om oss</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Vår historia</a></li>
                <li><a href="#" className="hover:underline">Teamet</a></li>
                <li><a href="#" className="hover:underline">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Juridisk information</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Användarvillkor</a></li>
                <li><a href="#" className="hover:underline">Integritetspolicy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-lovely-beige pt-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Lovely. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
