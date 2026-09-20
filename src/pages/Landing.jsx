import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PREVIEW_ROWS = [
  {
    role: "Backend Engineer",
    company: "Google",
    status: "Interview",
    color: "bg-status-interview",
  },
  {
    role: "SDE I",
    company: "Meta",
    status: "Applied",
    color: "bg-status-applied",
  },
  {
    role: "AI Expert",
    company: "OpenAI",
    status: "Offer",
    color: "bg-status-offer",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Create an account",
    body: "One place for every application, private to you.",
  },
  {
    n: "2",
    title: "Log an application",
    body: "Company, role, and the date you applied. Nothing more.",
  },
  {
    n: "3",
    title: "Watch its status change",
    body: "Every move — applied to interview to offer — is timestamped automatically.",
  },
];

export default function Landing() {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <header className="border-b border-line">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-serif text-xl tracking-tight">Ledger</span>
          <Link
            to="/login"
            className="text-sm text-muted hover:text-ink transition-colors"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6">
        <section className="py-20">
          <h1 className="font-serif text-5xl leading-tight max-w-lg">
            Your job search, on record.
          </h1>
          <p className="text-muted text-lg mt-4 max-w-md">
            A quiet place to log every application and watch it move — without a
            spreadsheet you'll forget to update.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-accent text-paper px-5 py-3 rounded-sm hover:bg-accent-hover transition-colors mt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Start your record
          </Link>
        </section>

        <section className="pb-16">
          <div className="divide-y divide-line border-t border-b border-line">
            {PREVIEW_ROWS.map((row) => (
              <div
                key={row.role}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-medium">{row.role}</p>
                  <p className="text-sm text-muted">{row.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${row.color}`} />
                  <span className="text-sm text-muted">{row.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24 grid sm:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.n}>
              <span className="font-serif text-2xl text-accent">{step.n}</span>
              <h3 className="font-medium mt-2">{step.title}</h3>
              <p className="text-sm text-muted mt-1">{step.body}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
