# Deployment (quick)

## 1) Firebase setup
1. Create project in Firebase console.
2. Enable Firestore (native mode).
3. Create Web App, copy firebaseConfig.
4. Replace `firebaseConfig` in `frontend/index.html`.
5. Setup Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init
