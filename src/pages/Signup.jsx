import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register/", { username, email, password });
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      setError(
        data ? Object.values(data).flat().join(" ") : "Something went wrong.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-4xl text-center mb-1">Ledger</h1>
        <p className="text-muted text-center mb-10">Start your record.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
              required
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
              required
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-line rounded-sm px-3 py-2 bg-paper focus:outline-none focus:border-accent"
              required
            />
          </label>
          {error && <p className="text-status-rejected text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-accent text-paper px-4 py-2.5 rounded-sm hover:bg-accent-hover transition-colors mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
