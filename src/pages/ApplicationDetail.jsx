import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import { STATUS_META } from "../lib/status";

const STATUSES = ["applied", "phone_screen", "interview", "offer", "rejected"];

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loadedId, setLoadedId] = useState("");

  useEffect(() => {
    Promise.all([api.get(`/applications/${id}/`), api.get(`/applications/${id}/history/`)])
      .then(([applicationRes, historyRes]) => { setApplication(applicationRes.data); setHistory(historyRes.data); setError(""); setLoadedId(id); })
      .catch(() => { setApplication(null); setError("Couldn't load this application. It may have been removed."); setLoadedId(id); });
  }, [id]);

  async function handleStatusChange(newStatus) {
    try {
      const res = await api.patch(`/applications/${id}/`, {
        status: newStatus,
      });
      setApplication(res.data);
      setError("");
      const historyRes = await api.get(`/applications/${id}/history/`);
      setHistory(historyRes.data);
    } catch {
      setError("Couldn't update the status.");
    }
  }

  async function handleDelete() {
    if (!confirm("Remove this application from your record?")) return;
    try { await api.delete(`/applications/${id}/`); navigate("/dashboard"); }
    catch { setError("Couldn't remove this application. Please try again."); }
  }

  if (loadedId !== id) {
    return (
      <Layout>
        <div className="state-panel"><span className="loading-mark" />Loading your application…</div>
      </Layout>
    );
  }

  if (error && !application) return <Layout><Link to="/dashboard" className="back-link"><span aria-hidden="true">←</span> All applications</Link><div className="notice notice-error mt-6" role="alert">{error}</div></Layout>;

  if (!application) return null;

  const currentMeta = STATUS_META[application.status];

  return (
    <Layout>
      <Link to="/dashboard" className="back-link"><span aria-hidden="true">←</span> All applications</Link>
      <div className="detail-heading"><div><p className="eyebrow"><span className="eyebrow-line" />APPLICATION DETAILS</p><h1>{application.role_title}</h1><p>{application.company}</p></div><span className={`status-pill status-${application.status}`}><i />{currentMeta?.label || application.status}</span></div>
      {error && <div className="notice notice-error mb-4" role="alert">{error}</div>}
      <div className="detail-grid">
        <section className="detail-card">
          <h2>At a glance</h2>
          <label className="field detail-status">
            <span className="field-label">Current stage</span>
            <select
              value={application.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s].label}
                </option>
              ))}
            </select>
          </label>

          {application.applied_date && <div className="detail-date"><span className="field-label">Applied on</span><p>{new Date(`${application.applied_date}T00:00:00`).toLocaleDateString(undefined, { dateStyle: "long" })}</p></div>}

          {application.job_url && (
            <a
              href={application.job_url}
              target="_blank"
              rel="noreferrer"
              className="detail-job-link"
            >
              View original job posting <span aria-hidden="true">↗</span>
            </a>
          )}

          <button
            onClick={handleDelete}
            className="danger-button"
          >
            Remove this application <span aria-hidden="true">↗</span>
          </button>
        </section>

        <section className="detail-card">
          <h2>Application history <span className="history-count">{history.length}</span></h2>
          {history.length === 0 ? <p className="history-empty">Updates to this application will show up here.</p> : <div className="timeline">
              {history.map((h) => {
                const meta = STATUS_META[h.new_status];
                return (
                  <div key={h.id} className="timeline-item">
                    <span className="timeline-dot" />
                    <strong>{h.old_status ? `Moved to ${meta?.label || h.new_status}` : `Logged as ${meta?.label || h.new_status}`}</strong>
                    <time>{new Date(h.changed_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</time>
                  </div>
                );
              })}
          </div>}
        </section>
      </div>
    </Layout>
  );
}
