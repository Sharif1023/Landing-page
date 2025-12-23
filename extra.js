// ===============================
// ✏️ EDIT YOUR LANDING PAGES HERE
// ===============================
const links = [
  {
    title: "Nivea Men Cream",
    image: "Image/Navea.png",
    description: "Cinematic parallax product landing page for Nivea Men.",
    url: "https://sharif1023.github.io/NIVEA-MEN/",
    tags: ["product", "parallax"]
  },
  {
    title: "Tee Haven",
    image: "Image/Tee heaven.png",
    description: "Modern ecommerce landing page for premium t-shirts.",
    url: "https://sharif1023.github.io/Tee-haven/",
    tags: ["ecommerce", "fashion"]
  }
];

// ===============================
// Helpers
// ===============================
const $ = (s, r = document) => r.querySelector(s);

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Remove duplicate URLs
const uniqueLinks = (() => {
  const seen = new Set();
  return links.filter(item => {
    if (!item.url || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
})();

const grid = $("#grid");
const searchInput = $("#searchInput");
const totalCount = $("#totalCount");
const shownCount = $("#shownCount");
const emptyState = $("#emptyState");

function cardTemplate(item) {
  return `
    <article class="bg-white border rounded-3xl overflow-hidden hover:shadow-lg transition">
      <img
        src="${escapeHtml(item.image)}"
        alt="${escapeHtml(item.title)}"
        class="w-full h-48 object-cover"
        loading="lazy"
      />

      <div class="p-5">
        <h3 class="font-semibold text-lg">${escapeHtml(item.title)}</h3>
        <p class="text-sm text-slate-600 mt-1">
          ${escapeHtml(item.description)}
        </p>

        <div class="flex flex-wrap gap-2 mt-3">
          ${(item.tags || []).map(t => `
            <span class="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
              #${escapeHtml(t)}
            </span>
          `).join("")}
        </div>

        <div class="mt-5 flex gap-3">
          <a href="${escapeHtml(item.url)}" target="_blank"
             class="flex-1 text-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-700 transition">
            Open Page
          </a>
          <button
            class="px-4 py-2 rounded-xl border text-sm"
            onclick="navigator.clipboard.writeText('${escapeHtml(item.url)}')">
            Copy
          </button>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const q = searchInput.value.toLowerCase().trim();

  const filtered = uniqueLinks.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    (item.tags || []).join(" ").toLowerCase().includes(q)
  );

  totalCount.textContent = uniqueLinks.length;
  shownCount.textContent = filtered.length;

  grid.innerHTML = filtered.map(cardTemplate).join("");
  emptyState.classList.toggle("hidden", filtered.length !== 0);
}

searchInput.addEventListener("input", render);

// Init
render();
