# Sanity Studio

The admin UI for projects, categories and site settings. It has its own
dependencies because Sanity Studio doesn't run inside Create React App.

## Setup on a new machine

1. From this folder, install and log in:

   ```bash
   npm install
   ```

   ```bash
   npx sanity login
   ```

2. Copy `.env.example` to `.env` here, and the root `.env.example` to
   `.env.local`, and fill in the project ID from sanity.io/manage.

## Everyday use

Start the Studio at http://localhost:3333:

```bash
npm run dev
```

Host it at `<name>.sanity.studio` so you can edit from anywhere:

```bash
npm run deploy
```

Published changes appear on the site on the next page load, usually within a
minute because reads go through Sanity's CDN. Drafts stay private until
published.

## Going live

Allow your live domain to read from Sanity:

```bash
npx sanity cors add https://your-domain.com --no-credentials
```

Then set `REACT_APP_SANITY_PROJECT_ID` and `REACT_APP_SANITY_DATASET` on your
host.

## Adding a social platform

Add it to the platform list in `schemaTypes/siteSettings.js` and give it an icon
in `src/constants/socialIcons.js`.
