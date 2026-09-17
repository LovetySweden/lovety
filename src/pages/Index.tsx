import BrandHeader from "@/components/BrandHeader";
import CtaBlock from "@/components/CtaBlock";
import { ArrowDown } from "lucide-react";

const steps = [
  { top: "4 MIN", bottom: "Träffas" },
  { top: "10 MIN", bottom: "Prata vidare" },
  { top: "MATCH", bottom: "Nästa steg" },
];

const faq = [
  {
    q: "Behöver jag skapa en datingprofil?",
    a: "Nej. Det finns inga profiler att bläddra bland. Du möter de andra deltagarna direkt i korta videosamtal.",
  },
  {
    q: "När är pilotkvällarna?",
    a: "Vi utvecklar Lovety just nu och har ännu inte satt datumen för de första pilotkvällarna. Lämna din e-post så hör vi av oss när anmälan öppnar.",
  },
  {
    q: "Kostar det något?",
    a: "Nej, de första pilotkvällarna är gratis. I gengäld vill vi gärna ha din feedback efteråt.",
  },
  {
    q: "Vilka kan ansöka?",
    a: "Singlar 29–44 år i Stockholm. Du får också ange vilket åldersspann du själv är öppen för att dejta.",
  },
  {
    q: "Vad händer om jag matchar med någon?",
    a: "Om ni båda vill fortsätta kontakten blir det en match. Då får ni varandras kontaktuppgifter och bestämmer själva vad nästa steg blir.",
  },
  {
    q: "Vad händer om jag inte matchar med någon?",
    a: "Då händer inget mer efter eventet. Ingen får veta vem som tackat ja eller nej – Lovety visar bara när båda vill fortsätta.",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <BrandHeader />

      <div className="container mx-auto max-w-3xl px-6 pb-20">
        <section className="pt-7 md:pt-10">
          <h1 className="max-w-3xl font-sans text-4xl font-bold leading-tight text-primary md:text-5xl">
            <span className="block">Trött på att swipa?</span>
            <span className="mt-2 block">Träffa 10 singlar på en kväll – hemifrån.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base">
            <strong>Inga profiler. Inga swipes.</strong> Korta videosamtal med andra
            Stockholmssinglar. Om ni båda vill prata vidare får ni mer tid tillsammans.
          </p>
          <CtaBlock className="mt-8" />
        </section>

        <section className="pt-20">
          <h2 className="font-serif text-3xl text-primary">Så funkar det</h2>
          <div className="mt-8 flex w-fit flex-col items-center">
            {steps.map((s, i) => (
              <div key={s.top} className="flex flex-col items-center">
                <div className="w-48 rounded-lg bg-primary px-4 py-3 text-center text-primary-foreground">
                  <div className="text-sm opacity-80">{s.top}</div>
                  <div>{s.bottom}</div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex flex-col items-center py-2 text-primary">
                    <span className="text-sm">Båda vill</span>
                    <ArrowDown className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <h3 className="mt-12 text-xl text-primary">Träffa personen. Inte profilen</h3>
          <div className="mt-4 space-y-4 text-sm md:text-base">
            <p>
              På datingappar bestämmer vi ofta vem som är intressant innan vi ens har
              träffats. En bild, några rader och ett snabbt swipe.
            </p>
            <p className="font-bold">Vi vänder på ordningen.</p>
            <p>
              Vi börjar med mötet. Inga profiler att bedöma. Ingen swipe. Bara några
              minuter tillsammans för att känna: <strong>vill jag veta mer?</strong>
            </p>
            <p className="text-primary">
              Vissa saker märker man först när man faktiskt möts.
            </p>
          </div>
        </section>

        <section className="pt-20">
          <h2 className="font-serif text-3xl text-primary">Var med från början</h2>
          <div className="mt-4 space-y-4 text-sm md:text-base">
            <p>
              <strong>De första pilotkvällarna är gratis.</strong> Lämna din e-post så
              får du veta när vi öppnar anmälan.
            </p>
            <p>
              När det är dags kan du ansöka till en pilotkväll och berätta lite om dig
              själv och vem du vill träffa.
            </p>
            <p className="font-bold">Du bestämmer själv om du vill vara med.</p>
          </div>
          <CtaBlock className="mt-10" />
        </section>

        <section className="pt-20">
          <h2 className="font-serif text-3xl text-primary">FAQ</h2>
          <div className="mt-6 space-y-5">
            {faq.map((item) => (
              <div key={item.q}>
                <p className="text-primary">{item.q}</p>
                <p className="text-sm md:text-base">{item.a}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-14 text-xl text-primary">
            Redo att träffa någon istället för att swipa?
          </h3>
          <CtaBlock className="mt-6" />
        </section>
      </div>
    </main>
  );
};

export default Index;
