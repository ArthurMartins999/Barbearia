// ===== Config =====
const PHONE = "5562991606500"; // 55 + DDD + número (sem espaços)
const DEFAULT_MESSAGE = `Olá! Quero agendar um horário na barbearia em Goiânia.
Serviço: (Corte / Barba / Corte+Barba)
Dia e horário:
Meu nome:`;

// ===== Helpers =====
function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${PHONE}?text=${text}`;
}

// ===== Set year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== WhatsApp links =====
const waButtons = [
  document.getElementById("ctaWhatsapp"),
  document.getElementById("waFloat"),
];

waButtons.forEach(btn => {
  if (!btn) return;
  btn.href = waLink(DEFAULT_MESSAGE);
});

const ctaHero = document.getElementById("ctaHero");
const ctaCard = document.getElementById("ctaCard");
if (ctaHero) ctaHero.addEventListener("click", (e) => { /* rolagem já resolve */ });
if (ctaCard) ctaCard.addEventListener("click", (e) => { /* rolagem já resolve */ });

// ===== Copiar mensagem =====
const copyBtn = document.getElementById("copyMsg");
const msgBox = document.getElementById("msgBox");

if (copyBtn && msgBox) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(msgBox.innerText.trim());
      copyBtn.textContent = "Mensagem copiada ✅";
      setTimeout(() => (copyBtn.textContent = "Copiar mensagem"), 1500);
    } catch (err) {
      alert("Não consegui copiar automaticamente. Selecione e copie o texto manualmente.");
    }
  });
}

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu() {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
}

function openMenu() {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.classList.add("open");
  menuBtn.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  document.querySelectorAll(".m-link").forEach(link => {
    link.addEventListener("click", () => closeMenu());
  });

  // fecha ao clicar fora
  document.addEventListener("click", (e) => {
    const inside = mobileMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!inside) closeMenu();
  });
}

// ===== Animação ao rolar tela =====
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in");
  });
}, { threshold: 0.14 });

reveals.forEach(el => io.observe(el));
