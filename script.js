(function () {
  "use strict";

  /* ---------------------------------------------------
     Configuración del proyecto "Salida de Gozo"
     Cambia estas tres constantes si quieres reutilizar
     esta app para otra cuenta atrás.
  --------------------------------------------------- */
  var TOTAL_DAYS = 365;                      // duración total del proyecto
  var START_DATE = new Date(2026, 4, 27);    // 27 de mayo de 2026 (inicio real)
  var TARGET_DATE = new Date(2027, 4, 27);   // 27 de mayo de 2027 (meta)

  var DAY_MS = 24 * 60 * 60 * 1000;
  var RING_RADIUS = 118;                     // debe coincidir con el r del SVG en index.html
  var CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

  var dateFmtLong = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  var dateFmtShort = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  function midnight(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function computeState() {
    var now = new Date();
    var elapsed = Math.max(
      0,
      Math.round((midnight(now) - midnight(START_DATE)) / DAY_MS)
    );
    var remaining = Math.max(0, Math.ceil((TARGET_DATE.getTime() - now.getTime()) / DAY_MS));
    var pct = Math.min(100, Math.max(0, (elapsed / TOTAL_DAYS) * 100));

    return { elapsed: elapsed, remaining: remaining, pct: pct };
  }

  function renderRing(pct) {
    var circle = document.getElementById("dialProgress");
    var offset = CIRCUMFERENCE * (1 - pct / 100);
    circle.style.strokeDasharray = CIRCUMFERENCE.toFixed(2) + " " + CIRCUMFERENCE.toFixed(2);
    circle.style.strokeDashoffset = offset.toFixed(2);
  }

  function pulseNumber() {
    var el = document.getElementById("daysNumber");
    el.classList.remove("pulse");
    void el.offsetWidth; // reinicia la animación
    el.classList.add("pulse");
  }

  function render() {
    var s = computeState();

    document.getElementById("daysNumber").textContent = s.remaining;

    document.getElementById("targetLine").textContent =
      s.remaining > 0
        ? "hasta el " + dateFmtLong.format(TARGET_DATE)
        : "Plazo alcanzado";

    document.getElementById("metaLine").textContent =
      Math.round(s.pct) + "% - " + s.elapsed + " días de " + TOTAL_DAYS;

    document.getElementById("dateRange").textContent =
      dateFmtShort.format(START_DATE) + " \u2192 " + dateFmtShort.format(TARGET_DATE);

    renderRing(s.pct);
  }

  render();
  pulseNumber(); // pequeña entrada animada al cargar

  // refresco ligero: por si la pestaña queda abierta al cruzar la medianoche
  setInterval(render, 60 * 1000);
})();
