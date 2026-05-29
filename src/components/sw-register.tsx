"use client";

import { useEffect, useState } from "react";

/** Registers the service worker and shows a slim banner while offline. */
export function ServiceWorkerRegister() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration is best-effort */
      });
    }
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "var(--v2-ink, #0F0E0C)",
        color: "#FFD400",
        textAlign: "center",
        fontFamily: "var(--v2-font-mono, monospace)",
        fontSize: 12,
        padding: "6px 8px",
        letterSpacing: "0.04em",
      }}
    >
      OFFLINE · showing last-loaded data · changes sync when you reconnect
    </div>
  );
}
