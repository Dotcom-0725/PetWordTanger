/* Tanger Animalerie — shared site behavior
   No backend: WhatsApp deep-links replace checkout/contact form submission. */

// ⚠️ REPLACE with the real business WhatsApp number (country code, no +, no spaces)
const WHATSAPP_NUMBER = "212600000000";

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------- Mobile nav drawer ---------- */
function initNavDrawer() {
  const drawer = document.querySelector("[data-nav-drawer]");
  const openBtn = document.querySelector("[data-nav-open]");
  const closeBtn = document.querySelector("[data-nav-close]");
  if (!drawer || !openBtn) return;
  const open = () => drawer.classList.add("open");
  const close = () => drawer.classList.remove("open");
  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  drawer.querySelector(".backdrop")?.addEventListener("click", close);
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

/* ---------- Wire up every element with a data-wa-msg attribute ---------- */
function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa-msg]").forEach((el) => {
    el.href = waLink(el.getAttribute("data-wa-msg"));
    el.target = "_blank";
    el.rel = "noopener";
  });
  const floatBtn = document.querySelector(".wa-float");
  if (floatBtn && !floatBtn.getAttribute("data-wa-msg")) {
    floatBtn.href = waLink("Bonjour, j'ai une question.");
    floatBtn.target = "_blank";
    floatBtn.rel = "noopener";
  }
}

/* ---------- Catalog filters ---------- */
function initFilters() {
  const bar = document.querySelector("[data-filter-bar]");
  if (!bar) return;
  const buttons = bar.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-category]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        const match = target === "all" || card.getAttribute("data-category") === target;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

/* ---------- Cart (localStorage) ---------- */
const CART_KEY = "ta_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find((i) => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart(cart);
  showToast(`Ajouté au panier : ${name}`);
  openCart();
}

function changeQty(name, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.name === name);
  if (!item) return;
  item.qty += delta;
  const next = item.qty <= 0 ? cart.filter((i) => i.name !== name) : cart;
  saveCart(next);
}

function removeFromCart(name) {
  saveCart(getCart().filter((i) => i.name !== name));
}

function cartTotal(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function renderCart() {
  const cart = getCart();
  const countEls = document.querySelectorAll(".cart-count");
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  countEls.forEach((el) => {
    el.textContent = totalQty;
    el.style.display = totalQty > 0 ? "flex" : "none";
  });

  const itemsEl = document.querySelector(".cart-items");
  const totalEl = document.querySelector("[data-cart-total]");
  const checkoutBtn = document.querySelector("[data-cart-checkout]");
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Votre panier est vide.<br>Ajoutez des produits depuis la boutique.</p>`;
  } else {
    itemsEl.innerHTML = cart
      .map(
        (i) => `
      <div class="cart-item">
        <div class="ic">🛍️</div>
        <div style="flex:1;">
          <div class="name">${i.name}</div>
          <div class="qty-row">
            <button class="qty-btn" data-qty-minus="${i.name}">−</button>
            <span>${i.qty}</span>
            <button class="qty-btn" data-qty-plus="${i.name}">+</button>
            <span style="margin-left:8px;color:var(--text-soft);">${i.price * i.qty} DH</span>
            <button class="remove" data-remove="${i.name}">Retirer</button>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  if (totalEl) totalEl.textContent = `${cartTotal(cart)} DH`;
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
    const lines = cart.map((i) => `- ${i.qty}x ${i.name} (${i.price * i.qty} DH)`).join("\n");
    const message = `Bonjour, je souhaite commander :\n${lines}\n\nTotal estimé : ${cartTotal(cart)} DH`;
    checkoutBtn.href = cart.length ? waLink(message) : "#";
  }

  itemsEl.querySelectorAll("[data-qty-plus]").forEach((b) =>
    b.addEventListener("click", () => changeQty(b.getAttribute("data-qty-plus"), 1))
  );
  itemsEl.querySelectorAll("[data-qty-minus]").forEach((b) =>
    b.addEventListener("click", () => changeQty(b.getAttribute("data-qty-minus"), -1))
  );
  itemsEl.querySelectorAll("[data-remove]").forEach((b) =>
    b.addEventListener("click", () => removeFromCart(b.getAttribute("data-remove")))
  );
}

function openCart() {
  document.querySelector("[data-cart-drawer]")?.classList.add("open");
}
function closeCart() {
  document.querySelector("[data-cart-drawer]")?.classList.remove("open");
}

function initCart() {
  document.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
  document.querySelectorAll("[data-cart-open]").forEach((el) => el.addEventListener("click", openCart));
  document.querySelector("[data-cart-close]")?.addEventListener("click", closeCart);
  document.querySelector("[data-cart-drawer] .backdrop")?.addEventListener("click", closeCart);
  renderCart();
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(text) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Contact form -> WhatsApp ---------- */
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#c-name").value.trim();
    const phone = form.querySelector("#c-phone").value.trim();
    const subject = form.querySelector("#c-subject").value;
    const msg = form.querySelector("#c-message").value.trim();
    const message = `Bonjour, je m'appelle ${name} (${phone}).\nSujet : ${subject}\n\n${msg}`;
    window.open(waLink(message), "_blank", "noopener");
  });
}

/* ---------- Nav glass shadow on scroll ---------- */
function initNavScroll() {
  const nav = document.querySelector("nav.main");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Scroll-reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), i * 60);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Animated stat counters ---------- */
