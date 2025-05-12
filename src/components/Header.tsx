
import { Facebook } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="w-full absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center">
          <div className="text-white font-serif">
            <h1 className="text-3xl font-bold">Lovely</h1>
            <p className="text-sm">Meningsfulla möten</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="link" size="sm" className="text-white">Logga in</Button>
          <Button className="bg-lovely-red hover:bg-opacity-90">Bli medlem</Button>
          <div className="ml-2 flex items-center">
            <a href="#" aria-label="Facebook" className="text-white">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
