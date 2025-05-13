import { useState } from "react";

const SuggestActivity = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", { name, email, age, phone, activity });
    // You can add your submission logic here, such as sending the data to an API
  };

  return (
    <div className="bg-lovely-beige py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Föreslå en aktivitet</h2>
        <p className="mb-6">Har du en idé för en aktivitet? Fyll i formuläret nedan så hör vi av oss!</p>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Namn</label>
            <input type="text" id="name" className="w-full border border-gray-300 px-4 py-2 rounded" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 px-4 py-2 rounded" />
          </div>
          <div>
            <label htmlFor="age" className="block mb-1 font-medium">Ålder</label>
            <input type="number" id="age" min="18" max="120" className="w-full border border-gray-300 px-4 py-2 rounded" />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">Telefon</label>
            <input type="tel" id="phone" className="w-full border border-gray-300 px-4 py-2 rounded" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="activity" className="block mb-1 font-medium">Beskriv din idé</label>
            <textarea id="activity" rows={4} className="w-full border border-gray-300 px-4 py-2 rounded"></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="bg-lovely-red text-white px-8 py-3 rounded hover:bg-opacity-90 transition-all">Skicka</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuggestActivity;
