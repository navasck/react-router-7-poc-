if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js?v=2")
      .then(() => console.log("Service Worker registered"))
      .catch(err => console.log("SW registration failed", err));
  });
}
