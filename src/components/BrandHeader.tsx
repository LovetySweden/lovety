import { Link } from "react-router-dom";
import logo from "@/assets/lovety-logo.png";

const BrandHeader = () => (
  <header className="w-full pt-10 pb-8 text-center">
    <Link to="/" className="inline-block">
      <img src={logo.url} alt="Lovety" className="h-20 md:h-24 mx-auto" />
    </Link>
    <p className="mt-1 font-serif text-2xl md:text-3xl text-primary">
      Träffas först. Matcha sen.
    </p>
  </header>
);

export default BrandHeader;
