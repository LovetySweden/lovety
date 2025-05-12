
const AboutSection = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Om Lovely</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <p className="mb-4">
              Lovely skapades för att göra det enklare att träffa nya vänner i vuxen ålder. Alla som någon gång flyttat till en ny stad eller gått igenom en större livsförändring vet hur svårt det kan vara att bygga nya relationer.
            </p>
            <p className="mb-4">
              Genom att mötas kring aktiviteter och gemensamma intressen blir det naturligt att lära känna nya människor. Här finns något för alla - från matlagningskurser och filosofikvällar till vandring och dans.
            </p>
            <p className="mb-4">
              Vår vision är att skapa en vänligare värld där människor vågar öppna upp och skapa äkta kontakt med varandra.
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
