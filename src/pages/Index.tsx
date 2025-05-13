
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import FeaturedSection from "@/components/FeaturedSection";
import FeatureSection from "@/components/FeatureSection";
import SuggestActivity from "@/components/SuggestActivity";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import PromotionsSection from "@/components/PromotionsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <ActivitiesSection />
      <FeaturedSection />
      <FeatureSection />
      <SuggestActivity />
      <AboutSection />
      <div id="newsletter">
        <NewsletterSection />
      </div>
      <PromotionsSection />
      <Footer />
    </div>
  );
};

export default Index;
