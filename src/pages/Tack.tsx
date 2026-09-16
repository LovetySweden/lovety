import BrandHeader from "@/components/BrandHeader";

const shareText =
  "Kolla in Lovety – träffas först, matcha sen. Anmäl dig till piloten!";

const Tack = () => {
  const handleInvite = () => {
    const url = window.location.origin;
    if (navigator.share) {
      navigator.share({ title: "Lovety", text: shareText, url }).catch(() => {});
      return;
    }
    window.location.href = `mailto:?subject=${encodeURIComponent(
      "Testa Lovety"
    )}&body=${encodeURIComponent(`${shareText} ${url}`)}`;
  };

  return (
    <main className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto max-w-3xl px-6 pb-24">
        <h1 className="font-serif text-4xl text-primary">Klart! Tack för dina svar.</h1>
        <p className="mt-8 text-sm md:text-base">
          Vi hör av oss när vi öppnar anmälan till piloten.
        </p>
        <p className="mt-6 font-bold">Känner du någon som också borde testa Lovety?</p>
        <p>Tipsa gärna dina singelvänner.</p>
        <button
          onClick={handleInvite}
          className="mt-8 rounded-full bg-primary px-10 py-3 text-lg text-primary-foreground transition-opacity hover:opacity-90"
        >
          Bjud in en vän
        </button>
      </div>
    </main>
  );
};

export default Tack;
