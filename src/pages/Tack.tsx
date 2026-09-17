import { useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import BrandHeader from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.string().trim().email().max(255);

const Tack = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const addEmail = (value: string) => {
    const parts = value
      .split(/[,;\s]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length === 0) return true;

    const valid: string[] = [];
    for (const part of parts) {
      const result = emailSchema.safeParse(part);
      if (!result.success) {
        setError(`"${part}" är inte en giltig e-postadress`);
        return false;
      }
      if (!emails.includes(result.data) && !valid.includes(result.data)) {
        valid.push(result.data);
      }
    }
    setEmails([...emails, ...valid]);
    setError(null);
    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      if (addEmail(draft)) setDraft("");
    } else if (e.key === "Backspace" && draft === "" && emails.length > 0) {
      setEmails(emails.slice(0, -1));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const all = draft.trim() ? [...emails] : emails;
    if (draft.trim()) {
      if (!addEmail(draft)) return;
      setDraft("");
    }
    if (all.length === 0 && !draft.trim()) {
      setError("Lägg till minst en e-postadress");
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto max-w-3xl px-6 pb-24">
        <h1 className="font-serif text-4xl text-primary">Klart! Tack för dina svar.</h1>
        <p className="mt-6 text-sm md:text-base">
          Vi hör av oss när vi öppnar anmälan till piloten.
        </p>

        <p className="mt-8 font-bold">Känner du någon som också borde testa Lovety?</p>
        <p>Tipsa gärna dina singelvänner.</p>

        {sent ? (
          <p className="mt-8 text-primary">
            Vi har meddelat dina vänner om Lovety, tack för din hjälp!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md">
            <label htmlFor="friend-email" className="mb-2 block text-sm">
              Dina vänners e-postadresser
            </label>
            <div className="rounded-3xl bg-card px-4 py-3 shadow-sm">
              {emails.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {emails.map((mail) => (
                    <span
                      key={mail}
                      className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"
                    >
                      {mail}
                      <button
                        type="button"
                        aria-label={`Ta bort ${mail}`}
                        onClick={() => setEmails(emails.filter((m) => m !== mail))}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <Input
                id="friend-email"
                type="email"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (addEmail(draft)) setDraft("");
                }}
                placeholder="namn@exempel.se"
                className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Tryck Enter eller komma för att lägga till fler.
            </p>
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

            <Button type="submit" className="mt-6 h-12 rounded-full px-10 text-lg">
              Bjud in en vän
            </Button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Tack;
