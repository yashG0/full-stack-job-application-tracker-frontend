import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Brand from "../components/Brand";

const PREVIEW_ROWS = [
  { role: "Backend Engineer", company: "Google", status: "Interview", tone: "interview" },
  { role: "Product Engineer", company: "Linear", status: "Applied", tone: "applied" },
  { role: "Software Engineer", company: "Vercel", status: "Offer", tone: "offer" },
];

const STEPS = [
  { n: "01", title: "Add the opportunity", body: "Capture the role, company, and application date in seconds." },
  { n: "02", title: "Keep the context", body: "Save the posting link and the details you want close at hand." },
  { n: "03", title: "See your progress", body: "Follow every move from application to the next opportunity." },
];

export default function Landing() {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="ledger-app landing-page">
      <header className="site-header">
        <div className="site-header-inner">
          <Brand />
          <nav className="header-actions" aria-label="Account">
            <Link to="/login" className="login-link">Log in</Link>
            <Link to="/signup" className="button button-dark button-small">Create your account <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />A calmer way to job hunt</p>
            <h1>Your job search,<br /><em>on record.</em></h1>
            <p className="hero-description">Every application, one clear place. Keep track of the roles you want, the conversations you’re having, and what comes next.</p>
            <div className="hero-actions">
              <Link to="/signup" className="button button-primary">Start your record <span aria-hidden="true">→</span></Link>
              <Link to="/login" className="text-link">I already have an account <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="hero-note"><span className="privacy-icon" aria-hidden="true">◈</span>Private by default <span className="note-separator">·</span> Just the details that matter</div>
          </div>

          <div className="preview-wrap" aria-label="Example application tracker preview">
            <div className="preview-orbit orbit-one" /><div className="preview-orbit orbit-two" />
            <div className="preview-card">
              <div className="preview-topline"><div><span className="window-dot" /><span className="window-dot" /><span className="window-dot" /></div><span>YOUR RECORD <span className="preview-period">/</span> THIS MONTH</span><span className="preview-menu">•••</span></div>
              <div className="preview-content">
                <div className="preview-heading"><div><p className="preview-kicker">A little more clarity</p><h2>Your applications</h2></div><span className="preview-count">03 <small>tracked</small></span></div>
                <div className="preview-stats"><div><span>In progress</span><strong>02</strong></div><div><span>Interviews</span><strong>01</strong></div><div><span>Offers</span><strong>01</strong></div></div>
                <div className="preview-list-label"><span>RECENT ACTIVITY</span><span>STATUS</span></div>
                <div className="preview-rows">{PREVIEW_ROWS.map((row) => <div className="preview-row" key={row.role}><span className="company-monogram">{row.company[0]}</span><div className="preview-role"><strong>{row.role}</strong><span>{row.company}</span></div><span className={`status-pill status-${row.tone}`}><i />{row.status}</span></div>)}</div>
                <div className="preview-footer"><span><i /> All caught up</span><span>Updated just now</span></div>
              </div>
            </div>
            <div className="preview-caption"><span>YOUR SEARCH, IN GOOD ORDER</span><span>01 — 03</span></div>
          </div>
        </section>

        <section className="how-section">
          <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" />Simple by design</p><h2>Less admin. More <em>momentum.</em></h2></div>
          <div className="steps-grid">{STEPS.map((step) => <article className="step-card" key={step.n}><span className="step-number">{step.n}</span><div><h3>{step.title}</h3><p>{step.body}</p></div><span className="step-arrow" aria-hidden="true">↗</span></article>)}</div>
        </section>
        <footer className="landing-footer"><Brand className="brand-footer" /><span>A little order for the search ahead.</span></footer>
      </main>
    </div>
  );
}
