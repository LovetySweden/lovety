import { Link } from "react-router-dom";
import logo from "@/assets/lovety-logo-5.png.asset.json";

const BrandHeader = () => (
  <header className="w-full pb-6 pt-7 text-center md:pb-7 md:pt-8">
    <Link to="/" className="inline-block" aria-label="Lovety – startsidan">
      <img
        src={logo.url}
        alt="Lovety – Träffas först. Matcha sen."
        className="mx-auto h-auto w-40 md:w-44"
      />
    </Link>
  </header>
);

export default BrandHeader;
