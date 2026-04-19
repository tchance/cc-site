// tylerchance.info — shared scripts for both pages.
//
// The expand/collapse delegation attaches globally, but only matches
// .expand-row elements (which only exist on /about), so it's a no-op
// on the home page. Keeping one shared file avoids duplication.

// ── Live sync clock (America/New_York), rendered into the wire bar ──
(function () {
  const clockEl = document.getElementById("sync-clock");
  const dateEl  = document.getElementById("sync-date");
  if (!clockEl || !dateEl) return;

  function updateClock() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour12: false,
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(new Date()).reduce((acc, p) => (acc[p.type] = p.value, acc), {});
    const hh = parts.hour === "24" ? "00" : parts.hour;
    clockEl.textContent = `${hh}:${parts.minute}:${parts.second}`;
    dateEl.textContent  = `${parts.month}/${parts.day}/${parts.year}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
})();

// ── Expand/collapse rows: mouse + keyboard, aria-expanded sync ──
(function () {
  function toggleRow(row) {
    const open = row.dataset.open === "true";
    row.dataset.open = open ? "false" : "true";
    row.setAttribute("aria-expanded", open ? "false" : "true");
    const pill = row.querySelector(".expand-row__toggle-pill");
    if (pill) pill.textContent = open ? "[+]" : "[−]";
  }

  document.addEventListener("click", (e) => {
    const row = e.target.closest(".expand-row");
    if (!row || row.dataset.interactive !== "true") return;
    toggleRow(row);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const row = document.activeElement?.closest?.(".expand-row");
    if (!row || row.dataset.interactive !== "true") return;
    e.preventDefault();
    toggleRow(row);
  });
})();
