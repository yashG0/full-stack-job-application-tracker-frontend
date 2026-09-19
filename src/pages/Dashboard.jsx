import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import { STATUS_META } from "../lib/status";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/applications/")
      .then((res) => setApplications(res.data))
      .catch(() => setError("Couldn't load your applications."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl">Your applications</h1>
          <p className="text-muted mt-1">
            {applications.length === 0
              ? "Nothing logged yet."
              : `${applications.length} application${applications.length === 1 ? "" : "s"} on record.`}
          </p>
        </div>
        <Link
          to="/applications/new"
          className="bg-accent text-paper text-sm px-4 py-2.5 rounded-sm hover:bg-accent-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Add application
        </Link>
      </div>

      {loading && <p className="text-muted">Loading…</p>}
      {error && <p className="text-status-rejected">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <div className="border border-dashed border-line rounded-sm p-10 text-center">
          <p className="text-muted">
            Every application starts here. Add the first one to begin your
            record.
          </p>
        </div>
      )}

      {!loading && applications.length > 0 && (
        <div className="divide-y divide-line border-t border-b border-line">
          {applications.map((app) => {
            const meta = STATUS_META[app.status];
            return (
              <Link
                key={app.id}
                to={`/applications/${app.id}`}
                className="flex items-center justify-between py-4 group"
              >
                <div>
                  <p className="font-medium group-hover:text-accent transition-colors">
                    {app.role_title}
                  </p>
                  <p className="text-sm text-muted">{app.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${meta.color}`} />
                  <span className="text-sm text-muted">{meta.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
