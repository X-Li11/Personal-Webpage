/* ============================================================
   Shared Markdown renderer for the log book and the notes page.
   Zero dependencies. Input is HTML-escaped before parsing, so no
   raw HTML from a note or entry can ever reach the DOM.

   MD.render(src)                -> html
   MD.renderMath(src)            -> { html, math: [{id, tex, display}] }
   MD.typeset(el, math)          -> runs KaTeX over the placeholders (if loaded)
   MD.renderInto(el, src, opts)  -> render + typeset in one call
   ============================================================ */
(function(global){
"use strict";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

function render(src){
  if (!src || !src.trim()) return "";
  const lines = esc(src).replace(/\r\n?/g, "\n").split("\n");
  const [html] = parseBlocks(lines, 0, lines.length);
  return html;
}

/* Allow relative paths and plain http(s)/mailto links; block anything with
   another scheme, which is what stops javascript: and data: URLs. */
const SAFE_URL = (url) => {
  const scheme = /^([a-z][a-z0-9+.\-]*):/i.exec(url || "");
  return !scheme || /^(https?|mailto)$/i.test(scheme[1]);
};

function mdInline(s){
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => "\u0000" + (codes.push(c) - 1) + "\u0000");
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, url) =>
        SAFE_URL(url) ? `<img src="${url}" alt="${alt}" style="max-width:100%;border-radius:8px">` : m);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, txt, url) =>
        SAFE_URL(url) ? `<a href="${url}" target="_blank" rel="noopener">${txt}</a>` : m);
  s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
  s = s.replace(/\*\*\*(\S(?:.*?\S)?)\*\*\*/g, "<strong><em>$1</em></strong>");
  s = s.replace(/\*\*(\S(?:.*?\S)?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__(\S(?:.*?\S)?)__/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^\w*])\*(\S(?:.*?\S)?)\*(?!\w)/g, "$1<em>$2</em>");
  s = s.replace(/(^|[^\w_])_(\S(?:.*?\S)?)_(?!\w)/g, "$1<em>$2</em>");
  s = s.replace(/~~(\S(?:.*?\S)?)~~/g, "<del>$1</del>");
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
}

