# Effizienz Services

Premium static one-page website for Cloudflare Pages.

## Cloudflare Pages

- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`
- Root directory: leave empty

## Contact details

Before the final live launch, edit the `CONTACT` object near the bottom of `index.html`:

```js
const CONTACT = {
  phone: "+49...",
  phoneLabel: "+49 ...",
  email: "...",
  instagram: "https://instagram.com/..."
};
```

The phone, email and Instagram buttons will appear automatically. The contact form opens a pre-filled email and stores no form data on the site.

## Later project photos

A hidden `#referenzen` section is already reserved in `index.html`, so a project gallery can be added later without redesigning the page.
