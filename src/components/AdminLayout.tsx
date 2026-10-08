import * as React from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Cpu,
  Briefcase,
  GraduationCap,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Sun,
  Moon,
  Megaphone,
} from "lucide-react";
import { verifyAdmin } from "@/lib/api/admin.auth.functions";


export type AdminTheme = "dark" | "light";

interface AdminThemeContextType {
  theme: AdminTheme;
  toggleTheme: () => void;
}

export const AdminThemeContext = React.createContext<AdminThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useAdminTheme() {
  return React.useContext(AdminThemeContext);
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminLayout({ children, title, description, actions }: AdminLayoutProps) {
  const [loading, setLoading] = React.useState(true);
  const [adminEmail, setAdminEmail] = React.useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<AdminTheme>("dark");
  const routerState = useRouterState();
  const navigate = useNavigate();
  const currentPath = routerState.location.pathname;

  React.useEffect(() => {
    // Read stored theme preference
    const storedTheme = localStorage.getItem("dt_admin_theme") as AdminTheme | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next: AdminTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("dt_admin_theme", next);
      return next;
    });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) {
      navigate({ to: "/admin/login" });
      return;
    }

    verifyAdmin({ data: { token } })
      .then((res) => {
        if (!res.valid) {
          localStorage.removeItem("dt_admin_token");
          localStorage.removeItem("dt_admin_email");
          navigate({ to: "/admin/login" });
        } else {
          setAdminEmail(res.email || localStorage.getItem("dt_admin_email") || "admin@digit-talent.com");
          setLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("dt_admin_token");
        navigate({ to: "/admin/login" });
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("dt_admin_token");
    localStorage.removeItem("dt_admin_email");
    navigate({ to: "/admin/login" });
  };

  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${
          theme === "dark" ? "admin-dark" : "admin-light"
        }`}
        style={{ backgroundColor: "var(--admin-bg)", color: "var(--admin-text)" }}
      >
        <div className="text-center">
          <div
            className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
            style={{ borderColor: "var(--orange)", borderTopColor: "transparent" }}
          />
          <p className="mt-4 text-sm" style={{ color: "var(--admin-text-subtle)" }}>
            Vérification de la session admin...
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { to: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { to: "/admin/formations", label: "Inscriptions Formations", icon: GraduationCap },
    { to: "/admin/articles", label: "Articles & Blog", icon: Newspaper },
    { to: "/admin/team", label: "Équipe", icon: Users },
    { to: "/admin/services", label: "Services", icon: Cpu },
    { to: "/admin/projects", label: "Projets & Références", icon: Briefcase },
    { to: "/admin/promotions", label: "Promotions & Sessions", icon: Megaphone },
  ];


  return (
    <AdminThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen flex flex-col md:flex-row transition-colors duration-200 ${
          theme === "dark" ? "admin-dark" : "admin-light"
        }`}
        style={{
          backgroundColor: "var(--admin-bg)",
          color: "var(--admin-text)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {/* Mobile Header */}
        <div
          className="flex md:hidden items-center justify-between px-4 py-3 border-b"
          style={{
            backgroundColor: "var(--admin-sidebar-bg)",
            borderColor: "var(--admin-border)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm"
              style={{ backgroundColor: "rgba(242,106,33,0.15)" }}
            >
              <ShieldCheck className="h-5 w-5" style={{ color: "var(--orange)" }} />
            </div>
            <span className="font-bold text-sm tracking-wide">
              DIGIT &amp; TALENT{" "}
              <span className="text-xs font-semibold" style={{ color: "var(--orange)" }}>
                ADMIN
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 border transition cursor-pointer"
              style={{
                backgroundColor: "var(--admin-card-subtle)",
                borderColor: "var(--admin-border)",
                color: "var(--admin-text)",
              }}
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
              aria-label="Changer de thème"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-blue-500" />
              )}
            </button>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 transition cursor-pointer"
              style={{ color: "var(--admin-text-muted)" }}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 border-r ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            backgroundColor: "var(--admin-sidebar-bg)",
            borderColor: "var(--admin-border)",
          }}
        >
          <div className="flex h-full flex-col justify-between p-5">
            <div>
              {/* Logo */}
              <div
                className="flex items-center gap-3 px-2 py-3 mb-6 border-b pb-5"
                style={{ borderColor: "var(--admin-border)" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
                  style={{ backgroundColor: "var(--orange)", color: "white" }}
                >
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-bold text-sm tracking-wide" style={{ color: "var(--admin-text)" }}>
                    DIGIT &amp; TALENT
                  </h2>
                  <span
                    className="inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider mt-0.5"
                    style={{
                      backgroundColor: "rgba(242,106,33,0.12)",
                      color: "var(--orange)",
                      border: "1px solid rgba(242,106,33,0.3)",
                    }}
                  >
                    ESPACE GESTION
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                <p
                  className="px-3 text-[11px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--admin-text-subtle)" }}
                >
                  Gestion des Contenus
                </p>
                {navItems.map((item) => {
                  const isActive = currentPath === item.to || currentPath.startsWith(item.to + "/");
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all"
                      style={
                        isActive
                          ? {
                              backgroundColor: "rgba(242,106,33,0.12)",
                              color: "var(--orange)",
                              border: "1px solid rgba(242,106,33,0.3)",
                              fontWeight: 600,
                            }
                          : {
                              color: "var(--admin-text-muted)",
                              border: "1px solid transparent",
                            }
                      }
                    >
                      <Icon
                        className="h-4 w-4 shrink-0"
                        style={{ color: isActive ? "var(--orange)" : "var(--admin-text-subtle)" }}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer info & Logout */}
            <div className="space-y-3 border-t pt-4" style={{ borderColor: "var(--admin-border)" }}>
              {/* View Website */}
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition"
                style={{
                  backgroundColor: "var(--admin-card-subtle)",
                  color: "var(--admin-text-muted)",
                }}
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Voir le site web
                </span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(242,106,33,0.1)",
                    color: "var(--orange)",
                  }}
                >
                  public
                </span>
              </a>

              {/* Admin user info */}
              <div
                className="flex items-center justify-between px-2 pt-3 border-t"
                style={{ borderColor: "var(--admin-border)" }}
              >
                <div className="truncate pr-2">
                  <p className="text-[11px] font-medium" style={{ color: "var(--admin-text-subtle)" }}>
                    Connecté en tant que
                  </p>
                  <p className="truncate text-xs font-semibold" style={{ color: "var(--admin-text)" }}>
                    {adminEmail}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  title="Se déconnecter"
                  className="rounded-lg p-2 transition cursor-pointer"
                  style={{ color: "var(--admin-text-subtle)" }}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header
            className="border-b px-6 py-4 transition-colors"
            style={{
              backgroundColor: "var(--admin-header-bg)",
              borderColor: "var(--admin-border)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
                  {title}
                </h1>
                {description && (
                  <p className="mt-1 text-sm" style={{ color: "var(--admin-text-muted)" }}>
                    {description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Theme Switcher Button Desktop */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition border cursor-pointer shadow-sm"
                  style={{
                    backgroundColor: "var(--admin-card-bg)",
                    borderColor: "var(--admin-border)",
                    color: "var(--admin-text)",
                  }}
                  title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
                  aria-label="Changer de thème"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4 text-amber-400" />
                      <span>Mode Clair</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 text-blue-600" />
                      <span>Mode Sombre</span>
                    </>
                  )}
                </button>

                {actions && <div className="flex items-center gap-3">{actions}</div>}
              </div>
            </div>
          </header>

          {/* Page body */}
          <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</div>
        </main>
      </div>
    </AdminThemeContext.Provider>
  );
}
