import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

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
    } catch (err) {
      setError("Failed to create application");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">Add Application</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Role title"
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="url"
          placeholder="Job URL (optional)"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}