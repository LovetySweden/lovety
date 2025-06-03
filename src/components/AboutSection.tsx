
const AboutSection = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Vi är Lovety</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <p className="mb-4">
              Lovety är en mötesplats för singlar som inte bara vill träffa någon, utan vill träffa den rätta.
            </p>
            <p className="mb-4">
              Vår grundare ville skapa ett alternativ till ytliga appar och krystade dejter.            </p>
            <p className="mb-4">
              Resultatet blev Lovety, en mötesplats med fysiska träffar, events och ett inkluderande sammanhang där du kan vara dig själv och där äkta kontakt kan uppstå naturligt – oavsett om det leder till vänskap, kärlek eller något annat.
            </p>
            <p className="mb-4">
              Alla är vi perfekta på vårt eget sätt. Vi behöver bara hitta den vi är perfekta med.
            </p>
            <p className="mb-4">
              Att vara kär är underbart. 
            </p>
            <p className="mb-4">
              Vi vill skapa möjligheter för alla att hitta och uppleva kärleken. På riktigt. 
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Lovely activity" 
              className="rounded-lg w-full h-auto object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
              alt="Lovely activity" 
              className="rounded-lg w-full h-auto object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
              alt="Lovely activity" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
