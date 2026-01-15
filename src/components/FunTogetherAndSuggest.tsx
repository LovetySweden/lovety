import { useState } from "react";
import { useToast } from "./ui/use-toast";

const FunTogetherAndSuggest = () => {
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("Förslag på aktivitet");
    const body = encodeURIComponent(`
Aktivitet: ${activity}
Beskrivning: ${description}
Ålder: ${age}
    `);

    window.location.href = `mailto:info@singelaktiviteter.se?subject=${subject}&body=${body}`;

    toast({
      title: "Tack för ditt förslag!",
      description: "Din e-postklient har öppnats för att skicka ditt förslag.",
    });

    setActivity("");
    setDescription("");
    setAge("");
  };

  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Fun Together - Left Column */}
          <div>
            <h2 className="section-title">Ett sätt att <i>träffas</i> och ha roligt tillsammans</h2>
            <div className="max-w-xl">
              <p className="text-lg mb-4">
                Trött på ytliga dating appar? Krystade dejter?
              </p>
              <p className="mb-6">
                Lovety är en mötesplats där du kan vara dig själv, träffa och lära känna andra singlar under avslappnade former.
              </p>
              <p className="mb-6">
                Det finns något för alla, både den som föredrar mer stillsamma event och den som älskar det fartfyllda!
              </p>
              <p className="mb-6">
                Våga utmana dig och träffa nya människor under roliga aktiviteter och event i Umeå!
              </p>
              <p className="mb-6">
                PS - vi styr upp det, så du behöver inte oroa dig för att ta initiativ för samtal själv.
              </p>
            </div>
          </div>

          {/* Suggest Activity - Right Column */}
          <div>
            <h2 className="section-title">Föreslå en aktivitet</h2>
            <p className="mb-6">Har du en idé för en aktivitet? Fyll i formuläret nedan så hör vi av oss!</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default FunTogetherAndSuggest;
