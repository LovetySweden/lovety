
const HeroSection = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" 
        alt="Lovely - Singelaktiviteter i Umeå" 
        className="w-full h-full object-cover bg-lovely-beige"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Hitta och upplev kärlek. På riktigt.</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-sans">
            Möt nya vänner genom meningsfulla aktiviteter
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
