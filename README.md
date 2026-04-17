# Jio PC Project 🖥️

Ek advanced Cloud PC system jo aapke iFFALCON 55-inch Android TV ko ek poore computer mein badal deta hai.

## 📁 Project Structure
- **server/**: Node.js aur Socket.io bridge jo signals transfer karta hai.
- **tv-app/**: Next.js + Capacitor se bani TV ki asli Desktop screen (APK).
- **mobile-remote/**: Next.js based trackpad jo phone ko mouse banata hai.

## 🚀 Setup Instructions
1. **Server:** `cd server` karke `npm start` karein.
2. **TV:** APK ko TV par install karein aur server ka IP daalein.
3. **Remote:** Phone browser mein server IP kholkar mouse control karein.

## 🛠️ Tech Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Socket.io
- **Mobile:** Capacitor.js
