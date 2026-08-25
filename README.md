# Bangladesh — Explore Beyond the Expected 🇧🇩

A cinematic, static tourism website concept for Bangladesh, designed for GitHub Pages.

## Run it

No build step is required. Open `index.html` in a browser, or serve the folder with any simple local HTTP server.

## Add your own photos

The project intentionally ships without AI-generated photography. Each image slot is connected to a single configuration object in `app.js`:

```js
const IMAGE_CONFIG = {
  hero: 'assets/images/hero/hero.jpg',
  sundarbans: 'assets/images/destinations/sundarbans.jpg',
  // ...
};
```

Put your licensed/owned photographs into the matching `assets/images/...` folder and keep the filenames above, or change the paths in `IMAGE_CONFIG`.

The site will gracefully keep its designed placeholder when a photo is missing, so nothing breaks while you are building your gallery.

## Content editing

Destination data and itinerary data are near the top of `app.js`. Add, remove or edit entries there.

## GitHub Pages

This project is plain static HTML/CSS/JS, so it can be deployed directly from the repository. In GitHub: **Settings → Pages → Deploy from a branch → select your main branch and `/root`**.

## Design notes

The visual direction takes broad inspiration from the experience of modern destination sites such as the Nepal Tourism Board: clear discovery categories, destination-led storytelling, trip planning and strong editorial photography. It is an original Bangladesh-focused implementation rather than a copy of another site's layout or assets.
