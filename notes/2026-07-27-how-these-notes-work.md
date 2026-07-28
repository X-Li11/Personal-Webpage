---
title: "How these notes work"
date: 2026-07-27
tags: [setup]
---

Each note is its own Markdown file under `notes/`, so everything here also opens
in Obsidian, VS Code, or plain `cat`. The title, date, and tags at the top are
YAML front matter — the notes page reads and writes them, and other editors
leave them alone.

## Maths

Inline maths goes between single dollars: $e^{i\pi} + 1 = 0$, or $\nabla_x \log p(x)$
for a score function. Display maths goes between double dollars on its own line:

$$\mathcal{L}(\theta) = \mathbb{E}_{x \sim p_{\text{data}}}\left[ \| s_\theta(x) - \nabla_x \log p(x) \|^2 \right]$$

`\(...\)` and `\[...\]` work too. A literal dollar sign in prose is safe — "it cost
$5 and $10" stays as text — and anything inside `code spans` is left alone.

## Screenshots

Paste one straight into the editor. It uploads to `notes/images/` in the repo and
drops a `![](images/…)` link where your cursor was. Dragging a file in, or the
📎 button, does the same thing.

## Everything else

Normal Markdown: **bold**, *italic*, `code`, lists, > quotes, tables, and links.

| Thing | Where it lives |
|---|---|
| This note | `notes/2026-07-27-how-these-notes-work.md` |
| Images | `notes/images/` |
| Log book entries | `data/entries.json` |

Delete this note whenever you like — it's just a file.
