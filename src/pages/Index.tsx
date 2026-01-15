import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import FunTogetherAndSuggest from "@/components/FunTogetherAndSuggest";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <div style={{ backgroundColor: '#F5EFE6' }}>
        <ActivitiesSection />
      </div>
      <div className="bg-white">
        <FunTogetherAndSuggest />
      </div>
      <div style={{ backgroundColor: '#F5EFE6' }}>
        <AboutSection />
      </div>
      <div className="bg-white">
        <NewsletterSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
