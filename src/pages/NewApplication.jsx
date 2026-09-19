import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function NewApplication() {
  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/applications/", {
        company,
        role_title: roleTitle,
        job_url: jobUrl,
        applied_date: appliedDate,
      });
      navigate("/dashboard");
    } catch {
      setError(
        "Couldn't save this application. Check the fields and try again.",
      );
    }
  }

  return (
    <Layout>
      <Link
        to="/dashboard"
        className="text-sm text-muted hover:text-ink transition-colors"
      >
        ← Back to your applications
      </Link>
      <h1 className="font-serif text-3xl mt-4 mb-8">Add an application</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-muted">Company</span>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-muted">Role</span>
          <input
            type="text"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-muted">Job posting URL (optional)</span>
          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-muted">Date applied</span>
          <input
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
            required
          />
        </label>
        {error && <p className="text-status-rejected text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-accent text-paper px-4 py-2.5 rounded-sm hover:bg-accent-hover transition-colors self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Save application
        </button>
      </form>
    </Layout>
  );
}
