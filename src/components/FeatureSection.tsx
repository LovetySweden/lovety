
import { CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const initialFeatures = [
  {
    id: 1,
    text: "Gemenskap: Lär dig mer och utvecklas tillsammans med andra",
    votes: 12,
  },
  {
    id: 2,
    text: "Trygghet: Vi anordnar aktiviteter där alla får vara sig själva",
    votes: 8,
  },
  {
    id: 3,
    text: "Aktiviteter: Allt ifrån fikaträffar till promenader och fester",
    votes: 15,
  },
  {
    id: 4,
    text: "Kvalitetskontroll: Trots få anställda, säkrar vi att alla aktiviteter har hög kvalitet",
    votes: 5,
  },
  {
    id: 5,
    text: "Personanpassat: Träffa människor som har liknande intressen som dig",
    votes: 10,
  },
];

const FeatureSection = () => {
  const [features, setFeatures] = useState(initialFeatures);

  const handleVote = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id 
      ? { ...feature, votes: feature.votes + 1 } 
      : feature
    ));
  };

  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Rösta på kommande aktiviteter</h2>
        <p className="mb-6">Har du preferenser på aktiviteter? Rösta på nedanstående eller föreslå egna!</p>
        
        <ul className="space-y-4 max-w-2xl">
          {features.map((feature) => (
            <li key={feature.id} className="flex items-start group">
              <Button 
                onClick={() => handleVote(feature.id)}
                variant="ghost" 
                className="h-auto p-1 mr-2 text-lovely-red hover:text-lovely-red hover:bg-lovely-beige/50"
              >
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
              </Button>
              <div className="flex-1">
                <span>{feature.text}</span>
              </div>
              <span className="bg-lovely-beige rounded-full px-3 py-1 text-sm">
                {feature.votes} röster
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureSection;
