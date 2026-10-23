import { Link } from "react-router-dom";

export default function Brand({ to = "/", className = "", label = "Ledger home" }) {
  return (
    <Link to={to} className={`brand ${className}`} aria-label={label}>
      <img src="/ledger-mark.svg" alt="" aria-hidden="true" className="brand-mark" />
      <span>Ledger</span>
    </Link>
  );
}
