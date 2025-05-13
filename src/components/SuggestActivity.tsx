
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const SuggestActivity = () => {
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate mailto link
    const subject = encodeURIComponent("Förslag på aktivitet");
    const body = encodeURIComponent(`
      Aktivitet: ${activity}
      Beskrivning: ${description}
      Ålder: ${age}
    `);
    
    // Open the user's email client
    window.location.href = `mailto:info@ingelaktiviteter.se?subject=${subject}&body=${body}`;
    
    // Show success toast
    toast({
      title: "Tack för ditt förslag!",
      description: "Din e-postklient har öppnats för att skicka ditt förslag.",
    });
    
    // Reset form
    setActivity("");
    setDescription("");
    setAge("");
  };

  return (
    <div className="bg-lovely-beige py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Föreslå en aktivitet</h2>
        <p className="mb-6">Har du en idé för en aktivitet? Fyll i formuläret nedan så hör vi av oss!</p>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <label htmlFor="activity" className="block mb-1 font-medium">Aktivitet</label>
            <input 
              type="text" 
              id="activity" 
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded" 
            />
          </div>
          <div>
            <label htmlFor="age" className="block mb-1 font-medium">Ålder</label>
            <input 
              type="text" 
              id="age" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded" 
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block mb-1 font-medium">Beskrivning</label>
            <textarea 
              id="description" 
              rows={4} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded"
            ></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-lovely-red text-white px-8 py-3 rounded hover:bg-opacity-90 transition-all">
              Skicka
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuggestActivity;
