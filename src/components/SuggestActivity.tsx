
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const SuggestActivity = () => {
  return (
    <div className="bg-lovely-cream py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" 
              alt="People enjoying an activity" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="section-title">Föreslå en aktivitet</h2>
            <p className="mb-6">Tipsa oss om en aktivitet du skulle vilja se</p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="activity" className="block mb-1 font-medium">Aktivitet</label>
                <Input type="text" id="activity" placeholder="Aktivitetens namn" className="w-full" />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1 font-medium">Beskrivning</label>
                <Textarea id="description" placeholder="Beskriv aktiviteten..." className="w-full" rows={4} />
              </div>
              <Button className="bg-lovely-red hover:bg-opacity-90 w-full md:w-auto">Skicka förslag</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestActivity;
