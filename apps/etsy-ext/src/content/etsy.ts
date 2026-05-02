// Inject "Track with Urli" button on Etsy listing pages
const API = "https://api.urli.ideasprout.in";

async function getToken(): Promise<string | null> {
  return new Promise((resolve) =>
    chrome.storage.local.get("accessToken", (r) =>
      resolve(r.accessToken || null),
    ),
  );
}

async function injectButton() {
  const shareSection =
    document.querySelector("[data-share-button]") ||
    document.querySelector(".listing-page-share");
  if (!shareSection || document.getElementById("urli-btn")) return;

  const btn = document.createElement("button");
  btn.id = "urli-btn";
  btn.textContent = "🔗 Track with Urli";
  btn.style.cssText =
    "background:#2563eb;color:white;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;margin-left:8px;";

  btn.addEventListener("click", async () => {
    const token = await getToken();
    if (!token) {
      window.open("https://urli.ideasprout.in/login", "_blank");
      return;
    }

    btn.textContent = "Shortening…";
    btn.disabled = true;

    try {
      const res = await fetch(`${API}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalUrl: window.location.href,
          utmSource: "etsy",
          utmMedium: "listing",
          title: document.title,
        }),
      });
      const data = await res.json();
      if (data.link) {
        const shortUrl = `https://urli.ideasprout.in/${data.link.slug}`;
        await navigator.clipboard.writeText(shortUrl);
        btn.textContent = "✓ Copied: " + shortUrl;
        setTimeout(() => {
          btn.textContent = "🔗 Track with Urli";
          btn.disabled = false;
        }, 3000);
      }
    } catch {
      btn.textContent = "✗ Error";
      btn.disabled = false;
    }
  });

  shareSection.appendChild(btn);
}

// Run on page load and on navigation (Etsy is SPA)
injectButton();
const observer = new MutationObserver(injectButton);
observer.observe(document.body, { childList: true, subtree: true });
