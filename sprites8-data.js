/* Heimdall Sigil — 8×8 essentials-tier sprite library.
   Same alphabet as detailed tier: . bg | 1 body | 2 eye | 3 highlight | 4 shadow | 5 outline | 6 accent-A | 7 accent-B
   Light source: top-left. window.SIGIL8 = data + compose + validate + render helpers. */
(function () {
  'use strict';

  var SIZE = 8;

  // ---- Expressions: 6 wide × 3 tall, stamped at (faceX, faceY). '_' = keep body pixel.
  var EXPRESSIONS = {
    neutral: ["______", "_2__2_", "__55__"],
    joy:     ["______", "_2__2_", "_5555_"],
    grin:    ["______", "_2__2_", "_5775_"],
    grump:   ["_5__5_", "_2__2_", "__55__"],
    shock:   ["_2__2_", "______", "___5__"],
    rage:    ["5____5", "_2__2_", "_5555_"],
    worry:   ["______", "_2__2_", "_5_5__"],
    shifty:  ["______", "__2__2", "__55__"],
    glee:    ["_2__2_", "______", "_5555_"],
    blep:    ["______", "_2__2_", "__57__"]
  };

  // ---- Body archetypes: 8 rows × 8 chars, face area left as body fill.
  var BODIES = {
    cat: { faceX: 1, faceY: 3, grid: [
      ".5....5.",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54111445",
      ".544445."
    ]},
    fox: { faceX: 1, faceY: 3, grid: [
      "55....55",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54166445",
      ".544445."
    ]},
    rabbit: { faceX: 1, faceY: 4, grid: [
      ".5....5.",
      ".5....5.",
      ".555555.",
      "53331115",
      "51111115",
      "51111115",
      "51111145",
      ".544445."
    ]},
    panda: { faceX: 1, faceY: 3, grid: [
      "66....66",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54111445",
      ".544445."
    ]},
    dog: { faceX: 1, faceY: 3, isoGaze: 0, grid: [
      "........",
      ".555555.",
      "54333145",
      "53111115",
      "51111115",
      "51111145",
      "54166445",
      ".544445."
    ]},
    owl: { faceX: 1, faceY: 3, grid: [
      "5......5",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54717145",
      ".544445."
    ]},
    frog: { faceX: 1, faceY: 2, isoGaze: 0, grid: [
      "55....55",
      "53555535",
      "53111115",
      "51111115",
      "51111115",
      "51111145",
      "54111445",
      ".544445."
    ]},
    penguin: { faceX: 1, faceY: 3, grid: [
      "........",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54666445",
      ".544445."
    ]},
    robot: { faceX: 1, faceY: 3, grid: [
      "...6....",
      "55555555",
      "53333315",
      "53111115",
      "51111115",
      "51111145",
      "54444445",
      ".544445."
    ]},
    ghost: { faceX: 1, faceY: 3, grid: [
      "........",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111115",
      "51111115",
      "54.55.45"
    ]},
    slime: { faceX: 1, faceY: 3, grid: [
      "........",
      "..5555..",
      ".533315.",
      "53111115",
      "51111115",
      "51111115",
      "54111445",
      ".555555."
    ]},
    dragon: { faceX: 1, faceY: 3, grid: [
      ".6....6.",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54747445",
      ".544445."
    ]},
    bat: { faceX: 1, faceY: 3, isoGaze: 0, grid: [
      "5......5",
      "55555555",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54111445",
      ".544445."
    ]},
    monk: { faceX: 1, faceY: 3, grid: [
      "........",
      ".555555.",
      "53333315",
      "53111115",
      "51111115",
      "51111145",
      "56666665",
      ".544445."
    ]},
    sprout: { faceX: 1, faceY: 3, grid: [
      "..66....",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54111445",
      ".544445."
    ]},
    mouse: { faceX: 1, faceY: 3, grid: [
      "55....55",
      "55555555",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54111445",
      ".544445."
    ]},
    hero: { faceX: 1, faceY: 3, grid: [
      "........",
      ".555555.",
      "53111115",
      "51666615",
      "51666615",
      "51666615",
      "54666445",
      ".544445."
    ]},
    wizard: { faceX: 1, faceY: 3, grid: [
      "...55...",
      "55555555",
      "51111115",
      "56666665",
      "56666665",
      "56666665",
      "54666445",
      ".544445."
    ]},
    flame: { faceX: 1, faceY: 3, grid: [
      "..77....",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "54666445",
      ".544445."
    ]},
    shell: { faceX: 1, faceY: 3, grid: [
      "........",
      ".555555.",
      "57777775",
      "53111115",
      "51111115",
      "51111145",
      "54111445",
      ".544445."
    ]},
    poppet: { faceX: 1, faceY: 3, grid: [
      "........",
      ".555555.",
      "57777775",
      "57666675",
      "57666675",
      "56666665",
      "54666445",
      ".544445."
    ]},
    pearl: { faceX: 1, faceY: 3, grid: [
      ".5555...",
      "577775..",
      "53111115",
      "51111115",
      "51111115",
      "51111165",
      "54111445",
      ".544445."
    ]},
    lisa: { faceX: 1, faceY: 3, grid: [
      "........",
      ".555555.",
      "57777775",
      "57111175",
      "57111175",
      "57111175",
      "57111745",
      ".544445."
    ]},
    howl: { faceX: 1, faceY: 3, grid: [
      ".5....5.",
      ".555555.",
      "53333115",
      "53111115",
      "51111115",
      "51111145",
      "56666665",
      ".544445."
    ]}
  };

  // ---- Roster: identical to the 16×16 detailed tier — same families, names, hues.
  var PINK = "#e08a9b";
  var FAMILIES = [
    { body: "cat",     accent6: PINK,      accent7: PINK, variants: [
      ["neutral", "#e8a13c"], ["joy", "#e8a13c"], ["grump", "#8f9aa8"], ["shock", "#8f9aa8"],
      ["blep", "#e8d5b0"], ["rage", "#566073"], ["shifty", "#e8d5b0"] ] },
    { body: "fox",     accent6: "#f0c8a0", accent7: PINK, variants: [
      ["joy", "#e0783c"], ["grin", "#e0783c"], ["shifty", "#e0783c"], ["rage", "#b0503c"],
      ["neutral", "#d7dde3"], ["blep", "#d7dde3"], ["worry", "#b0503c"] ] },
    { body: "rabbit",  accent6: PINK,      accent7: PINK, variants: [
      ["neutral", "#d7c8e8"], ["joy", "#d7c8e8"], ["shock", "#e8e4da"], ["worry", "#e8e4da"],
      ["blep", "#a8845c"], ["glee", "#a8845c"], ["grump", "#d7c8e8"] ] },
    { body: "panda",   accent6: "#2e3338", accent7: PINK, variants: [
      ["neutral", "#e8e4dc"], ["joy", "#e8e4dc"], ["blep", "#e8e4dc"], ["shock", "#e8e4dc"],
      ["worry", "#e8e4dc"], ["glee", "#e8e4dc"], ["shifty", "#e8e4dc"] ] },
    { body: "dog",     accent6: "#3a2f28", accent7: PINK, variants: [
      ["joy", "#c89b6a"], ["glee", "#c89b6a"], ["blep", "#c89b6a"], ["neutral", "#98a8b8"],
      ["worry", "#98a8b8"], ["shock", "#7a5236"], ["grin", "#7a5236"] ] },
    { body: "owl",     accent6: "#e8963c", accent7: "#d9c9a8", variants: [
      ["neutral", "#8a7462"], ["shifty", "#8a7462"], ["shock", "#e3e0d5"], ["grump", "#e3e0d5"],
      ["rage", "#b58d4f"], ["joy", "#b58d4f"], ["worry", "#8a7462"] ] },
    { body: "frog",    accent6: PINK,      accent7: PINK, variants: [
      ["neutral", "#6fae4e"], ["joy", "#6fae4e"], ["grump", "#6fae4e"], ["worry", "#8fd14f"],
      ["shifty", "#8fd14f"], ["blep", "#4e8ba3"], ["rage", "#4e8ba3"] ] },
    { body: "penguin", accent6: "#eef2f0", accent7: "#e8963c", variants: [
      ["neutral", "#4a5a6e"], ["joy", "#4a5a6e"], ["shock", "#4a5a6e"], ["worry", "#37414f"],
      ["glee", "#37414f"], ["shifty", "#5d7288"], ["grump", "#5d7288"] ] },
    { body: "robot",   accent6: "#e8b23c", accent7: PINK, variants: [
      ["neutral", "#8f9aa8"], ["shock", "#8f9aa8"], ["grump", "#8f9aa8"], ["rage", "#c07840"],
      ["glee", "#c07840"], ["shifty", "#6e8a94"], ["worry", "#6e8a94"] ] },
    { body: "ghost",   accent6: PINK,      accent7: PINK, variants: [
      ["neutral", "#cfd8de"], ["shock", "#cfd8de"], ["worry", "#cfd8de"], ["joy", "#cfd8de"],
      ["glee", "#aebfd4"], ["shifty", "#aebfd4"], ["grump", "#9aa8c4"] ] },
    { body: "slime",   accent6: PINK,      accent7: PINK, variants: [
      ["joy", "#5fb86a"], ["glee", "#5fb86a"], ["blep", "#4a90c2"], ["neutral", "#4a90c2"],
      ["shock", "#d878a8"], ["worry", "#d878a8"], ["grin", "#5fb86a"] ] },
    { body: "dragon",  accent6: "#e8d5b0", accent7: PINK, variants: [
      ["rage", "#c25050"], ["grin", "#c25050"], ["neutral", "#4f9e6b"], ["joy", "#4f9e6b"],
      ["shock", "#4a7ec2"], ["grump", "#4a7ec2"], ["shifty", "#4f9e6b"] ] },
    { body: "bat",     accent6: PINK,      accent7: PINK, variants: [
      ["neutral", "#7a68b8"], ["shock", "#7a68b8"], ["shifty", "#566073"], ["rage", "#566073"],
      ["worry", "#98a8b8"], ["glee", "#98a8b8"], ["grump", "#7a68b8"] ] },
    { body: "monk",    accent6: "#d9a441", accent7: PINK, variants: [
      ["neutral", "#b05a3c"], ["joy", "#b05a3c"], ["shifty", "#b05a3c"], ["grump", "#4f9e8b"],
      ["worry", "#4f9e8b"], ["shock", "#4f9e8b"], ["glee", "#b05a3c"] ] },
    { body: "sprout",  accent6: "#4f8a2f", accent7: PINK, variants: [
      ["joy", "#7ab648"], ["neutral", "#7ab648"], ["blep", "#7ab648"], ["shock", "#a4cf5a"],
      ["worry", "#a4cf5a"], ["glee", "#a4cf5a"], ["shifty", "#7ab648"] ] },
    { body: "mouse",   accent6: PINK,      accent7: PINK, variants: [
      ["neutral", "#8f9aa8"], ["joy", "#8f9aa8"], ["glee", "#a8845c"], ["shock", "#a8845c"],
      ["blep", "#e8d5b0"], ["shifty", "#e8d5b0"], ["grump", "#8f9aa8"] ] },
    { key: "squad", body: "shell", accent6: "#d9b98a", accent7: PINK, variants: [
      { name: "snap", expr: "rage",    hue: "#4f9e4a", accent7: "#c25050" },
      { name: "bolt", expr: "neutral", hue: "#4f9e4a", accent7: "#4a7ec2" },
      { name: "sage", expr: "shifty",  hue: "#4f9e4a", accent7: "#7a68b8" },
      { name: "zip",  expr: "joy",     hue: "#4f9e4a", accent7: "#e8963c" } ] },
    { key: "crew", body: "hero", accent6: "#e8c49a", accent7: "#e8b23c", variants: [
      { name: "scoots", expr: "blep",   hue: "#a8734a", body: "dog", accent6: "#3a2f28", accent7: PINK },
      { name: "lanky",  expr: "worry",  hue: "#7ab648" } ] },
    { key: "rogues", body: "wizard", accent6: "#e8c49a", accent7: "#7a5236", variants: [
      { name: "strawman",  expr: "worry", hue: "#c89b6a" } ] },
    { key: "critters", body: "flame", accent6: "#e8b23c", accent7: "#e8b23c", variants: [
      { name: "emberimp",   expr: "grin",    hue: "#e8763c" },
      { name: "sparkbug",   expr: "glee",    hue: "#e8c832", body: "bat", accent6: PINK, accent7: PINK },
      { name: "aquabub",    expr: "joy",     hue: "#4a90c2", body: "frog", accent6: PINK, accent7: PINK },
      { name: "leafhop",    expr: "neutral", hue: "#7ab648", body: "rabbit", accent6: "#4f8a2f", accent7: PINK },
      { name: "frostpup",   expr: "blep",    hue: "#9ec4e8", body: "dog", accent6: "#4a5a6e", accent7: PINK },
      { name: "shadowmoth", expr: "shifty",  hue: "#5a4a7a", body: "owl", accent6: "#e8963c", accent7: "#8a78b0" } ] },
    { key: "trio", body: "poppet", accent6: "#f0d0b0", accent7: "#d97a3c", variants: [
      { name: "cherry", expr: "joy",   hue: "#d878a8", accent7: "#d97a3c" },
      { name: "berry",  expr: "glee",  hue: "#4a7ec2", accent7: "#e8c832" },
      { name: "clover", expr: "grump", hue: "#4f9e6b", accent7: "#2e3338" } ] },
    { key: "gallery", body: "pearl", accent6: "#d9a441", accent7: "#4a7ec2", variants: [
      { name: "pearl",        expr: "neutral", hue: "#e8c49a", bg: "#26211c" },
      { name: "pearl-glance", expr: "shifty",  hue: "#e8c49a", bg: "#26211c" },
      { name: "lisa",         expr: "joy",     hue: "#d9b98a", body: "lisa", accent6: "#5a4632", accent7: "#3a2b20", bg: "#6f7a4e" },
      { name: "howl",         expr: "shock",   hue: "#d9c8a8", body: "howl", accent6: "#37414f", accent7: PINK, bg: "#d97a3c" } ] }
  ];

  // ---- Color helpers -------------------------------------------------------
  function hexToRgb(h) {
    h = h.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function rgbToHex(r, g, b) {
    function c(v) { v = Math.max(0, Math.min(255, Math.round(v))); return v.toString(16).padStart(2, "0"); }
    return "#" + c(r) + c(g) + c(b);
  }
  function mix(hex, target, t) {
    var a = hexToRgb(hex), b = hexToRgb(target);
    return rgbToHex(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
  }
  var EYE = "#f0f8ff", OUTLINE = "#131d1d";
  function paletteFor(entry) {
    return {
      "1": entry.hue,
      "2": EYE,
      "3": mix(entry.hue, "#ffffff", 0.38),
      "4": mix(entry.hue, "#131d1d", 0.34),
      "5": OUTLINE,
      "6": entry.accent6,
      "7": entry.accent7
    };
  }

  // ---- Compose -------------------------------------------------------------
  function compose(body, exprName, view) {
    var iso = view === "iso";
    var expr = EXPRESSIONS[exprName];
    var rows = body.grid.map(function (r) { return r.split(""); });
    var gaze = iso ? (body.isoGaze != null ? body.isoGaze : 1) : 0;
    for (var r = 0; r < expr.length; r++) {
      for (var c = 0; c < expr[r].length; c++) {
        var ch = expr[r][c];
        if (ch === "_") continue;
        var y = body.faceY + r, x = body.faceX + gaze + c;
        if (y >= 0 && y < SIZE && x >= 0 && x < SIZE) rows[y][x] = ch;
      }
    }
    if (iso) {
      // shear: top half leans toward the right (rows 0-3 shift +1)
      for (var y2 = 0; y2 < SIZE / 2; y2++) {
        rows[y2].pop();
        rows[y2].unshift(".");
      }
      reshade(rows);
    }
    return rows.map(function (a) { return a.join(""); });
  }

  function reshade(g) {
    function solid(ch) { return ch !== "." && ch !== "5"; }
    for (var y = 0; y < SIZE; y++) for (var x = 0; x < SIZE; x++) {
      var ch = g[y][x];
      if (ch !== "1" && ch !== "3" && ch !== "4") continue;
      var up = y > 0 ? g[y - 1][x] : ".";
      var left = x > 0 ? g[y][x - 1] : ".";
      var right = x < SIZE - 1 ? g[y][x + 1] : ".";
      var down = y < SIZE - 1 ? g[y + 1][x] : ".";
      if (!solid(up) || !solid(left)) g[y][x] = "3";
      else if (!solid(down) || !solid(right)) g[y][x] = "4";
      else g[y][x] = "1";
    }
  }

  var ALL = { front: null, iso: null };
  function all(view) {
    view = view === "iso" ? "iso" : "front";
    if (ALL[view]) return ALL[view];
    var out = [];
    FAMILIES.forEach(function (fam) {
      var famKey = fam.key || fam.body;
      fam.variants.forEach(function (v, i) {
        var isObj = !Array.isArray(v);
        var expr = isObj ? v.expr : v[0];
        var hue = isObj ? v.hue : v[1];
        var name = isObj ? v.name : (i === 0 ? fam.body : fam.body + "-" + expr);
        var bodyName = (isObj && v.body) || fam.body;
        out.push({
          name: name, family: famKey, expr: expr, hue: hue,
          accent6: (isObj && v.accent6) || fam.accent6,
          accent7: (isObj && v.accent7) || fam.accent7,
          bg: (isObj && v.bg) || fam.bg || mix(hue, "#131d1d", 0.72),
          assignment: "animal", view: view,
          rows: compose(BODIES[bodyName], expr, view)
        });
      });
    });
    ALL[view] = out;
    return out;
  }

  // ---- Validation ----------------------------------------------------------
  function validate(view) {
    var errs = [], seen = {};
    all(view).forEach(function (e) {
      if (seen[e.name]) errs.push(e.name + ": duplicate name");
      seen[e.name] = 1;
      if (e.rows.length !== SIZE) errs.push(e.name + ": " + e.rows.length + " rows");
      e.rows.forEach(function (row, i) {
        if (row.length !== SIZE) errs.push(e.name + " row " + i + ": " + row.length + " chars");
        if (/[^.1234567]/.test(row)) errs.push(e.name + " row " + i + ": bad char");
      });
      var eyes = e.rows.join("").split("2").length - 1;
      if (eyes < 2) errs.push(e.name + ": only " + eyes + " eye px");
    });
    return errs;
  }

  // ---- Delivery format -----------------------------------------------------
  function deliveryBlock(e) {
    var used = e.rows.join("");
    var lines = ["name: " + e.name, 'hue: "' + e.hue + '"'];
    if (used.indexOf("6") >= 0) lines.push('accent6: "' + e.accent6 + '"');
    if (used.indexOf("7") >= 0) lines.push('accent7: "' + e.accent7 + '"');
    lines.push('bg: "' + e.bg + '"');
    lines.push("assignment: " + e.assignment, "grid:");
    return lines.join("\n") + "\n" + e.rows.join("\n");
  }
  function deliveryText(view) {
    var v = view === "iso" ? "iso" : "front";
    var head = "# Heimdall Sigil — 8×8 essentials-tier sprite delivery\n" +
      "# view: " + (v === "iso" ? "isometric 3/4, gazing up-right" : "straight-on") + "\n" +
      "# " + all(v).length + " sprites · " + FAMILIES.length + " families\n" +
      "# Alphabet: . bg | 1 body | 2 eye | 3 highlight | 4 shadow | 5 outline | 6 accent-A | 7 accent-B\n" +
      "# bg: per-sprite backdrop hex — render '.' as a top-left-lit diagonal gradient of this color (or ignore)\n\n";
    return head + all(v).map(deliveryBlock).join("\n\n") + "\n";
  }

  // ---- Render helper -------------------------------------------------------
  function toDataUrl(e, withBg) {
    var cv = document.createElement("canvas");
    cv.width = SIZE; cv.height = SIZE;
    var ctx = cv.getContext("2d");
    var pal = paletteFor(e);
    if (withBg && e.bg) {
      var light = mix(e.bg, "#ffffff", 0.12), dark = mix(e.bg, "#131d1d", 0.28);
      for (var by = 0; by < SIZE; by++) for (var bx = 0; bx < SIZE; bx++) {
        var d = bx + by, col;
        if (d < 4) col = light;
        else if (d < 5) col = (bx % 2 === d % 2) ? light : e.bg;
        else if (d < 10) col = e.bg;
        else if (d < 11) col = (bx % 2 === d % 2) ? e.bg : dark;
        else col = dark;
        ctx.fillStyle = col;
        ctx.fillRect(bx, by, 1, 1);
      }
    }
    for (var y = 0; y < SIZE; y++) for (var x = 0; x < SIZE; x++) {
      var ch = e.rows[y][x];
      if (ch === ".") continue;
      ctx.fillStyle = pal[ch] || "#ff00ff";
      ctx.fillRect(x, y, 1, 1);
    }
    return cv.toDataURL("image/png");
  }

  window.SIGIL8 = {
    EXPRESSIONS: EXPRESSIONS, BODIES: BODIES, FAMILIES: FAMILIES,
    familyNames: function () { return FAMILIES.map(function (f) { return f.key || f.body; }); },
    all: all, validate: validate, paletteFor: paletteFor,
    deliveryBlock: deliveryBlock, deliveryText: deliveryText, toDataUrl: toDataUrl
  };
})();
