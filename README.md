# WMS Tracer System (Frontend + Firebase)

Sistem WMS tracer management:
- Upload .txt tracer per SO (auto-parse metadata)
- Store to Firestore: `so_items`, `tracers`, `invoices`
- Search tracer / SO / Invoice
- Master table with export
- Cloud Function sample for post-processing

## Repo layout
See project root for `frontend/`, `functions/`, `firebase/`.

## Quick start (dev)
1. Create Firebase project at https://console.firebase.google.com
2. Enable Firestore (native mode).
3. Create Web app and copy firebaseConfig.
4. In `frontend/index.html` replace `firebaseConfig` placeholder.
5. Serve frontend locally (VSCode Live Server or `npx http-server frontend`).
6. Test upload / search.

## Deploy
- Frontend → Vercel / Netlify / any static host.
- Functions → Firebase Functions (see `functions/package.json`).
- Firestore rules → `firebase deploy --only firestore:rules,functions,hosting`.

See `docs/deployment.md` for step-by-step.

## Notes
- For very large tracer arrays consider chunking (docs explain).
- Secure Firestore rules: enable auth or service account restrictions in production.
