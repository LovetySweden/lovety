import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BrandHeader from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Fyll i din e-postadress" })
  .email({ message: "Ange en giltig e-postadress" })
  .max(255, { message: "E-postadressen är för lång" });

const Pilot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError(null);
    localStorage.setItem("lovety_email", result.data);
    navigate("/du-ar-med");
  };

  return (
    <main className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto max-w-3xl px-6 pb-24">
        <h1 className="font-serif text-3xl md:text-4xl text-primary">
          Bli först att veta när Lovety går att testa.
        </h1>
        <p className="mt-4 text-sm md:text-base">
          Lämna din e-post så hör vi av oss när vi öppnar anmälan till de första gratis
          pilotkvällarna i Stockholm.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 max-w-md">
          <label htmlFor="email" className="block mb-2 text-sm">
            E-post
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="namn@exempel.se"
            aria-invalid={!!error}
            className="h-12 rounded-full border-0 bg-card px-5 shadow-sm"
          />
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            className="mt-6 h-12 rounded-full px-8 text-lg"
          >
            Få förtur till piloten
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Pilot;
