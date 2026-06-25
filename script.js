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
  var TICKS = 73; // tira de la barra de progreso (proporcional, no depende del nº de días)

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

  function renderTicks(pct) {
    var row = document.getElementById("ledgerRow");
    var filled = Math.round((pct / 100) * TICKS);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < TICKS; i++) {
      var span = document.createElement("span");
      span.className = "tick" + (i < filled ? " is-filled" : "");
      frag.appendChild(span);
    }
    row.innerHTML = "";
    row.appendChild(frag);
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

    document.getElementById("elapsedText").textContent =
      s.elapsed + " días transcurridos de " + TOTAL_DAYS;
    document.getElementById("percentText").textContent = Math.round(s.pct) + "%";

    document.getElementById("dateRange").textContent =
      dateFmtShort.format(START_DATE) + " \u2192 " + dateFmtShort.format(TARGET_DATE);

    renderTicks(s.pct);
  }

  render();
  pulseNumber(); // pequeña entrada animada al cargar

  // refresco ligero: por si la pestaña queda abierta al cruzar la medianoche
  setInterval(render, 60 * 1000);
})();
