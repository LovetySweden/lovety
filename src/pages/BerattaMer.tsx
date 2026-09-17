import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import BrandHeader from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  age: z
    .string()
    .regex(/^\d+$/, { message: "Ålder får bara innehålla siffror" })
    .refine((v) => Number(v) >= 18 && Number(v) <= 99, {
      message: "Ange en ålder mellan 18 och 99",
    }),
  gender: z.string().min(1, { message: "Välj ett alternativ" }),
  seeking: z.string().min(1, { message: "Välj ett alternativ" }),
  stockholm: z.string().min(1, { message: "Välj ett alternativ" }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const fieldClass = "h-11 rounded-full border-0 bg-card px-5 shadow-sm";

const BerattaMer = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [seeking, setSeeking] = useState("");
  const [stockholm, setStockholm] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ age, gender, seeking, stockholm });
    if (!result.success) {
      const next: Errors = {};
      result.error.issues.forEach((i) => {
        next[i.path[0] as keyof Errors] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    localStorage.setItem("lovety_profile", JSON.stringify(result.data));
    navigate("/tack");
  };

  return (
    <main className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto max-w-3xl px-6 pb-24">
        <h1 className="font-serif text-3xl text-primary">Berätta lite om dig själv</h1>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-5">
          <div>
            <label htmlFor="age" className="mb-2 block text-sm">
              Ålder
            </label>
            <Input
              id="age"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
              className={fieldClass}
              placeholder="Ex. 34"
            />
            {errors.age && <p className="mt-1 text-sm text-destructive">{errors.age}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm">Kön</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className={fieldClass}>
                <SelectValue placeholder="Välj" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kvinna">Kvinna</SelectItem>
                <SelectItem value="Man">Man</SelectItem>
                <SelectItem value="Annat">Annat</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="mt-1 text-sm text-destructive">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm">Vill träffa</label>
            <Select value={seeking} onValueChange={setSeeking}>
              <SelectTrigger className={fieldClass}>
                <SelectValue placeholder="Välj" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kvinnor">Kvinnor</SelectItem>
                <SelectItem value="Män">Män</SelectItem>
                <SelectItem value="Båda">Båda</SelectItem>
              </SelectContent>
            </Select>
            {errors.seeking && (
              <p className="mt-1 text-sm text-destructive">{errors.seeking}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm">Bor du i Stockholmsområdet?</label>
            <Select value={stockholm} onValueChange={setStockholm}>
              <SelectTrigger className={fieldClass}>
                <SelectValue placeholder="Välj" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ja">Ja</SelectItem>
                <SelectItem value="Nej">Nej</SelectItem>
              </SelectContent>
            </Select>
            {errors.stockholm && (
              <p className="mt-1 text-sm text-destructive">{errors.stockholm}</p>
            )}
          </div>

          <div>
            <Button type="submit" className="h-12 rounded-full px-10 text-lg">
              Spara mina svar
            </Button>
            <div className="mt-5">
              <Link to="/tack" className="text-primary/80 underline">
                Gör det senare
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default BerattaMer;
