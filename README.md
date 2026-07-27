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

If the site 404s and the Actions tab shows no `pages-build-deployment` run, the
build never queued. Check that your account email is verified, that Actions are
enabled for the repo, and re-register the source (set Source to None, Save, then
back to the branch and Save).

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

### Markdown

Entry bodies are Markdown. The notes area shows the rendered version by default —
click anywhere in it (or hit **Edit**) to get the raw text back, **Escape** or
**Preview** to render again. New empty entries open straight into edit mode.

Supported: `#`/`##`/`###` headings, `**bold**`, `*italic*`, `~~strikethrough~~`,
`` `inline code` ``, fenced code blocks, bulleted and numbered lists (one level
of nesting), `> blockquotes`, `---` rules, `[links](url)`, bare URLs, images, and
pipe tables. The renderer is ~90 lines of JS in `logbook.html` — no library, no
CDN. It escapes all HTML before parsing and only allows `http(s)`, `mailto`,
anchor, and relative links, so pasting something odd into an entry can't execute
anything.

Edits are held in your browser until you hit save, so unsaved work survives a
refresh or a closed tab — the status line turns amber whenever there's something
unpushed. Each save is one commit, so your whole log book has version history.

Visitors without a token can still read the log book; they just can't save.

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
