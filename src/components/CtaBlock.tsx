import { Link } from "react-router-dom";

const CtaBlock = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <Link
      to="/pilot"
      className="inline-block rounded-full bg-primary px-8 py-3 text-lg text-primary-foreground transition-opacity hover:opacity-90"
    >
      Få förtur till piloten
    </Link>
    <p className="mt-3 max-w-xs text-sm italic text-foreground/80">
      Lovety är under utveckling. Lämna din e-post så hör vi av oss när vi öppnar
      de första pilotkvällarna i Stockholm.
    </p>
  </div>
);

export default CtaBlock;
