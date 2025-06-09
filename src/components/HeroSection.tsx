
const HeroSection = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <img
        src="/lovable-uploads/heroSummer.webp"
        alt="Lovely - Singelaktiviteter i Umeå"
        className="w-full h-full object-cover bg-lovely-beige"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
    </div>
  );
};

export default HeroSection;
