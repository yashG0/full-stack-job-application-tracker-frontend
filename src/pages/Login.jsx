import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Brand from "../components/Brand";

function AuthAside() { return <aside className="auth-aside"><Brand /><div className="auth-aside-copy"><p className="eyebrow"><span className="eyebrow-line" />A CLEARER JOB SEARCH</p><h2>Keep your next move <em>in view.</em></h2><p>Make space for the work that matters. Ledger keeps your applications and their progress together.</p></div><span className="auth-aside-foot">A little order for the search ahead.</span></aside>; }

export default function Login() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth(); const navigate = useNavigate();
  async function handleSubmit(e) { e.preventDefault(); setError(""); setSubmitting(true); try { await login(username, password); navigate("/dashboard"); } catch { setError("That username or password didn’t match. Check your details and try again."); } finally { setSubmitting(false); } }

  return <div className="ledger-app auth-page"><AuthAside /><main className="auth-main"><div className="auth-form-wrap"><Brand className="auth-mobile-brand" /><p className="eyebrow"><span className="eyebrow-line" />WELCOME BACK</p><h1>Pick up where you left off.</h1><p>Your applications are right where you left them.</p><form onSubmit={handleSubmit} className="auth-form"><label className="field"><span className="field-label">Username</span><input type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required /></label><label className="field"><span className="field-label">Password</span><input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{error && <div className="auth-error" role="alert">{error}</div>}<button type="submit" disabled={submitting} className="button button-primary auth-submit">{submitting ? "Logging in…" : "Log in to Ledger"}<span aria-hidden="true">→</span></button></form><p className="auth-switch">New to Ledger? <Link to="/signup">Create an account</Link></p></div></main></div>;
}
