
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import FunTogether from "@/components/FunTogether";
import SuggestActivity from "@/components/SuggestActivity";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <div className="bg-white">
        <ActivitiesSection />
      </div>
      <div className="bg-lovely-beige/30">
        <FunTogether />
      </div>
      <div className="bg-white">
        <SuggestActivity />
      </div>
      <div className="bg-lovely-beige/30">
        <AboutSection />
      </div>
      <div id="newsletter" className="bg-white">
        <NewsletterSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
