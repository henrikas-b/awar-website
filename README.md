# AWAR—Evolved Adaptations to War in Humans

A single-page website presenting findings from cognitive psychology research on
human adaptations for navigating coalitional aggression. Across more than 30
studies (~12,000 participants), the work finds evidence that human minds are
equipped with specialized mechanisms for **detecting, enumerating, and
assessing coalitional threats**—consistent with the hypothesis that
small-scale war was a recurrent feature of human evolution.

**🔗 Live site:** https://henrikas-b.github.io/awar-website/

**📄 Read the paper:** [Open Research Europe, 2026](https://doi.org/10.12688/openreseurope.21936.1)

Bartusevičius, Aminihajibashi, Goetz, Skoog & Hagen · Peace Research Institute Oslo

## About

The site is a static, dependency-free presentation built with plain HTML, CSS,
and JavaScript. It walks through the research question, theoretical background,
experimental paradigms, key findings, and broader implications.

## Structure

| File         | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `index.html` | Page content and structure                       |
| `styles.css` | Styling, layout, and animations                  |
| `main.js`    | Scroll effects, reveal animations, interactivity |

## Running locally

No build step is required—just serve the folder over HTTP:

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Deployment

The site is published with GitHub Pages from the `main` branch (root).
Any push to `main` is automatically deployed.
