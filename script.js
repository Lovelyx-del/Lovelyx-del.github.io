// Portafolio · interacciones mínimas (sin dependencias)

// Año del footer
document.getElementById("year").textContent = new Date().getFullYear();

// Enlaces todavía sin URL: no navegan
document.querySelectorAll("[data-pendiente]").forEach((a) => {
  a.setAttribute("aria-disabled", "true");
  a.addEventListener("click", (e) => e.preventDefault());
});

// Visor de certificados: PDF en <iframe>, imagen en <img>
const viewer = document.getElementById("cert-viewer");
const body = viewer.querySelector(".viewer-body");
const title = viewer.querySelector("#viewer-title");
const openLink = viewer.querySelector(".viewer-foot a");

document.querySelectorAll("button[data-src]").forEach((btn) => {
  // Si el archivo todavía no se subió, el botón queda desactivado
  fetch(btn.dataset.src, { method: "HEAD" })
    .then((r) => { if (!r.ok) throw new Error(); })
    .catch(() => {
      btn.disabled = true;
      btn.textContent = "Pendiente";
    });

  btn.addEventListener("click", () => {
    const src = btn.dataset.src;
    title.textContent = btn.dataset.title || "Certificado";
    openLink.href = btn.dataset.pdf || src;   // el PDF original, si existe
    body.replaceChildren();
    if (/\.(png|jpe?g|webp|avif)$/i.test(src)) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Certificado: ${title.textContent}`;
      body.append(img);
    } else {
      const frame = document.createElement("iframe");
      frame.src = src;
      frame.title = `Certificado: ${title.textContent}`;
      body.append(frame);
    }
    viewer.showModal();
  });
});

viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });
viewer.addEventListener("close", () => body.replaceChildren());

// Carrusel de certificados: flechas que avanzan una tarjeta
const track = document.getElementById("cert-track");
if (track) {
  const btns = document.querySelectorAll(".carousel-btn");
  const step = () => {
    const card = track.querySelector(".cert");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.offsetWidth + gap : track.clientWidth * 0.8;
  };
  const smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  btns.forEach((b) => b.addEventListener("click", () => {
    track.scrollBy({ left: Number(b.dataset.dir) * step(), behavior: smooth });
  }));
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    btns[0].disabled = track.scrollLeft <= 2;
    btns[1].disabled = track.scrollLeft >= max;
  };
  track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  window.addEventListener("resize", update);
  update();
}

// Aparición suave al hacer scroll (se desactiva con reduced motion)
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && "IntersectionObserver" in window) {
  const items = document.querySelectorAll(".section .section-head, .carousel, .project-grid, .about-grid, .contact-list");
  items.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach((el) => io.observe(el));
}

// Resaltar la sección activa en la navegación
const links = [...document.querySelectorAll(".nav-links a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
const navIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((a) => a.removeAttribute("aria-current"));
      const active = links.find((a) => a.getAttribute("href") === `#${entry.target.id}`);
      if (active) active.setAttribute("aria-current", "true");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => s && navIO.observe(s));
