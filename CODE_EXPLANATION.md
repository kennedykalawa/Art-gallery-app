# Art Gallery App Code Explanation

This document explains the purpose of each file and the major pieces of code inside it.

## Project Overview

This is a small static web app for an art gallery. It uses:

- `HTML` for page structure
- `CSS` for layout, styling, responsiveness, and animation
- `JavaScript` for injecting artwork data into the pages and handling filtering/detail rendering

There is no backend. The app is driven entirely by static files and a JavaScript data array.

## File Structure

- `index.html`
- `gallery.html`
- `detail.html`
- `about.html`
- `css/styles.css`
- `js/app.js`
- `js/data.js`

---

## `index.html`

This is the landing page.

### Head section

- `<!DOCTYPE html>` tells the browser to use modern HTML.
- `<html lang="en">` declares the page language as English.
- `<meta charset="UTF-8">` allows standard text encoding.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` makes the layout responsive on phones and tablets.
- `<title>` sets the browser tab title.
- The two Google Fonts `<link>` tags load `Montserrat` and `Playfair Display`.
- `<link rel="stylesheet" href="css/styles.css">` loads the shared stylesheet.

### Navigation

```html
<nav>
    <div class="container">
        <a href="index.html" class="logo">VANGUARD</a>
        <ul class="nav-links">
            <li><a href="index.html" class="active">Home</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="about.html">About</a></li>
        </ul>
    </div>
</nav>
```

- `nav` is the sticky top navigation bar.
- `.container` limits the content width and centers it.
- `.logo` is the site brand link.
- `.nav-links` is the horizontal menu.
- `class="active"` marks the current page so CSS can highlight it.

### Hero section

```html
<header class="hero">
```

This is the large first section of the homepage.

#### `.hero-layout`

This splits the hero into two columns:

- left side: main headline and intro text
- right side: a supporting content card

#### `.hero-copy`

Contains:

- `.eyebrow`: a small uppercase label above the heading
- `h1`: the main brand statement
- `p`: supporting paragraph

#### `.hero-note`

This is the side card in the hero:

- `.hero-note-label`: small label text
- `p`: short supporting message
- `.hero-link`: CTA link to the gallery page

### Featured section intro

```html
<section class="section-intro">
```

This adds a heading block above the artwork grid instead of dropping users directly into cards.

Contains:

- `.section-kicker`: small section label
- `h2`: section title
- `p`: description
- `.section-count`: small count label on the right

### Featured grid

```html
<section class="masonry-grid" id="featured-grid">
```

- `id="featured-grid"` is important because JavaScript looks for this element and inserts artwork cards into it.
- The comment inside is only a note for developers. It is replaced by JS at runtime.

### Footer

- Shows copyright text
- `.dev-tag` is a secondary line with the developer credit

### Script

```html
<script type="module" src="js/app.js"></script>
```

- `type="module"` allows `app.js` to use `import`.

---

## `gallery.html`

This page displays all artwork items and lets the user filter them by category.

### Shared structure

The `<head>`, nav, footer, font imports, and stylesheet link work the same way as in `index.html`.

### Page header

```html
<header class="page-header collection-header container">
```

This creates a centered page intro.

- `.page-header` gives shared header spacing and text styling
- `.collection-header` gives this version a slightly different bottom spacing
- `.container` keeps the width aligned with the rest of the site

Inside it:

- `.section-kicker`: small label
- `h1`: page title
- `p`: supporting description

### Filter controls

```html
<div class="filters">
    <button class="filter-btn active" data-category="all">All</button>
    <button class="filter-btn" data-category="oil">Oil</button>
    <button class="filter-btn" data-category="abstract">Abstract</button>
    <button class="filter-btn" data-category="photography">Photography</button>
    <button class="filter-btn" data-category="watercolor">Watercolor</button>
</div>
```

- `.filters` is the wrapper for all filter buttons.
- `.filter-btn` is the shared style for each button.
- `data-category` stores the category value used by JavaScript.
- `active` marks the currently selected filter.

### Gallery grid

```html
<section class="masonry-grid" id="gallery-grid">
```

- `id="gallery-grid"` is the target where JS inserts all artwork cards.

### Script

Uses the same shared `js/app.js` file.

---

## `detail.html`

This page shows one specific artwork.

### Key structure

```html
<main class="container" id="detail-view">
```

- `id="detail-view"` is the placeholder JS uses to inject the selected artwork.
- The selected artwork is determined from the `id` query parameter in the URL, for example:
  - `detail.html?id=2`

### Why this page is mostly empty in HTML

The artwork content is not hardcoded into the HTML because the same template is reused for every artwork. JavaScript finds the matching artwork in `data.js` and builds the detail layout dynamically.

---

## `about.html`

This page explains the gallery brand.

### Main layout

```html
<main class="container">
    <section class="about-shell">
        <div class="about-content">
