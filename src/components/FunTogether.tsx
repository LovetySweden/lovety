
const FunTogether = () => {
  return (
    <div className="bg-lovely-beige py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Ha roligt tillsammans</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-lg mb-4">
              Trött på ytliga dating appar? Krystade dejter?
            </p>
            <p className="mb-6">
              Lovety är en mötesplats där du kan vara dig själv, träffa andra singlar som delar dina intressen och lära känna varandra under avslappnade former.
            </p>
            <p className="mb-6">
              Det finns något för alla, både den som föredrar mer stillsamma event och den som älskar det fartfyllda!
            </p>
            <p className="mb-6">
              Våga utmana dig och träffa nya människor under roliga aktiviteter och event i Umeå!
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b"
              alt="People biking together"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunTogether;
