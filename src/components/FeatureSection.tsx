
import { CheckCircle } from "lucide-react";

const features = [
  {
    id: 1,
    text: "Gemenskap: Lär känna nya människor i en trygg miljö",
  },
  {
    id: 2,
    text: "Trygghet: Våra värdar skapar en välkomnande atmosfär",
  },
  {
    id: 3,
    text: "Variation: Från kaféträffar till matlagning och äventyr",
  },
  {
    id: 4,
    text: "Personligt: Hitta aktiviteter som matchar dina intressen",
  },
  {
    id: 5,
    text: "Flexibilitet: Aktiviteter både vardag och helg, dag och kväll",
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Så fungerar det</h2>
        <p className="mb-6">Lovely gör det enkelt att träffa nya vänner</p>
        
        <ul className="space-y-4 max-w-2xl">
          {features.map((feature) => (
            <li key={feature.id} className="flex items-start">
              <CheckCircle className="h-6 w-6 text-lovely-red mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureSection;
