(function () {
  "use strict"; const r = { WIDGET_URL: "https://vivia-widget.vercel.app", DEFAULT_POSITION: "bottom-right" }, u = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
</svg>`, x = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`; (function () {
    let n = null, t = null, e = null, l = !1, a = null, o = r.DEFAULT_POSITION; const c = document.currentScript; if (c) a = c.getAttribute("data-organization-id"), o = c.getAttribute("data-position") || r.DEFAULT_POSITION; else { const i = document.querySelectorAll("script"), s = Array.from(i).find(d => d.hasAttribute("data-organization-id")); s && (a = s.getAttribute("data-organization-id"), o = s.getAttribute("data-position") || r.DEFAULT_POSITION) } if (!a) { console.error("Vivia Widget: data-organization-id attribute is required"); return } function h() { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", g) : g() } function g() {
      e = document.createElement("button"), e.id = "vivia-widget-button", e.innerHTML = u, e.style.cssText = `
      position: fixed;
      ${o === "bottom-right" ? "right: 20px;" : "left: 20px;"}
      bottom: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #09090b;
      color: white;
      border: none;
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
      transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
    `, e.addEventListener("click", y), e.addEventListener("mouseenter", () => { e && (e.style.transform = "scale(1.08) translateY(-2px)") }), e.addEventListener("mouseleave", () => { e && (e.style.transform = "scale(1) translateY(0)") }), document.body.appendChild(e), t = document.createElement("div"), t.id = "vivia-widget-container", t.style.cssText = `
      position: fixed;
      ${o === "bottom-right" ? "right: 20px;" : "left: 20px;"}
      bottom: 90px;
      width: 400px;
      height: 600px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 110px);
      z-index: 999998;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
      display: none;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transform-origin: ${o === "bottom-right" ? "bottom right" : "bottom left"};
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `, n = document.createElement("iframe"), n.src = w(), n.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `, n.allow = "microphone; clipboard-read; clipboard-write", t.appendChild(n), document.body.appendChild(t), window.addEventListener("message", f)
    } function w() { const i = new URLSearchParams; return i.append("organizationId", a), `${r.WIDGET_URL}?${i.toString()}` } function f(i) { if (i.origin !== new URL(r.WIDGET_URL).origin) return; const { type: s, payload: d } = i.data; switch (s) { case "close": p(); break; case "resize": d.height && t && (t.style.height = `${d.height}px`); break } } function y() { l ? p() : m() } function m() { t && e && (l = !0, t.style.display = "block", setTimeout(() => { t && (t.style.opacity = "1", t.style.transform = "translateY(0) scale(1)") }, 10), e.innerHTML = x) } function p() { t && e && (l = !1, t.style.opacity = "0", t.style.transform = "translateY(20px) scale(0.95)", setTimeout(() => { t && (t.style.display = "none") }, 300), e.innerHTML = u, e.style.background = "#09090b") } function b() { window.removeEventListener("message", f), t && (t.remove(), t = null, n = null), e && (e.remove(), e = null), l = !1 } function v(i) { b(), i.organizationId && (a = i.organizationId), i.position && (o = i.position), h() } window.ViviaWidget = { init: v, show: m, hide: p, destroy: b }, h()
  })()
})();
