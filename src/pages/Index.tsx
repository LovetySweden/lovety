
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
      <div style={{ backgroundColor: '#F5EFE6' }}>
        <ActivitiesSection />
      </div>
      <div className="bg-white">
        <FunTogether />
      </div>
      <div style={{ backgroundColor: '#F5EFE6' }}>
        <SuggestActivity />
      </div>
      <div className="bg-white">
        <AboutSection />
      </div>
      <div style={{ backgroundColor: '#F5EFE6' }}>
        <NewsletterSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
