# Personal site + log book

A static personal website with a GitHub-backed log book. No build step, no
framework, no server — three files and a JSON data file.

```
index.html          your homepage
logbook.html        the log book app
assets/style.css    shared styling (light + dark)
data/entries.json   your entries live here, committed to the repo
```

## 1. Put it on GitHub

Create a repo. If you name it **`<your-username>.github.io`** the site lives at
`https://<your-username>.github.io`. Any other name works too — it'll be at
`https://<your-username>.github.io/<repo>`.

```bash
git init
git add .
git commit -m "personal site + log book"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then: repo **Settings → Pages → Source: Deploy from a branch → main / (root)**.
Give it a minute and your site is live.

## 2. Make a token so the page can save

The log book reads `data/entries.json` from your repo and writes it back through
the GitHub API. That write needs a token.

1. GitHub → **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**
2. **Repository access:** Only select repositories → pick this repo
3. **Permissions:** Repository permissions → **Contents: Read and write**
   (that's the only one needed)
4. Set an expiry you're comfortable with, generate, and copy the token

Now open your log book, click the **⚙** in the sidebar, and fill in:

| Field | Value |
|---|---|
| Owner | your GitHub username |
| Repository | the repo name |
| Branch | `main` |
| Data file path | `data/entries.json` |
| Token | the `github_pat_…` you just copied |

**Save & connect.** The status line should read *Synced with GitHub*.

### About the token

It's stored in your browser's local storage on that device only, and is sent
only to `api.github.com`. It is **not** in the repo and not visible to visitors
— but anyone using that browser profile could read it, so scope it to this one
repo and nothing else. Use **Forget token** in settings to clear it. If you ever
paste it somewhere public, revoke it on GitHub and generate a new one.

Note: your entries are stored in a public repo if the repo is public. Keep
anything private out of it, or make the repo private (Pages on a private repo
needs a paid plan).

## 3. Using it

| Action | How |
|---|---|
| New entry | **+ New entry**, or the button on the empty state |
| Add a checklist item | **+ Item**, or press **Enter** on an existing item |
| Delete a checklist item | **✕** on hover, or **Backspace** in an empty item |
| Tags | comma-separated at the bottom; click a chip in the sidebar to filter |
| Search | the search box, or **⌘K** |
| Save | **Save to GitHub**, or **⌘S** |
| Backup | **Export JSON** / **Import** |

### To Do List

Pinned above the entry list is a **To Do List** — every unchecked checklist item
from every entry, gathered in one place. It isn't a real entry; it's a live view,
so there's nothing to write in it and nothing to keep in sync.

- **Reorder by priority** — drag the ⠿ handle, or focus it and use ↑/↓. Top is
  highest priority. The order is saved in `data/entries.json` as `todoOrder`.
- **Tick an item** and it's marked done on its source entry and drops off the list.
- **Click the grey source line** under an item to jump to the entry it came from.
- New items appear at the bottom until you give them a position. Empty items are
  ignored until you type something.

### Markdown

Entry bodies are Markdown. The notes area shows the rendered version by default —
click anywhere in it (or hit **Edit**) to get the raw text back, **Escape** or
**Preview** to render again. New empty entries open straight into edit mode.

Supported: `#`/`##`/`###` headings, `**bold**`, `*italic*`, `~~strikethrough~~`,
`` `inline code` ``, fenced ``` blocks, bulleted and numbered lists (one level of
nesting), `> blockquotes`, `---` rules, `[links](url)`, bare URLs, images, and
pipe tables. The renderer is ~90 lines of JS in `logbook.html` — no library, no
CDN. It escapes all HTML before parsing and only allows `http(s)`, `mailto`,
anchor, and relative links, so pasting something odd into an entry can't execute
anything.

Edits are held in your browser until you hit save, so unsaved work survives a
refresh or a closed tab — the status line turns amber whenever there's something
unpushed. Each save is one commit, so your whole log book has version history.

Visitors without a token can still read the log book; they just can't save.

## Notes (`notes.html`)

Separate from the log book: longer-form notes, one Markdown file each.

```
notes/2026-07-27-some-title.md   one file per note, YAML front matter on top
notes/images/                    pasted screenshots
assets/md.js                     shared Markdown + LaTeX renderer
assets/katex/                    vendored KaTeX (see below)
```

Because each note is a real `.md` file, the same notes open in Obsidian, VS Code,
or anything else. Front matter carries the metadata:

```markdown
---
title: "Vector calculus"
date: 2026-07-20
tags: [math, reading]
---
```

- **LaTeX** — `$inline$` and `$$display$$`, plus `\(...\)` and `\[...\]`.
  Rendered with KaTeX. A literal `$5` in prose is left alone, and `$` inside code
  spans or fences is never treated as maths.
- **Images** — paste or drag a screenshot into the editor, or use 📎. It's
  uploaded to `notes/images/` and a `![](images/…)` link is inserted. Links are
  relative to the note, so they render correctly both on the site and in GitHub's
  own Markdown view.
- **Saving** — edits are held locally (an amber dot marks unsaved notes) until you
  hit **Save to GitHub** or ⌘S. Each note is its own commit.
- **Editing elsewhere** — the page compares each file's git sha against its cache,
  so a note you changed in Obsidian is picked up on the next load automatically.
- The GitHub settings are shared with the log book: set the token on either page
  and both are connected.

### KaTeX

The maths renderer is vendored into `assets/katex/` rather than loaded from a CDN,
so the site works offline and has no third-party dependency. To fetch it:

```bash
mkdir -p assets/katex
curl -sL https://registry.npmjs.org/katex/-/katex-0.16.11.tgz \
  | tar xz --strip-components=2 -C assets/katex \
    package/dist/katex.min.js package/dist/katex.min.css package/dist/fonts
rm -f assets/katex/fonts/*.ttf assets/katex/fonts/*.woff   # woff2 is enough
```

About 600 KB. If `assets/katex/` is missing, formulas fall back to readable raw
LaTeX rather than breaking the page.

## Customising

- **Homepage text and links** — edit `index.html` directly; the cards under
  "Daily" and "Elsewhere" are plain `<a class="card">` blocks.
- **Colours** — every colour is a CSS variable at the top of `assets/style.css`,
  with a dark-mode block right below it.
- **Your name** — search for "Xiangchen Li" in both HTML files.

## Working on it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening the files with `file://` mostly works, but the browser blocks the
`data/entries.json` fetch, so use the local server.
