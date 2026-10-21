/*
 * Water ripple: a sheet of water over the whole site.
 * Inlined into every page by components/effects/WaterRipple.tsx (its compiled
 * source is written into a <script>), so it starts the moment the page arrives
 * instead of waiting for React to load. It must stay self-contained: no imports,
 * only browser globals.
 *
 * Moving the mouse drops ripples into a small simulation, and the page bends
 * where they pass (real refraction through an SVG displacement filter on a
 * backdrop, in Chromium browsers). Other browsers get soft light-and-shadow
 * rings that look similar but don't bend the page.
 *
 * - Buttons and form fields never start ripples and never bend.
 * - Elements marked data-lily (project cards) are lily pads: ripples barely
 *   touch them, and a cursor passing underneath makes them drift by
 *   --card-float, like a fish swimming below.
 * - Bend strength comes from the --ripple-strength design token (0 = off).
 * - Nothing runs for reduced motion or touch/pen; the loop sleeps whenever the
 *   water is still; the filter only covers the patch that is moving. If a
 *   machine still can't keep up, ripples switch off for the visit (the
 *   lily-pad drift stays).
 */
export function waterEngine() {
  if (window.__water) return;
  window.__water = true;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var CELL = 8; // simulation cell size in CSS px
  var DAMP = 0.965; // how quickly ripples die away
  var ACTIVE = 0.003; // below this a cell counts as still
  var NO_SPAWN = 'button,.btn,input,textarea,select,label,summary,[contenteditable="true"],[contenteditable=""],[role="button"],[data-lily],[data-no-ripple],dialog';
  var CRISP = 'button,.btn,input,textarea,select,[role="button"],[data-no-ripple]';
  var LILY = "[data-lily]";
  var SVG = "http://www.w3.org/2000/svg";

  var brands = navigator.userAgentData && navigator.userAgentData.brands;
  var refract = !!(brands && brands.some(function (b) { return /Chromium/i.test(b.brand); }));

  function readToken(name, fallback) {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
    return isFinite(v) ? v : fallback;
  }

  function init() {
    // ── DOM: filter, refraction overlay, fallback shading canvas ──
    var svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0"); svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";
    var filter = document.createElementNS(SVG, "filter");
    filter.setAttribute("id", "water-refract");
    ["x", "y"].forEach(function (a) { filter.setAttribute(a, "0"); });
    ["width", "height"].forEach(function (a) { filter.setAttribute(a, "100%"); });
    filter.setAttribute("color-interpolation-filters", "sRGB");
    var img = document.createElementNS(SVG, "feImage");
    img.setAttribute("preserveAspectRatio", "none"); img.setAttribute("result", "map");
    var dmap = document.createElementNS(SVG, "feDisplacementMap");
    dmap.setAttribute("in", "SourceGraphic"); dmap.setAttribute("in2", "map");
    dmap.setAttribute("xChannelSelector", "R"); dmap.setAttribute("yChannelSelector", "G");
    filter.appendChild(img); filter.appendChild(dmap); svg.appendChild(filter);

    var ov = document.createElement("div");
    ov.setAttribute("aria-hidden", "true");
    ov.style.cssText = "position:fixed;z-index:90;pointer-events:none;display:none;backdrop-filter:url(#water-refract)";

    var sh = document.createElement("canvas");
    sh.setAttribute("aria-hidden", "true");
    sh.style.cssText = "position:fixed;left:" + -2 * CELL + "px;top:" + -2 * CELL + "px;width:calc(100vw + " + 4 * CELL + "px);height:calc(100vh + " + 4 * CELL + "px);z-index:90;pointer-events:none;display:none";

    document.body.appendChild(svg);
    document.body.appendChild(ov);
    document.body.appendChild(sh);

    var mapCanvas = document.createElement("canvas");
    var mapCtx = mapCanvas.getContext("2d");
    var shCtx = sh.getContext("2d");

    // ── state ──
    var cols = 0, rows = 0;
    var cur = new Float32Array(0), prev = new Float32Array(0), mask = new Float32Array(0);
    var pixels = null;
    var strength = readToken("--ripple-strength", 16);
    var floatPx = readToken("--card-float", 2);
    var running = false, ripplesOff = false, raf = 0;
    var quiet = 0, frame = 0, lastT = 0;
    var times = [];
    var lilies = new Map();
    var lastX = -1, lastY = -1, lastDrop = 0;
    var bx0 = 0, by0 = 0, bx1 = -1, by1 = -1; // bounds (cells) of water still moving

    function resize() {
      cols = Math.ceil(innerWidth / CELL) + 4;
      rows = Math.ceil(innerHeight / CELL) + 4;
      cur = new Float32Array(cols * rows);
      prev = new Float32Array(cols * rows);
      mask = new Float32Array(cols * rows).fill(1);
      mapCanvas.width = sh.width = cols;
      mapCanvas.height = sh.height = rows;
      pixels = new ImageData(cols, rows);
    }
    // Cell (x, y) covers screen px ((x - 2) * CELL, (y - 2) * CELL).
    function toCell(px) { return px / CELL + 2; }

    function drop(px, py, radius, amount) {
      var cx = toCell(px), cy = toCell(py);
      for (var y = Math.max(2, Math.floor(cy - radius)); y <= Math.min(rows - 3, Math.ceil(cy + radius)); y++) {
        for (var x = Math.max(2, Math.floor(cx - radius)); x <= Math.min(cols - 3, Math.ceil(cx + radius)); x++) {
          var d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
          if (d < radius) cur[y * cols + x] += amount * (0.5 + 0.5 * Math.cos((Math.PI * d) / radius));
        }
      }
    }

    // 1 = full ripple, 0.15 over lily pads, 0 over controls.
    function paint(sel, value) {
      var els = document.querySelectorAll(sel);
      for (var n = 0; n < els.length; n++) {
        var b = els[n].getBoundingClientRect();
        if (b.bottom < 0 || b.top > innerHeight || b.right < 0 || b.left > innerWidth || !b.width) continue;
        var x0 = Math.max(0, Math.floor(toCell(b.left))), x1 = Math.min(cols - 1, Math.ceil(toCell(b.right)));
        var y0 = Math.max(0, Math.floor(toCell(b.top))), y1 = Math.min(rows - 1, Math.ceil(toCell(b.bottom)));
        for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) {
          var i = y * cols + x;
          if (value < mask[i]) mask[i] = value;
        }
      }
    }
    function updateMask() { mask.fill(1); paint(LILY, 0.15); paint(CRISP, 0); }

    function step() {
      var energy = 0;
      bx0 = cols; by0 = rows; bx1 = -1; by1 = -1;
      for (var y = 1; y < rows - 1; y++) {
        for (var x = 1; x < cols - 1; x++) {
          var i = y * cols + x;
          var v = ((cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols]) * 0.5 - prev[i]) * DAMP;
          prev[i] = v;
          var a = v < 0 ? -v : v;
          if (a > energy) energy = a;
          if (a > ACTIVE) {
            if (x < bx0) bx0 = x;
            if (x > bx1) bx1 = x;
            if (y < by0) by0 = y;
            if (y > by1) by1 = y;
          }
        }
      }
      var t = cur; cur = prev; prev = t;
      return energy;
    }

    // Slope over two cells each way: smoother than neighbours, so text bends instead of tearing.
    function at(i) { return i >= 0 && i < cur.length ? cur[i] : 0; }
    function slopeX(i) { return at(i - 2) + at(i - 1) - at(i + 1) - at(i + 2); }
    function slopeY(i) { return at(i - 2 * cols) + at(i - cols) - at(i + cols) - at(i + 2 * cols); }

    function render() {
      var d = pixels.data, i, j;
      if (refract) {
        var gain = 30;
        for (i = 0, j = 0; i < cur.length; i++, j += 4) {
          var m = mask[i];
          d[j] = 128 + Math.max(-127, Math.min(127, slopeX(i) * gain * m));
          d[j + 1] = 128 + Math.max(-127, Math.min(127, slopeY(i) * gain * m));
          d[j + 2] = 128;
          d[j + 3] = 255;
        }
        mapCtx.putImageData(pixels, 0, 0);
        img.setAttribute("href", mapCanvas.toDataURL());
        // Only filter the patch that is moving (plus a margin), not the whole screen.
        if (bx1 >= bx0) {
          var pad = 8;
          var x0 = Math.max(0, bx0 - pad), y0 = Math.max(0, by0 - pad);
          var x1 = Math.min(cols, bx1 + pad), y1 = Math.min(rows, by1 + pad);
          var left = (x0 - 2) * CELL, top = (y0 - 2) * CELL;
          ov.style.left = left + "px"; ov.style.top = top + "px";
          ov.style.width = (x1 - x0) * CELL + "px"; ov.style.height = (y1 - y0) * CELL + "px";
          ov.style.display = "block";
          img.setAttribute("x", String(-left - 2 * CELL));
          img.setAttribute("y", String(-top - 2 * CELL));
          img.setAttribute("width", String(cols * CELL));
          img.setAttribute("height", String(rows * CELL));
        }
      } else {
        for (i = 0, j = 0; i < cur.length; i++, j += 4) {
          var s = (slopeX(i) + slopeY(i)) * 0.5 * mask[i];
          var light = s > 0;
          d[j] = light ? 255 : 31; d[j + 1] = light ? 255 : 42; d[j + 2] = light ? 255 : 46;
          d[j + 3] = Math.min(Math.abs(s) * 90, 60);
        }
        shCtx.putImageData(pixels, 0, 0);
        sh.style.display = "block";
      }
    }

    function moveLilies() {
      var max = floatPx, maxR = Math.min(0.6, max * 0.25);
      lilies.forEach(function (s, el) {
        s.vx = (s.vx - s.x * 0.035) * 0.9;
        s.vy = (s.vy - s.y * 0.035) * 0.9;
        s.vr = (s.vr - s.r * 0.03) * 0.9;
        s.x = Math.max(-max, Math.min(max, s.x + s.vx));
        s.y = Math.max(-max, Math.min(max, s.y + s.vy));
        s.r = Math.max(-maxR, Math.min(maxR, s.r + s.vr));
        if (!el.isConnected || Math.abs(s.x) + Math.abs(s.y) + Math.abs(s.r) + Math.abs(s.vx) + Math.abs(s.vy) < 0.01) {
          el.style.translate = "";
          el.style.rotate = "";
          lilies.delete(el);
        } else {
          el.style.translate = s.x.toFixed(2) + "px " + s.y.toFixed(2) + "px";
          el.style.rotate = s.r.toFixed(3) + "deg";
        }
      });
    }

    function hideWater() { ov.style.display = "none"; sh.style.display = "none"; }

    function loop(t) {
      if (!running) return;
      frame++;
      if (frame % 30 === 1) {
        strength = readToken("--ripple-strength", 16);
        floatPx = readToken("--card-float", 2);
        dmap.setAttribute("scale", String(strength));
      }
      var energy = 0;
      if (!ripplesOff) {
        if (lastT) {
          times.push(t - lastT);
          if (times.length > 30) times.shift();
          // Too slow to stay smooth on this machine: ripples off for the rest of the visit.
          if (frame > 40 && times.length === 30 && times.reduce(function (a, b) { return a + b; }, 0) / 30 > 34) {
            ripplesOff = true;
            document.documentElement.dataset.water = "off";
            hideWater();
          }
        }
        lastT = t;
        if (!ripplesOff) {
          if (frame % 6 === 1) updateMask();
          energy = step();
          if (energy > ACTIVE && strength > 0) render();
          else hideWater();
        }
      }
      moveLilies();
      quiet = energy < ACTIVE && lilies.size === 0 ? quiet + 1 : 0;
      if (quiet > 10) return stop();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      frame = 0; lastT = 0; quiet = 0; times.length = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      hideWater();
      cur.fill(0); prev.fill(0);
    }

    function onMove(e) {
      if (e.pointerType !== "mouse") return;
      var target = e.target instanceof Element ? e.target : null;
      var dx = lastX < 0 ? 0 : e.clientX - lastX, dy = lastY < 0 ? 0 : e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      var speed = Math.hypot(dx, dy);

      var lily = target && target.closest(LILY);
      if (lily && floatPx > 0 && speed > 0) {
        // A fish passing under the pad: a small nudge in the direction it swims.
        var s = lilies.get(lily) || { x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0 };
        var b = lily.getBoundingClientRect();
        var side = (e.clientY - (b.top + b.height / 2)) / (b.height / 2 || 1);
        s.vx += Math.max(-0.35, Math.min(0.35, dx * 0.012));
        s.vy += Math.max(-0.35, Math.min(0.35, dy * 0.012));
        s.vr += Math.max(-0.06, Math.min(0.06, dx * 0.0015 * (side || 1)));
        lilies.set(lily, s);
        start();
      }

      if (ripplesOff || strength <= 0 || speed < 2 || (target && target.closest(NO_SPAWN))) return;
      var now = performance.now();
      if (now - lastDrop < 16) return;
      lastDrop = now;
      drop(e.clientX, e.clientY, 2.6, Math.min(speed * 0.035, 1.2));
      start();
    }

    resize();
    dmap.setAttribute("scale", String(strength));
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); });
    performance.mark("water-ready");
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init, { once: true });
}
