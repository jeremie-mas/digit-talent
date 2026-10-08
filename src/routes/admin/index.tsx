import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("dt_admin_token") : null;
    if (token) {
      navigate({ to: "/admin/dashboard" });
    } else {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  return (
    <div
      className="flex min-h-screen items-center justify-center text-white"
      style={{ backgroundColor: "#070e1f", fontFamily: "var(--font-sans)" }}
    >
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: "var(--orange)", borderTopColor: "transparent" }}
        />
        <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Redirection vers l'espace administration...
        </p>
      </div>
    </div>
  );
}
