
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const NewsletterSection = () => {
  return (
    <div className="bg-lovely-beige py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Prenumerera på vårt nyhetsbrev</h2>
        <p className="mb-6">Få inspiration och tips om kommande aktiviteter direkt i din inbox</p>
        
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Namn</label>
            <Input type="text" id="name" placeholder="Ditt namn" className="w-full" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <Input type="email" id="email" placeholder="Din e-post" className="w-full" />
          </div>
          <div className="flex items-end">
            <Button className="bg-lovely-red hover:bg-opacity-90 w-full">Prenumerera</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
