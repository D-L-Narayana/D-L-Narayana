const fs = require("fs");
const path = require("path");

const LOGIN = process.env.LOGIN || "D-L-Narayana";
const LV = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const PAL = {
  dark: { bg: "#0d1117", levels: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"], snake: ["#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed"] },
  light: { bg: "none", levels: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"], snake: ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"] },
};

function mockGrid() {
  let s = 3;
  const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const weeks = [];
  for (let w = 0; w < 53; w++) {
    const a = [];
    for (let d = 0; d < 7; d++) {
      if ((w === 0 && d < 3) || (w === 52 && d > 3)) a.push(null);
      else a.push(r() < 0.45 ? 1 + Math.floor(r() * 4) : 0);
    }
    weeks.push(a);
  }
  return weeks;
}

async function fetchGrid() {
  const q = `query($l:String!){user(login:$l){contributionsCollection{contributionCalendar{weeks{contributionDays{weekday contributionLevel}}}}}}`;
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json", "User-Agent": "snake-gen" },
    body: JSON.stringify({ query: q, variables: { l: LOGIN } }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data.user.contributionsCollection.contributionCalendar.weeks.map((w) => {
    const a = [null, null, null, null, null, null, null];
    for (const d of w.contributionDays) a[d.weekday] = LV[d.contributionLevel] ?? 0;
    return a;
  });
}

function build(grid) {
  const W = grid.length, LEN = 4;
  const key = (w, d) => w * 7 + d;
  const ok = (w, d) => w >= 0 && w < W && d >= 0 && d < 7 && grid[w][d] !== null;
  const targets = new Set();
  let start = null;
  for (let w = 0; w < W; w++) for (let d = 0; d < 7; d++) {
    if (grid[w][d] === null) continue;
    if (start === null) start = key(w, d);
    if (grid[w][d] > 0) targets.add(key(w, d));
  }
  const nb = (k) => {
    const w = Math.floor(k / 7), d = k % 7, out = [];
    for (const [dw, dd] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) if (ok(w + dw, d + dd)) out.push(key(w + dw, d + dd));
    return out;
  };
  const bfs = (from, goal, blocked) => {
    const prev = new Map([[from, -1]]);
    const q = [from];
    while (q.length) {
      const c = q.shift();
      if (c === goal) break;
      for (const n of nb(c)) if (!prev.has(n) && !blocked.has(n)) { prev.set(n, c); q.push(n); }
    }
    if (!prev.has(goal)) return null;
    const seg = [];
    for (let c = goal; c !== from; c = prev.get(c)) seg.push(c);
    return seg.reverse();
  };
  const dist = (a, b) => Math.abs(Math.floor(a / 7) - Math.floor(b / 7)) + Math.abs((a % 7) - (b % 7));
  let head = start;
  const body = Array(LEN).fill(head);
  const pathArr = [head];
  const eaten = new Map();
  if (targets.has(head)) { targets.delete(head); eaten.set(head, 0); }
  while (targets.size) {
    let goal = null, best = 1e9;
    for (const t of targets) { const d = dist(head, t); if (d < best) { best = d; goal = t; } }
    const seg = bfs(head, goal, new Set(body.slice(0, LEN - 1))) || bfs(head, goal, new Set());
    for (const c of seg) {
      pathArr.push(c); body.unshift(c); body.pop(); head = c;
      if (targets.has(c)) { targets.delete(c); eaten.set(c, pathArr.length - 1); }
    }
  }
  for (let i = 0; i < 14; i++) pathArr.push(head);
  return { path: pathArr, eaten };
}

function render(grid, path, eaten, pal) {
  const C = 12, G = 4, P = C + G, M = 8, W = grid.length, LEN = 4;
  const width = M * 2 + W * P - G, height = M * 2 + 7 * P - G;
  const steps = path.length;
  const T = Math.min(Math.max(steps * 0.07, 15), 80).toFixed(1);
  const X = (k) => M + Math.floor(k / 7) * P, Y = (k) => M + (k % 7) * P;
  let cells = "";
  for (let w = 0; w < W; w++) for (let d = 0; d < 7; d++) {
    const v = grid[w][d];
    if (v === null) continue;
    const k = w * 7 + d, col = pal.levels[v], x = M + w * P, y = M + d * P;
    if (eaten.has(k)) {
      const t = Math.max(0.001, eaten.get(k) / (steps - 1)).toFixed(4);
      cells += `<rect x="${x}" y="${y}" width="${C}" height="${C}" rx="2" fill="${col}"><animate attributeName="fill" values="${col};${pal.levels[0]};${pal.levels[0]}" keyTimes="0;${t};1" calcMode="discrete" dur="${T}s" repeatCount="indefinite"/></rect>`;
    } else cells += `<rect x="${x}" y="${y}" width="${C}" height="${C}" rx="2" fill="${col}"/>`;
  }
  let snake = "";
  for (let i = LEN - 1; i >= 0; i--) {
    const xs = path.map((_, t) => X(path[Math.max(t - i, 0)])).join(";");
    const ys = path.map((_, t) => Y(path[Math.max(t - i, 0)])).join(";");
    snake += `<rect width="${C}" height="${C}" rx="3" fill="${pal.snake[i]}"><animate attributeName="x" values="${xs}" dur="${T}s" repeatCount="indefinite"/><animate attributeName="y" values="${ys}" dur="${T}s" repeatCount="indefinite"/></rect>`;
  }
  const bg = pal.bg === "none" ? "" : `<rect width="${width}" height="${height}" rx="6" fill="${pal.bg}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><!-- snake-gen ${steps} steps -->${bg}${cells}${snake}</svg>`;
}

async function main() {
  const grid = process.env.MOCK ? mockGrid() : await fetchGrid();
  const { path: p, eaten } = build(grid);
  const out = path.join(__dirname, "dist");
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, "snake-dark.svg"), render(grid, p, eaten, PAL.dark));
  fs.writeFileSync(path.join(out, "snake.svg"), render(grid, p, eaten, PAL.light));
  console.log(`snake: ${grid.length} weeks, ${eaten.size} green cells eaten in ${p.length} steps`);
}

module.exports = { mockGrid, build, render, PAL };
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
