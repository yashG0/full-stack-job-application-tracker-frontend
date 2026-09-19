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

  useEffect(() => {
    api.get(`/applications/${id}/`).then((res) => setApplication(res.data));
    api.get(`/applications/${id}/history/`).then((res) => setHistory(res.data));
  }, [id]);

  async function handleStatusChange(newStatus) {
    try {
      const res = await api.patch(`/applications/${id}/`, {
        status: newStatus,
      });
      setApplication(res.data);
      const historyRes = await api.get(`/applications/${id}/history/`);
      setHistory(historyRes.data);
    } catch {
      setError("Couldn't update the status.");
    }
  }

  async function handleDelete() {
    if (!confirm("Remove this application from your record?")) return;
    await api.delete(`/applications/${id}/`);
    navigate("/dashboard");
  }

  if (!application) {
    return (
      <Layout>
        <p className="text-muted">Loading…</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link
        to="/dashboard"
        className="text-sm text-muted hover:text-ink transition-colors"
      >
        ← Back to your applications
      </Link>

      <div className="mt-4 mb-10">
        <h1 className="font-serif text-3xl">{application.role_title}</h1>
        <p className="text-muted mt-1">{application.company}</p>
      </div>

      <div className="grid sm:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <label className="flex flex-col gap-1.5 mb-8">
            <span className="text-sm text-muted">Status</span>
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
            {error && (
              <span className="text-status-rejected text-sm">{error}</span>
            )}
          </label>

          {application.job_url && (
            <a
              href={application.job_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:text-accent-hover transition-colors block mb-8"
            >
              View job posting
            </a>
          )}

          <button
            onClick={handleDelete}
            className="text-sm text-muted hover:text-status-rejected transition-colors"
          >
            Remove application
          </button>
        </div>

        <div>
          <h2 className="text-sm text-muted mb-4">History</h2>
          <div className="relative pl-5">
            <div className="absolute left-[3px] top-1 bottom-1 w-px bg-line" />
            <div className="flex flex-col gap-6">
              {history.map((h) => {
                const meta = STATUS_META[h.new_status];
                return (
                  <div key={h.id} className="relative">
                    <span
                      className={`absolute -left-5 top-1 w-[7px] h-[7px] rounded-full ${meta?.color || "bg-status-applied"}`}
                    />
                    <p className="text-sm">
                      {h.old_status
                        ? `Moved to ${meta.label}`
                        : `Logged as ${meta.label}`}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {new Date(h.changed_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
