import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

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
      const res = await api.patch(`/applications/${id}/`, { status: newStatus });
      setApplication(res.data);
      const historyRes = await api.get(`/applications/${id}/history/`);
      setHistory(historyRes.data);
    } catch {
      setError("Failed to update status");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this application?")) return;
    await api.delete(`/applications/${id}/`);
    navigate("/dashboard");
  }

  if (!application) return <p className="p-8">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold">{application.role_title}</h1>
      <p className="text-gray-600 mb-6">{application.company}</p>

      <div className="mb-6">
        <label className="text-sm font-medium">Status</label>
        <select
          value={application.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border rounded px-3 py-2 block mt-1"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">History</h2>
        <div className="flex flex-col gap-2">
          {history.map((h) => (
            <div key={h.id} className="text-sm text-gray-600">
              {h.old_status || "created"} → {h.new_status}{" "}
              <span className="text-gray-400">
                ({new Date(h.changed_at).toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleDelete} className="text-sm text-red-600">
        Delete application
      </button>
    </div>
  );
}