
const AboutSection = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Vi är Lovely</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <p className="mb-4">
              Lovely är aktiviteter för alla som vill träffa nya vänner och potentiella partners genom roliga och meningsfulla aktiviteter.
            </p>
            <p className="mb-4">
              Vi skapar tillfällen där man kan ha kul tillsammans genom att göra något man tycker om, inte bara träffas för träffandets skull. Att göra något tillsammans skapar samtalsämnen och ger naturliga möten.
            </p>
            <p className="mb-4">
              Med våra olika aktiviteter finns det något för alla - från matlagningskurser och filosofikvällar till vandring och dans. Och vem vet, kanske träffar du kärleken!
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
