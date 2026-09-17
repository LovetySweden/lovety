import { Link } from "react-router-dom";
import BrandHeader from "@/components/BrandHeader";

const DuArMed = () => (
  <main className="min-h-screen bg-background">
    <BrandHeader />
    <div className="container mx-auto max-w-3xl px-6 pb-24">
      <h1 className="font-serif text-4xl text-primary">Du är med!</h1>
      <h2 className="mt-6 text-2xl text-primary">Vill du berätta lite mer om dig själv?</h2>
      <p className="mt-6 text-sm md:text-base">
        Det hjälper oss när vi sätter ihop de första pilotgrupperna.
      </p>
      <Link
        to="/berätta-mer"
        className="mt-8 inline-block rounded-full bg-primary px-10 py-3 text-lg text-primary-foreground transition-opacity hover:opacity-90"
      >
        Fortsätt - ca 30 sek
      </Link>
      <div className="mt-5">
        <Link to="/tack" className="text-primary/80 underline">
          Gör det senare
        </Link>
      </div>
    </div>
  </main>
);

export default DuArMed;
