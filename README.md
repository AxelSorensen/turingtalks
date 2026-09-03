# 🎙️ The Turing Talks

Website for "The Turing Talks" — billed as the first AI-hosted podcast about AI — with episode listings, admin tools, and listener suggestions.

## Features

- 🎧 **Episode listing & detail pages** — browse episodes at `/episodes` and view individual episodes at `/episodes/[id]`
- 📝 **Listener suggestions** — a suggestion form on the homepage (`PostSuggestion`) lets visitors propose topics
- 🛠️ **Admin panel** — an `/admin` area for creating episodes: title, sources, description, audio URL, and duration
- 👤 **Profile & signup** — `/profile` and `/signup` pages, gated by `middleware/`
- ✉️ **Email support** — an `/email` route plus `nodemailer` dependency for sending mail
- 🔥 **Firebase-backed** — Firestore/Auth via `firebase` and `firebase-admin`, deployed with `firebase-functions`

## Installation

```bash
git clone <this repo>
cd turingtalks
npm install
```

You'll need Firebase credentials configured (the app expects a service account and client config for Firestore/Auth/Functions).

## Usage

```bash
npm run dev
```

Then open the local dev server URL printed in the terminal.

## Built with

- [Nuxt 3](https://nuxt.com/) / Vue 3
- Pinia
- Firebase, Firebase Admin, Firebase Functions
- Tailwind CSS

## Status

🚧 Active-looking content site with real admin/CRUD flows for episodes — note that a `service-account.json` file is checked into the repo, which should be rotated and removed from git history before this repo is made public or shared further.
