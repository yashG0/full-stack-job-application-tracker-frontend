import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    api
      .get("/applications/")
      .then((res) => setApplications(res.data))
      .catch(() => setError("Failed to load applications"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Applications</h1>
        <button onClick={logout} className="text-sm text-red-600">
          Log out
        </button>
      </div>

      <Link
        to="/applications/new"
        className="inline-block mb-6 bg-blue-600 text-white rounded px-4 py-2"
      >
        + Add Application
      </Link>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {applications.map((app) => (
            <Link
              key={app.id}
              to={`/applications/${app.id}`}
              className="border rounded p-4 flex justify-between items-center hover:bg-gray-50"
            >
              <div>
                <p className="font-semibold">{app.role_title}</p>
                <p className="text-gray-600 text-sm">{app.company}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-gray-200 capitalize">
                {app.status.replace("_", " ")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}