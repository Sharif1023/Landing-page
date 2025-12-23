// ===============================
// ✨ ADD YOUR PROJECTS HERE
// ===============================
const links = [
  {
    title: "Nivea Men Cream",
    image: "Image/Navea.png",
    description: "Cinematic parallax product landing page for Nivea Men.",
    url: "https://sharif1023.github.io/NIVEA-MEN/",
    tags: ["product", "parallax"],
    // optional:
    // purpose: "Product"
  },
  {
    title: "Tee Haven",
    image: "Image/Tee heaven.png",
    description: "Modern ecommerce landing page for premium t-shirts.",
    url: "https://sharif1023.github.io/Tee-haven/",
    tags: ["ecommerce", "fashion"],
    // optional:
    // purpose: "Ecommerce"
  },
   {
    title: "Mobile e-shop",
    image: "Image/mobile.png",
    description: "Modern product promo landing page for showcasing a premium mobile collection with a strong shop-focused call-to-action.",
    url: "https://sharif1023.github.io/Lp_Mobile2/",
    tags: ["Mobile", "ecommerce"],
    // optional:
    // purpose: "Ecommerce"
  },
   {
    title: "E-store ",
    image: "Image/Tee heaven.png",
    description: "Clean and modern ecommerce landing page designed to showcase products and drive online purchases.",
    url: "https://sharif1023.github.io/Landing-Page-1/",
    tags: ["ecommerce", "fashion"],
    // optional:
    // purpose: "Ecommerce"
  },
   {
    title: "Apple e-shop",
    image: "Image/apple.png",
    description: "Modern ecommerce landing page for premium t-shirts.",
    url: "https://sharif1023.github.io/LP_apple/",
    tags: ["Apple", "fashion"],
    // optional:
    // purpose: "Ecommerce"
  },
];

// ===============================
const $ = (s, r = document) => r.querySelector(s);

const grid = $("#grid");
const searchInput = $("#searchInput");
const totalCount = $("#totalCount");
const shownCount = $("#shownCount");
const emptyState = $("#emptyState");

// -------------------------------
// Helpers
// -------------------------------
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(msg) {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-black/80 text-white text-sm z-[9999]";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1400);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied!");
  } catch {
    toast("Copy failed");
  }
}

// Remove duplicate URLs
const uniqueLinks = (() => {
  const seen = new Set();
  const out = [];
  for (const item of links) {
    const url = String(item?.url ?? "").trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);

    out.push({
      title: String(item?.title ?? "Untitled Project"),
      image: String(item?.image ?? ""),
      description: String(item?.description ?? ""),
      url,
      tags: Array.isArray(item?.tags) ? item.tags : [],
      // purpose optional
      purpose: String(item?.purpose ?? ""), // keep empty if not provided
    });
  }
  return out;
})();

// -------------------------------
// Card Template (mobile compact)
// -------------------------------
function cardTemplate(item) {
  const badgeText =
    item.purpose?.trim()
      ? item.purpose.trim()
      : (item.tags?.[0] ? String(item.tags[0]) : "");

  return `
    <article class="group bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">
      <!-- Image (mobile ছোট) -->
      <div class="relative overflow-hidden">
        <img
          src="${escapeHtml(item.image)}"
          alt="${escapeHtml(item.title)}"
          class="w-full h-28 sm:h-44 lg:h-56 object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>

        ${
          badgeText
            ? `<span class="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-white/90 backdrop-blur border">
                 ${escapeHtml(badgeText)}
               </span>`
            : ""
        }
      </div>

      <!-- Content (mobile compact) -->
      <div class="p-3 sm:p-6">
        <h3 class="text-sm sm:text-lg font-semibold tracking-tight leading-snug line-clamp-2">
          ${escapeHtml(item.title)}
        </h3>

        <p class="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2 leading-relaxed line-clamp-2">
          ${escapeHtml(item.description)}
        </p>

        <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-4">
          ${(item.tags || []).slice(0, 4).map(t => `
            <span class="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
              ${escapeHtml(t)}
            </span>
          `).join("")}
        </div>

        <div class="mt-3 sm:mt-6 flex items-center gap-2 sm:gap-3">
          <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener"
             class="flex-1 text-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm hover:bg-slate-700 transition">
            View
          </a>

          <button type="button" data-copy="${escapeHtml(item.url)}"
            class="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm hover:bg-slate-50 transition">
            Copy
          </button>
        </div>
      </div>
    </article>
  `;
}

// -------------------------------
// Render
// -------------------------------
function render() {
  const q = (searchInput?.value || "").toLowerCase().trim();

  const filtered = uniqueLinks.filter(item => {
    const blob = [
      item.title,
      item.description,
      item.purpose,
      (item.tags || []).join(" "),
    ].join(" ").toLowerCase();

    return !q || blob.includes(q);
  });

  totalCount.textContent = String(uniqueLinks.length);
  shownCount.textContent = String(filtered.length);

  grid.innerHTML = filtered.map(cardTemplate).join("");
  emptyState.classList.toggle("hidden", filtered.length !== 0);

  // bind copy buttons
  grid.querySelectorAll("button[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-copy") || "";
      if (!url) return;
      copyText(url);
    });
  });
}

if (searchInput) searchInput.addEventListener("input", render);
render();