function initCounters() {
  const els = document.querySelectorAll("[data-counter]");
  if (!els.length) return;
  const animate = (el) => {
    const target = parseFloat(el.getAttribute("data-counter"));
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = el.getAttribute("data-counter").includes(".") ? 1 : 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) {
    els.forEach(animate);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Wishlist (localStorage) ---------- */
const WISHLIST_KEY = "ta_wishlist";

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function renderWishlistState() {
  const list = getWishlist();
  document.querySelectorAll("[data-wish]").forEach((btn) => {
    const name = btn.getAttribute("data-wish");
    btn.classList.toggle("active", list.includes(name));
    btn.textContent = list.includes(name) ? "♥" : "♡";
  });
  document.querySelectorAll(".wishlist-count").forEach((el) => {
    el.textContent = list.length;
    el.style.display = list.length > 0 ? "flex" : "none";
  });
}

function initWishlist() {
  document.querySelectorAll("[data-wish]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = btn.getAttribute("data-wish");
      let list = getWishlist();
      if (list.includes(name)) {
        list = list.filter((n) => n !== name);
        showToast(`Retiré des favoris : ${name}`);
      } else {
        list.push(name);
        showToast(`Ajouté aux favoris : ${name}`);
      }
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
      renderWishlistState();
    });
  });
  renderWishlistState();
}

/* ---------- Compare (localStorage, lightweight) ---------- */
const COMPARE_KEY = "ta_compare";
const COMPARE_MAX = 3;

function getCompare() {
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY)) || [];
  } catch {
    return [];
  }
}

function renderCompareBar() {
  const list = getCompare();
  let bar = document.querySelector(".compare-bar");
  if (list.length === 0) {
    bar?.remove();
    return;
  }
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "compare-bar";
    bar.innerHTML = `
      <div class="wrap" style="display:flex;align-items:center;gap:14px;padding:14px 24px;">
        <strong style="font-size:13.5px;">Comparer (<span class="compare-n"></span>/${COMPARE_MAX})</strong>
        <div class="compare-names" style="display:flex;gap:8px;flex-wrap:wrap;flex:1;font-size:12.5px;color:var(--text-soft);"></div>
        <button class="btn btn-outline btn-sm" data-compare-clear type="button">Effacer</button>
      </div>`;
    Object.assign(bar.style, {
      position: "fixed", left: "0", right: "0", bottom: "0", zIndex: "55",
      background: "var(--surface)", borderTop: "1px solid var(--line)", boxShadow: "var(--shadow-lg)",
    });
    document.body.appendChild(bar);
    bar.querySelector("[data-compare-clear]").addEventListener("click", () => {
      localStorage.removeItem(COMPARE_KEY);
      renderCompareBar();
      renderCompareState();
    });
  }
  bar.querySelector(".compare-n").textContent = list.length;
  bar.querySelector(".compare-names").innerHTML = list.map((n) => `<span class="tag-badge neutral">${n}</span>`).join("");
}

function renderCompareState() {
  const list = getCompare();
  document.querySelectorAll("[data-compare]").forEach((chk) => {
    chk.checked = list.includes(chk.getAttribute("data-compare"));
  });
  renderCompareBar();
}

function initCompare() {
  document.querySelectorAll("[data-compare]").forEach((chk) => {
    chk.addEventListener("change", () => {
      const name = chk.getAttribute("data-compare");
      let list = getCompare();
      if (chk.checked) {
        if (list.length >= COMPARE_MAX) {
          showToast(`Maximum ${COMPARE_MAX} produits à comparer`);
          chk.checked = false;
          return;
        }
        list.push(name);
      } else {
        list = list.filter((n) => n !== name);
      }
      localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
      renderCompareBar();
    });
  });
  renderCompareBar();
}

/* ---------- Live search (filters cards by visible title text) ---------- */
function initSearch() {
  const input = document.querySelector("[data-search]");
  if (!input) return;
  const cards = document.querySelectorAll("[data-searchable]");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = !q || text.includes(q) ? "" : "none";
    });
  });
}

/* ---------- Checkout page order summary ---------- */
function initCheckoutSummary() {
  const summary = document.querySelector("[data-checkout-summary]");
  if (!summary) return;
  const cart = getCart();
  if (cart.length === 0) {
    summary.innerHTML = `<p class="cart-empty">Votre panier est vide. <a href="boutique.html" style="color:var(--green-700);font-weight:700;">Retourner à la boutique →</a></p>`;
  } else {
    summary.innerHTML = cart
      .map(
        (i) => `
      <div class="cart-item">
        <div class="ic">🛍️</div>
        <div style="flex:1;">
          <div class="name">${i.name}</div>
          <div style="font-size:12.5px;color:var(--text-soft);">${i.qty} x ${i.price} DH = ${i.qty * i.price} DH</div>
        </div>
      </div>`
      )
      .join("");
  }
  const totalEl = document.querySelector("[data-checkout-total]");
  if (totalEl) totalEl.textContent = `${cartTotal(cart)} DH`;

  const form = document.querySelector("[data-checkout-form]");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#o-name").value.trim();
    const phone = form.querySelector("#o-phone").value.trim();
    const address = form.querySelector("#o-address").value.trim();
    const payment = form.querySelector("#o-payment").value;
    const lines = cart.map((i) => `- ${i.qty}x ${i.name} (${i.qty * i.price} DH)`).join("\n");
    const message = `Bonjour, je confirme ma commande :\n${lines}\n\nTotal : ${cartTotal(cart)} DH\n\nNom : ${name}\nTéléphone : ${phone}\nAdresse de livraison : ${address}\nPaiement : ${payment}`;
    window.open(waLink(message), "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavDrawer();
  initNavScroll();
  initWhatsAppLinks();
  initFilters();
  initCart();
  initContactForm();
  initReveal();
  initCounters();
  initWishlist();
  initCompare();
  initSearch();
  initCheckoutSummary();
});
