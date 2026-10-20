# LiftPath Consulting Website (`liftpathconsulting.com`)

Static website for **LiftPath Consulting** (Joe Young, Denver, CO).

## Project Structure

- `index.html` — Main landing page (What I Do, Projects, How I Work, About, Contact)
- `styles.css` — Warm Linen & Engineer Dark Mode responsive stylesheet
- `script.js` — Theme switcher, mobile navigation, scroll reveal, and FormSubmit contact handler
- `CNAME` — Custom domain configuration (`liftpathconsulting.com`) for GitHub Pages
- `assets/icons/` — App icons for the Home Assistant add-on cards

---

## How to Add a Project Card

Open `index.html` and locate `<div class="case-grid">` inside `#work`. Copy and paste an `<article class="case-card fade-in">` block:

```html
<article class="case-card fade-in">
  <div class="app-card-header">
    <img src="assets/icons/your_icon.png" alt="Project Name Icon" class="app-icon" loading="lazy" />
    <div class="app-meta">
      <span class="case-category">Category</span>
      <span class="case-code">Tech Stack</span>
    </div>
  </div>
  <h3 class="case-title">Project Name</h3>
  <p class="case-summary">
    One-paragraph description of what the project does and how it is built.
  </p>
</article>
```

---

## Deploying to GitHub Pages (`j0eyoung/liftpath-website`)

1. Commit and push changes to the `main` branch of `https://github.com/j0eyoung/liftpath-website`.
2. In Squarespace DNS for `liftpathconsulting.com`:
   - **Never modify or delete** your `home` `CNAME` record (Home Assistant remote access).
   - Point `@` (`A` records) to GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Point `www` (`CNAME` record) to `j0eyoung.github.io`.
