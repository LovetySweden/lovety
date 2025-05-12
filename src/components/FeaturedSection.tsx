
import { Button } from "./ui/button";

const FeaturedSection = () => {
  return (
    <div className="bg-lovely-beige py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Lovely är för dig som vill hitta nya vänner</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-lg mb-4">
              Det finns vägar, stigar och gångar man aldrig skulle ha provat om man inte hittat någon att följa.
            </p>
            <p className="mb-6">
              Lovely är en mötesplats där du kan träffa nya vänner genom roliga och intressanta aktiviteter. Det är lättare att lära känna folk när man har något gemensamt att göra och prata om.
            </p>
            <p className="mb-6">
              I stället för att träffas "på måfå" erbjuder Lovely aktiviteter där du enkelt får kontakt med nya människor.
            </p>
            <p className="mb-6">
              Våra värdar ser till att skapa en trygg plats att mötas på.
            </p>
            <Button className="bg-lovely-red hover:bg-opacity-90">Se alla aktiviteter</Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b" 
              alt="People biking together" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
