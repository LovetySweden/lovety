
import { CheckCircle } from "lucide-react";

const features = [
  {
    id: 1,
    text: "Gemenskap: Lär dig mer och utvecklas tillsammans med andra",
  },
  {
    id: 2,
    text: "Trygghet: Vi anordnar aktiviteter där alla får vara sig själva",
  },
  {
    id: 3,
    text: "Aktiviteter: Allt ifrån fikaträffar till promenader och fester",
  },
  {
    id: 4,
    text: "Kvalitetskontroll: Trots få anställda, säkrar vi att alla aktiviteter har hög kvalitet",
  },
  {
    id: 5,
    text: "Personanpassat: Träffa människor som har liknande intressen som dig",
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Rösta på kommande aktiviteter</h2>
        <p className="mb-6">Har du preferenser på aktiviteter? Rösta på nedanstående eller föreslå egna!</p>
        
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
