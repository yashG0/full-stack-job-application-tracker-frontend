import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Brand from "./Brand";

export default function Layout({ children }) {
  const { logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="ledger-app app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Brand to="/dashboard" label="Ledger dashboard" />
          <div className="header-actions">
            <span className="header-context">{isDashboard ? "YOUR JOB SEARCH" : "APPLICATION RECORD"}</span>
            <button onClick={logout} className="logout-button">Log out <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
