
import { Facebook } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="w-full bg-lovely-beige border-b border-lovely-sage/20">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center">
          <div className="text-lovely-red font-serif">
            <h1 className="text-3xl font-bold">Lovely</h1>
            <p className="text-sm">Träffa nya vänner</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="link" size="sm" className="text-lovely-slate">Logga in</Button>
          <Button className="bg-lovely-red hover:bg-opacity-90">Bli medlem</Button>
          <div className="ml-2 flex items-center">
            <a href="#" aria-label="Facebook" className="text-lovely-red">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
