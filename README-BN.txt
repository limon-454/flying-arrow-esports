FLYING ARROW E-SPORTS — Tournament Registration Starter
=========================================================

এই প্রজেক্টে আছে:
- Public team registration form
- Firebase Firestore-এ registration save
- Firebase Email/Password Admin Login
- Admin dashboard: approve / reject / payment verified
- Blue esports responsive design

গুরুত্বপূর্ণ:
এটি একটি starter version। Firebase project config ও admin email বসানো ছাড়া
ডেটা save/login কাজ করবে না। প্রথমে নিচের ধাপগুলো সম্পন্ন করুন।

ধাপ ১ — Firebase Project
1. https://console.firebase.google.com/ এ যান।
2. Add project দিয়ে নতুন project তৈরি করুন।
3. Project Overview > Web (</>) থেকে Web App তৈরি করুন।
4. Firebase SDK config কপি করে firebase-config.js ফাইলে বসান।
5. Authentication > Sign-in method > Email/Password Enable করুন।
6. Authentication > Users থেকে আপনার Admin email/password user তৈরি করুন।
7. Firestore Database তৈরি করুন।

ধাপ ২ — Firestore Rules
1. Firestore Database > Rules খুলুন।
2. firestore.rules ফাইলের সম্পূর্ণ কোড কপি করুন।
3. YOUR_ADMIN_EMAIL@example.com জায়গায় আপনার Admin login email বসান।
4. Publish করুন।

ধাপ ৩ — ওয়েবসাইট চালানো
এই ফাইলগুলো একই folder-এ রাখুন। ES module ব্যবহৃত হওয়ায় index.html
সরাসরি file:// দিয়ে না খুলে hosting বা local development server দিয়ে চালান।
সহজ উপায়: Firebase Hosting ব্যবহার করুন।

ধাপ ৪ — Firebase Hosting
1. Node.js ও Firebase CLI ইনস্টল করুন।
2. Terminal-এ project folder-এ গিয়ে চালান:
   npm install -g firebase-tools
   firebase login
   firebase init hosting
3. Public directory হিসেবে বর্তমান folder নির্বাচন করুন (বা ফাইলগুলো public folder-এ রাখুন)।
4. Single-page app? No নির্বাচন করুন।
5. firebase deploy চালান।

সিকিউরিটি নোট:
- Firebase config browser-এ থাকা স্বাভাবিক; এটি secret password নয়।
- Service account private key কখনো website code-এ দেবেন না।
- Firestore Rules-এ Admin email অবশ্যই নিজের email দিয়ে বদলাবেন।
- Firebase Console-এ usage monitoring ও App Check চালু করার পরামর্শ দেওয়া হচ্ছে।
- Public form-এ spam ঠেকাতে পরবর্তী ধাপে App Check / CAPTCHA যোগ করা উচিত।

পরবর্তী কাস্টমাইজেশন:
Tournament banner, Entry Fee, payment receiver number, tournament schedule,
logo upload এবং registration export এখনো starter-এ যোগ করা হয়নি।
এসব তথ্য দিলে পরের ধাপে যুক্ত করা যাবে।
