type digit_talentErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type digit_talentEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: digit_talentErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __digit_talentEvents?: digit_talentEvents;
  }
}

export function reportdigit_talentError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__digit_talentEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
