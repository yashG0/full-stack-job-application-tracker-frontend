import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import { STATUS_META } from "../lib/status";

const STATUSES = ["all", "applied", "phone_screen", "interview", "offer", "rejected"];

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    api.get("/applications/").then((res) => setApplications(res.data)).catch(() => setError("Couldn't load your applications. Please try again in a moment.")).finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => applications.reduce((acc, app) => { acc[app.status] = (acc[app.status] || 0) + 1; return acc; }, {}), [applications]);
  const filteredApplications = activeFilter === "all" ? applications : applications.filter((app) => app.status === activeFilter);

  return (
    <Layout>
      <section className="dashboard-intro">
        <div><p className="eyebrow"><span className="eyebrow-line" />YOUR PERSONAL JOB LOG</p><h1>Keep the thread.</h1><p className="page-subtitle">A clear view of every opportunity you’re moving toward.</p></div>
        <Link to="/applications/new" className="button button-primary add-button"><span aria-hidden="true">＋</span> Add application</Link>
      </section>

      <section className="summary-grid" aria-label="Application summary">
        <article className="summary-card summary-total"><span className="summary-label">Total applications</span><strong>{loading ? "—" : applications.length.toString().padStart(2, "0")}</strong><span className="summary-foot">Your search, gathered</span></article>
        <article className="summary-card"><span className="summary-label">In progress</span><strong>{loading ? "—" : ((counts.applied || 0) + (counts.phone_screen || 0) + (counts.interview || 0)).toString().padStart(2, "0")}</strong><span className="summary-foot">On their way</span></article>
        <article className="summary-card"><span className="summary-label">Interviews</span><strong>{loading ? "—" : (counts.interview || 0).toString().padStart(2, "0")}</strong><span className="summary-foot">Conversations started</span></article>
        <article className="summary-card"><span className="summary-label">Offers</span><strong>{loading ? "—" : (counts.offer || 0).toString().padStart(2, "0")}</strong><span className="summary-foot">Good things ahead</span></article>
      </section>

      <section className="applications-section">
        <div className="list-heading"><div><p className="eyebrow"><span className="eyebrow-line" />THE RECORD</p><h2>Applications <span>{applications.length}</span></h2></div><span className="list-sort-note">Most recent first</span></div>
        {applications.length > 0 && <div className="filter-bar" aria-label="Filter applications by status">{STATUSES.map((status) => <button key={status} onClick={() => setActiveFilter(status)} className={`filter-chip ${activeFilter === status ? "filter-active" : ""}`}>{status === "all" ? "All" : STATUS_META[status].label}{status !== "all" && counts[status] ? <span>{counts[status]}</span> : null}</button>)}</div>}
        {loading && <div className="state-panel"><span className="loading-mark" />Loading your record…</div>}
        {error && <div className="notice notice-error" role="alert">{error}</div>}
        {!loading && !error && applications.length === 0 && <div className="empty-state"><span className="empty-icon">＋</span><p className="eyebrow">A FRESH PAGE</p><h3>Start with the first one.</h3><p>Add a role you’ve applied for and Ledger will keep its details and progress together.</p><Link to="/applications/new" className="button button-primary">Add your first application <span>→</span></Link></div>}
        {!loading && !error && applications.length > 0 && filteredApplications.length === 0 && <div className="state-panel">No applications in this stage yet.</div>}
        {!loading && !error && filteredApplications.length > 0 && <div className="application-list">{filteredApplications.map((app, index) => { const meta = STATUS_META[app.status]; return <Link key={app.id} to={`/applications/${app.id}`} className="application-row"><span className="row-index">{String(index + 1).padStart(2, "0")}</span><span className="company-monogram list-monogram">{app.company?.[0] || "?"}</span><span className="application-info"><strong>{app.role_title}</strong><span>{app.company}{app.applied_date ? ` · Applied ${new Date(`${app.applied_date}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}` : ""}</span></span><span className={`status-pill status-${app.status}`}><i />{meta?.label || app.status}</span><span className="row-arrow" aria-hidden="true">↗</span></Link>; })}</div>}
      </section>
      <p className="privacy-footnote"><span aria-hidden="true">◈</span> Your record is private to your account.</p>
    </Layout>
  );
}