```

- `.about-shell` provides outer spacing around the section.
- `.about-content` creates the styled content panel.

### Content inside

- `.section-kicker`: small intro label
- `h1`: page title
- `.mission-statement`: highlighted quotation-like line
- `p` elements: regular descriptive copy

This page is static, so unlike the gallery and detail pages, JavaScript does not inject any content here.

---

## `js/data.js`

This file is the data source for the gallery.

### Main structure

```js
const artworks = [
```

This declares an array named `artworks`.

Each item in the array is an object with:

- `id`: unique number used to identify the artwork
- `title`: artwork name
- `artist`: artist name
- `year`: year of the work
- `category`: category used for filtering
- `image`: artwork image URL
- `description`: text used on the detail page

### Example object

```js
{
    id: 1,
    title: "The Ethereal Gaze",
    artist: "Elena Vance",
    year: 2023,
    category: "oil",
    image: "...",
    description: "..."
}
```

How it is used:

- `id` links a gallery card to its detail page
- `category` powers filtering
- `image` is displayed in both list and detail views
- `description` appears only in the detail page

### Export

```js
export default artworks;
```

This makes the array available to `app.js` through ES module import syntax.

---

## `js/app.js`

This file contains all app behavior.

### Import

```js
import artworks from './data.js';
```

- Imports the array from `data.js`.

### DOM ready wrapper

```js
document.addEventListener('DOMContentLoaded', () => {
```

This waits until the HTML has loaded before trying to access page elements. Without this, the script could run before the DOM exists.

### DOM element lookup

```js
const featuredGrid = document.getElementById('featured-grid');
const galleryGrid = document.getElementById('gallery-grid');
const detailContainer = document.getElementById('detail-view');
```

These lines check which page is currently open:

- homepage has `featured-grid`
- gallery page has `gallery-grid`
- detail page has `detail-view`

Only the matching section will be used on a given page.

### `createArtCard`

```js
const createArtCard = (art) => {
    return `
        <a href="detail.html?id=${art.id}" class="art-card">
            <img src="${art.image}" alt="${art.title}" loading="lazy">
            <div class="art-info">
                <h3>${art.title}</h3>
                <p>${art.artist}, ${art.year}</p>
            </div>
        </a>
    `;
};
```

This is a helper function that converts one artwork object into an HTML card string.

Important parts:

- `href="detail.html?id=${art.id}"` links the card to the detail page for that item
- `${...}` inserts dynamic values into the template string
- `loading="lazy"` delays image loading until needed, which improves performance
- `.art-info` is the overlay shown on hover

### Homepage rendering

```js
if (featuredGrid) {
    featuredGrid.innerHTML = artworks.slice(0, 3).map(createArtCard).join('');
}
```

What this does:

- `if (featuredGrid)` means this only runs on the homepage
- `artworks.slice(0, 3)` takes the first 3 artworks
- `.map(createArtCard)` converts each artwork into an HTML string
- `.join('')` merges the array of strings into one string
- `innerHTML` injects the cards into the page

### Gallery rendering

```js
if (galleryGrid) {
```

This block only runs on the gallery page.

#### `renderGallery`

```js
const renderGallery = (filteredArt) => {
    galleryGrid.innerHTML = filteredArt.map(createArtCard).join('');
};
```

This function renders whichever array is passed in.

Why it exists:

- avoids repeating the same rendering code
- can render all items or filtered items

#### Initial full render

```js
renderGallery(artworks);
```

Shows all artworks when the page first loads.

#### Filter buttons

```js
const filterBtns = document.querySelectorAll('.filter-btn');
```

- Selects all filter buttons on the page.

```js
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
```

- Attaches a click handler to each button.

Inside the click handler:

```js
const category = btn.dataset.category;
```

- Reads the `data-category` value from the clicked button.

```js
filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');
```

- Removes active styling from all buttons
- Adds active styling to the clicked one

```js
if (category === 'all') {
    renderGallery(artworks);
} else {
    const filtered = artworks.filter(a => a.category === category);
    renderGallery(filtered);
}
```

How this works:

- If category is `all`, render the full list.
- Otherwise use `.filter(...)` to keep only artworks matching the selected category.
- Then render the filtered result.

### Detail page rendering

```js
if (detailContainer) {
```

This block only runs on the detail page.

#### Read the URL parameter

```js
const urlParams = new URLSearchParams(window.location.search);
const artId = parseInt(urlParams.get('id'));
```

- `window.location.search` gets the query string from the URL
- `URLSearchParams` helps read query parameters cleanly
- `.get('id')` gets the artwork id from the URL
- `parseInt(...)` converts the string into a number

#### Find the matching artwork

```js
const art = artworks.find(a => a.id === artId);
```

- Searches the array and returns the first artwork whose `id` matches the URL value.

#### Render the detail template

If an artwork exists:

```js
detailContainer.innerHTML = `
    <div class="detail-container">
```

This creates:

- `.detail-container`: main two-column layout
- `.detail-image`: image wrapper
- `.detail-content`: text column
- `.detail-meta`: grouped metadata
- `.back-btn`: return link to the gallery

This section:

```js
<span>Artist<br>${art.artist}</span>
<span>Year<br>${art.year}</span>
<span>Medium<br>${art.category.charAt(0).toUpperCase() + art.category.slice(1)}</span>
```

does three things:

- prints metadata labels and values
- uses `<br>` to put the value on a new line
- converts category text like `oil` into `Oil`

That last transformation works like this:

- `art.category.charAt(0)` gets the first letter
- `.toUpperCase()` capitalizes it
- `art.category.slice(1)` gets the rest of the word
- concatenating them produces a title-cased label

#### Update the browser tab title

```js
document.title = `${art.title} | Vanguard Gallery`;
```

- Makes the browser title match the selected artwork.

#### Fallback case

```js
detailContainer.innerHTML = `<p>Artwork not found. <a href="gallery.html">Return to Gallery</a></p>`;
```

- This appears if the URL contains an invalid or missing id.

---

## `css/styles.css`

This file controls the app's visual design.

Because it is large, it is best understood by section.

### `:root`

```css
:root {
    --bg-color: #120f0b;
    ...
}
```

This defines CSS custom properties, also called CSS variables.

Why this is useful:

- centralizes the color system
- centralizes spacing values
- centralizes font names
- makes redesigns easier because many styles can be changed in one place

Important variables:

- `--bg-color`, `--bg-secondary`: background tones
- `--surface-color`, `--surface-strong`: panel/surface colors
- `--text-color`, `--text-muted`: primary and softer text colors
- `--accent-color`, `--accent-light`, `--accent-dark`: brand accent colors
- `--border-color`, `--border-light`: border shades
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`: shadow presets
- `--font-heading`, `--font-body`: typography pairing
- `--spacing-*`: reusable spacing tokens
- `--container-width`: max content width

### Global reset

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

This removes browser default spacing and makes sizing more predictable.

### `body`

Sets:

- the app background color and layered gradients
- default text color
- default body font
- line height
- `overflow-x: hidden` to avoid accidental horizontal scroll
- `min-height: 100vh` so the page fills the screen height

### Headings and links

```css
h1, h2, h3, h4
```

- Applies the heading font to major headings.

```css
a
a:hover
```

- Removes default underlines
- keeps links inheriting surrounding color
- adds a hover fade effect

### `.container`

```css
.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}
```

This is a reusable layout wrapper:

- limits content width
- centers it
- adds horizontal padding

### Navigation styles

#### `nav`

Makes the top bar:

- sticky
- slightly transparent
- blurred
- visually separated with border and shadow

#### `nav .container`

Uses flexbox to place logo on the left and nav links on the right.

#### `.logo`

Applies the gallery brand style:

- heading font
- uppercase
- wide letter spacing

#### `.nav-links`

- horizontal flex row
- uppercase small text
- spaced items

#### `.nav-links a::after`

This is the underline animation.

How it works:

- `::after` creates a pseudo-element
- width starts at `0`
- on hover or active state, width becomes `100%`

### Footer styles

`footer` styles the bottom section with:

- top border
- uppercase small text
- gradient background

`.dev-tag` is lower-contrast supporting text.

### Hero styles

#### `.hero`

Creates:

- large top spacing
- soft gradient/radial glow
- bottom border

#### `.hero-layout`

Uses CSS Grid for a two-column hero.

#### `.eyebrow`

Small uppercase label above the hero heading.

#### `.hero h1`

Defines the main landing-page headline:

- large responsive type using `clamp(...)`
- tighter letter spacing
- gradient text fill

#### `.hero p`

Sets readable supporting paragraph styles.

#### `.hero-note`

This is the right-side card with:

- border
- translucent background
- shadow
- internal spacing

#### `.hero-link`

Styled CTA link in the hero card.

### Section intro styles

#### `.section-intro`

Flex layout used before the featured grid.

#### `.section-kicker`

Small label style reused across the site.

#### `.section-count`

Right-side display text for counts or supporting metadata.

### Grid and card styles

#### `.masonry-grid`

This is the main artwork layout container.

- uses CSS Grid
- creates responsive columns with `repeat(auto-fill, minmax(...))`
- adds gaps between items

It is called “masonry” here, but technically it is still a regular grid with varied aspect ratios, not a true masonry algorithm.

#### `.art-card`

Defines the card itself:

- relative positioning so overlays can sit inside it
- hidden overflow so hover zoom stays clipped
- border and shadow
- rounded corners
- entrance animation

#### `.art-card:nth-child(...)`

These selectors vary the `aspect-ratio` for different cards so the layout feels less repetitive.

#### `.art-card:hover`

Moves the card upward slightly and strengthens shadow/border on hover.

#### `.art-card img`

Ensures images:

- fill the card
- are cropped with `object-fit: cover`
- start slightly muted

#### `.art-card:hover img`

Zooms and brightens the image on hover.

#### `.art-info`

This is the overlay at the bottom of each card.

- absolutely positioned at the bottom
- hidden at first with low opacity and downward translation
- appears on hover

#### `.art-info h3` and `.art-info p`

Style the artwork title and metadata inside the overlay.

### Animations

#### `@keyframes fadeIn`

Simple opacity animation.

#### `@keyframes fadeInUp`

Used on artwork cards:

- starts lower and invisible
- ends in place and visible

#### `@keyframes slideInRight`

Defined for directional entrance animation, though not currently used in the visible markup.

#### `@keyframes pulse`

Creates a changing shadow effect, also defined for possible reuse.

### Custom scrollbar

The `::-webkit-scrollbar` rules style scrollbars in browsers that support these pseudo-elements.

### Page header styles

#### `.page-header`

Shared layout for page intros on secondary pages.

#### `.page-header.collection-header`

Adds a small variation for the gallery header.

### Filter styles

#### `.filters`

Creates the wrapper for the filter pill row.

#### `.filter-btn`

Default filter button appearance.

#### `.filter-btn:hover`

Changes color and background on hover.

#### `.filter-btn.active`

Highlights the selected filter with an accent gradient.

### Detail page styles

#### `.detail-container`

Creates a two-column layout:

- large image on one side
- title, metadata, and description on the other

#### `.detail-image img`

Gives the artwork image:

- border
- shadow
- rounded corners

#### `.detail-content h1`

Styles the artwork title with large gradient text.

#### `.detail-meta`

Adds top and bottom separators around metadata.

#### `.detail-meta span`

Styles each metadata row.

#### `.detail-content p`

Styles the artwork description paragraph.

#### `.back-btn`

Creates the return-to-gallery button style.

### About page styles

#### `.about-shell`

Adds outer vertical spacing.

#### `.about-content`

Creates the main glass-like panel for the about page.

#### `.about-content h1`

Large gradient heading.

#### `.about-content p`

Muted long-form paragraph styling.

#### `.mission-statement`

Special highlighted statement using:

- italic heading font
- larger size
- top and bottom borders

### Responsive media queries

There are two breakpoints:

#### `@media (max-width: 768px)`

This adjusts tablet and small laptop layouts by:

- stacking nav and hero content vertically
- collapsing the detail page into one column
- reducing grid size
- softening spacing

#### `@media (max-width: 480px)`

This adjusts small phone layouts by:

- reducing heading sizes
- reducing logo letter spacing
- making the artwork grid one column
- tightening container padding
- reducing some section corner radii and top spacing

---

## How the Whole App Works Together

### On the homepage

1. `index.html` loads.
2. `app.js` finds `#featured-grid`.
3. It takes the first three objects from `artworks`.
4. It renders them as cards using `createArtCard`.

### On the gallery page

1. `gallery.html` loads.
2. `app.js` finds `#gallery-grid`.
3. It renders all artworks.
4. Clicking a filter button reads `data-category`.
5. JS filters the array and re-renders the grid.

### On the detail page

1. The user clicks a card.
2. The URL includes `?id=<number>`.
3. `detail.html` loads.
4. `app.js` reads the `id` from the URL.
5. It finds the matching artwork object.
6. It injects the detail view into `#detail-view`.

### On the about page

1. `about.html` loads.
2. Shared CSS styles the layout.
3. No JS rendering is needed.

---

## Notes on Design Decisions

### Why dynamic rendering is used

The gallery and detail page are data-driven, which avoids duplicating artwork markup in multiple files.

Benefits:

- easier to add new artworks
- one source of truth in `data.js`
- one shared card template in `app.js`

### Why shared CSS is used

All pages use one stylesheet so the design system stays consistent.

Benefits:

- easier maintenance
- fewer duplicated styles
- more consistent visual identity

### Why IDs and classes are mixed

- `id` is used when JavaScript needs one specific DOM node
- `class` is used for reusable styling patterns

---

## If You Want an Even Deeper Version

This document explains every meaningful code block and selector in the project. If you want, I can also create:

- a line-by-line annotated version of `app.js`
- a line-by-line annotated version of `styles.css`
- a beginner version with simpler explanations
- a developer handoff version focused on architecture and maintenance
