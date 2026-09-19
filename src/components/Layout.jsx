import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <header className="border-b border-line">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/dashboard" className="font-serif text-xl tracking-tight">
            Ledger
          </Link>
          <button
            onClick={logout}
            className="text-sm text-muted hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
