
const promotions = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    title: "10% rabatt för nya medlemmar",
    description: "Registrera dig idag och få 10% rabatt på din första aktivitet"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Ge bort Lovely",
    description: "Ge en upplevelse och nya vänner i present"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    title: "Företagsevent",
    description: "Skräddarsy aktiviteter för er arbetsplats"
  }
];

const PromotionsSection = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map(promo => (
            <div key={promo.id} className="bg-lovely-cream rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={promo.image} 
                alt={promo.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-medium mb-2">{promo.title}</h3>
                <p>{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionsSection;