const RE_UL   = /^(\s*)[-*+]\s+(.*)$/;
const RE_OL   = /^(\s*)\d+[.)]\s+(.*)$/;
const RE_QUOTE= /^\s*&gt;\s?(.*)$/;
const RE_HEAD = /^(#{1,6})\s+(.*)$/;
const RE_HR   = /^\s*(?:---+|\*\*\*+|___+)\s*$/;
const isBlockStart = (l) =>
  RE_UL.test(l) || RE_OL.test(l) || RE_QUOTE.test(l) || RE_HEAD.test(l) ||
  RE_HR.test(l) || /^\s*```/.test(l) || /^\s*$/.test(l);

function parseBlocks(lines, i, end){
  const out = [];
  while (i < end){
    const L = lines[i];

    if (/^\s*$/.test(L)) { i++; continue; }

    if (/^\s*```/.test(L)){
      const buf = []; i++;
      while (i < end && !/^\s*```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre><code>${buf.join("\n")}</code></pre>`);
      continue;
    }

    if (RE_HR.test(L)){ out.push("<hr>"); i++; continue; }

    const h = L.match(RE_HEAD);
    if (h){ out.push(`<h${Math.min(h[1].length,3)}>${mdInline(h[2])}</h${Math.min(h[1].length,3)}>`); i++; continue; }

    if (RE_QUOTE.test(L)){
      const buf = [];
      while (i < end && RE_QUOTE.test(lines[i])) buf.push(lines[i++].match(RE_QUOTE)[1]);
      const [inner] = parseBlocks(buf, 0, buf.length);
      out.push(`<blockquote>${inner}</blockquote>`);
      continue;
    }

    // pipe table: header row followed by a |---|---| separator
    if (L.includes("|") && i + 1 < end && /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(lines[i+1]) && lines[i+1].includes("-")){
      const cells = (r) => r.replace(/^\s*\|/,"").replace(/\|\s*$/,"").split("|").map(c => mdInline(c.trim()));
      const head = cells(lines[i]); i += 2;
      const rows = [];
      while (i < end && lines[i].includes("|") && !/^\s*$/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(`<table><thead><tr>${head.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>` +
        rows.map(r => `<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("") + `</tbody></table>`);
      continue;
    }

    if (RE_UL.test(L) || RE_OL.test(L)){
      const [html, next] = parseList(lines, i, end);
      out.push(html); i = next; continue;
    }

    const buf = [];
    while (i < end && !isBlockStart(lines[i])) buf.push(lines[i++]);
    out.push(`<p>${mdInline(buf.join("\n")).replace(/\n/g, "<br>")}</p>`);
  }
  return [out.join("\n"), i];
}

function parseList(lines, i, end){
  const first = lines[i].match(RE_UL) || lines[i].match(RE_OL);
  const ordered = !RE_UL.test(lines[i]);
  const base = first[1].length;
  const items = [];
  while (i < end){
    const m = lines[i].match(RE_UL) || lines[i].match(RE_OL);
    if (!m) break;
    const indent = m[1].length;
    if (indent < base) break;
    if (indent > base){
      const [sub, next] = parseList(lines, i, end);
      if (items.length) items[items.length-1] += sub; else items.push(sub);
      i = next; continue;
    }
    if ((RE_UL.test(lines[i]) ? false : true) !== ordered) break;
    items.push(mdInline(m[2]));
    i++;
  }
  const tag = ordered ? "ol" : "ul";
  return [`<${tag}>${items.map(t => `<li>${t}</li>`).join("")}</${tag}>`, i];
}

/* ---------------- LaTeX ----------------
   Math is pulled out of the source *before* Markdown parsing, so that
   underscores and asterisks inside formulas are never mistaken for
   emphasis. Fenced and inline code are protected first, so a literal
   $ in a code sample is left alone.

   Recognised: $$...$$ and \[...\] (display), $...$ and \(...\) (inline).
   An inline $ needs non-space immediately inside both delimiters, so
   prices like "$5 and $10" are not treated as math.                    */

const CODE_SENTINEL = "\u0002";
const MATH_SENTINEL = "\u0001";

function renderMath(src){
  if (!src) return { html: "", math: [] };

  // 1. protect code so $ inside it is never read as math
  const code = [];
  let s = String(src)
    .replace(/```[\s\S]*?```/g, m => CODE_SENTINEL + (code.push(m) - 1) + CODE_SENTINEL)
    .replace(/`[^`\n]+`/g,       m => CODE_SENTINEL + (code.push(m) - 1) + CODE_SENTINEL);

  // 2. pull out the maths
  const math = [];
  const take = (tex, display) => {
    const id = math.length;
    math.push({ id, tex: tex.trim(), display });
    return MATH_SENTINEL + id + MATH_SENTINEL;
  };
  s = s
    .replace(/\$\$([\s\S]+?)\$\$/g,      (_, t) => take(t, true))
    .replace(/\\\[([\s\S]+?)\\\]/g,      (_, t) => take(t, true))
    .replace(/\\\(([\s\S]+?)\\\)/g,      (_, t) => take(t, false))
    .replace(/\$(?!\s)([^$\n]*[^$\s])\$(?!\d)/g, (_, t) => take(t, false));

  // 3. put code back, then run the Markdown parser
  s = s.replace(new RegExp(CODE_SENTINEL + "(\\d+)" + CODE_SENTINEL, "g"), (_, i) => code[+i]);
  let html = render(s);

  // 4. swap sentinels for elements KaTeX can fill in
  html = html.replace(new RegExp(MATH_SENTINEL + "(\\d+)" + MATH_SENTINEL, "g"), (_, i) => {
    const m = math[+i];
    // a span, not a div: display maths often lands inside a <p>, and a block
    // element there would close the paragraph early
    return m.display
      ? `<span class="math-block" data-math="${m.id}"></span>`
      : `<span class="math-inline" data-math="${m.id}"></span>`;
  });
  return { html, math };
}

function typeset(root, math){
  if (!root || !math || !math.length) return;
  const byId = new Map(math.map(m => [String(m.id), m]));
  for (const el of root.querySelectorAll("[data-math]")){
    const m = byId.get(el.dataset.math); if (!m) continue;
    if (global.katex){
      try {
        global.katex.render(m.tex, el, { displayMode: m.display, throwOnError: false, errorColor: "#b4632a" });
        continue;
      } catch { /* fall through to plain text */ }
    }
    el.textContent = m.display ? m.tex : "$" + m.tex + "$";   // KaTeX absent or broken
    el.classList.add("math-raw");
  }
}

function renderInto(el, src, opts){
  const { html, math } = renderMath(src);
  el.innerHTML = html || (opts && opts.placeholder ? opts.placeholder : "");
  if (opts && opts.imgPrefix)
    for (const img of el.querySelectorAll("img"))
      if (!/^([a-z]+:|\/)/i.test(img.getAttribute("src") || ""))
        img.setAttribute("src", opts.imgPrefix + img.getAttribute("src"));
  typeset(el, math);
  return !!html;
}

global.MD = { render, renderMath, typeset, renderInto, esc };

})(window);
