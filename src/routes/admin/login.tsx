import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import * as React from "react";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft, Sun, Moon } from "lucide-react";
import { loginAdmin } from "@/lib/api/admin.auth.functions";
import type { AdminTheme } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Connexion Administration — DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [theme, setTheme] = React.useState<AdminTheme>("dark");

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("dt_admin_theme") as AdminTheme | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: AdminTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("dt_admin_theme", next);
      return next;
    });
  };

  React.useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("dt_admin_token") : null;
    if (token) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAdmin({
        data: {
          email,
          password,
        },
      });

      if (!res.success) {
        setError(res.error || "Identifiants invalides.");
        setLoading(false);
        return;
      }

      localStorage.setItem("dt_admin_token", res.token);
      localStorage.setItem("dt_admin_email", res.admin.email);
      navigate({ to: "/admin/dashboard" });
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue lors de la connexion.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200 ${
        theme === "dark" ? "admin-dark" : "admin-light"
      }`}
      style={{
        backgroundColor: "var(--admin-bg)",
        color: "var(--admin-text)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          backgroundColor: theme === "dark" ? "rgba(242,106,33,0.07)" : "rgba(242,106,33,0.04)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          backgroundColor: theme === "dark" ? "rgba(37,99,235,0.07)" : "rgba(37,99,235,0.04)",
          filter: "blur(100px)",
        }}
      />

      {/* Top bar with return link & theme switcher */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium transition animate-fade-in-soft"
          style={{ color: "var(--admin-text-subtle)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour au site public
        </Link>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold border transition cursor-pointer"
          style={{
            backgroundColor: "var(--admin-card-bg)",
            borderColor: "var(--admin-border)",
            color: "var(--admin-text)",
          }}
          title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-3.5 w-3.5 text-amber-400" />
              <span>Clair</span>
            </>
          ) : (
            <>
              <Moon className="h-3.5 w-3.5 text-blue-600" />
              <span>Sombre</span>
            </>
          )}
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Header */}
        <div className="text-center animate-fade-up">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl"
            style={{
              backgroundColor: "var(--orange)",
              color: "white",
              boxShadow: "var(--shadow-accent)",
            }}
          >
            <ShieldCheck className="h-9 w-9" />
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
            Espace d'Administration
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--admin-text-muted)" }}>
            Connectez-vous pour gérer les contenus du site DIGIT &amp; TALENT
          </p>
        </div>

        {/* Card */}
        <div
          className="mt-8 rounded-2xl p-8 shadow-2xl relative z-10 animate-fade-up"
          style={{
            backgroundColor: "var(--admin-card-bg)",
            border: "1px solid var(--admin-border)",
          }}
        >
          {error && (
            <div
              className="mb-6 flex items-start gap-3 rounded-xl p-3.5 text-xs"
              style={{
                backgroundColor: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
              }}
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--admin-text-muted)" }}
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5"
                  style={{ color: "var(--admin-text-subtle)" }}
                >
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@digit-talent.com"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition"
                  style={{
                    backgroundColor: "var(--admin-input-bg)",
                    border: "1px solid var(--admin-input-border)",
                    color: "var(--admin-text)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(242,106,33,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--admin-input-border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--admin-text-muted)" }}
              >
                Mot de passe
              </label>
              <div className="relative">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5"
                  style={{ color: "var(--admin-text-subtle)" }}
                >
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition"
                  style={{
                    backgroundColor: "var(--admin-input-bg)",
                    border: "1px solid var(--admin-input-border)",
                    color: "var(--admin-text)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(242,106,33,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--admin-input-border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary mt-2 w-full justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: "0.75rem" }}
            >
              {loading ? (
                <>
                  <div
                    className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"
                    style={{ borderColor: "white", borderTopColor: "transparent" }}
                  />
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick guide helper */}
          <div
            className="mt-6 border-t pt-4 text-[11px]"
            style={{ borderColor: "var(--admin-border)", color: "var(--admin-text-subtle)" }}
          >
            <p className="font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
              💡 Accès par défaut (développement) :
            </p>
            <p>
              Email :{" "}
              <span className="font-mono font-semibold" style={{ color: "var(--orange)" }}>
                admin@digit-talent.com
              </span>
            </p>
            <p>
              Mot de passe :{" "}
              <span className="font-mono font-semibold" style={{ color: "var(--orange)" }}>
                admin123
              </span>
            </p>
            <p className="mt-1 text-[10px]" style={{ color: "var(--admin-text-subtle)" }}>
              Configurable dans le fichier{" "}
              <span className="font-mono" style={{ color: "var(--admin-text-muted)" }}>
                .env
              </span>{" "}
              (ADMIN_EMAIL / ADMIN_PASSWORD_HASH).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
