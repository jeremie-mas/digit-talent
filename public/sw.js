self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { title: "DIGIT & TALENT", body: "Nouvelle inscription à une formation", url: "/admin/formations" };
  }

  event.waitUntil(self.registration.showNotification(payload.title || "DIGIT & TALENT", {
    body: payload.body || "Nouvelle inscription à une formation",
    icon: "/favicon.png",
    badge: "/favicon.png",
    data: { url: payload.url || "/admin/formations" },
    tag: payload.tag || "training-registration",
    renotify: true,
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/admin/formations", self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    const existing = clients.find((client) => new URL(client.url).origin === self.location.origin);
    if (existing) {
      existing.navigate(targetUrl);
      return existing.focus();
    }
    return self.clients.openWindow(targetUrl);
  }));
});
