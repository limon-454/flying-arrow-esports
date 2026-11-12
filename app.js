import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const form = document.getElementById("registrationForm");
const msg = document.getElementById("formMessage");
const btn = document.getElementById("submitBtn");
document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  msg.textContent = "";
  msg.className = "message";
  btn.disabled = true;
  btn.textContent = "SUBMITTING...";
  const f = new FormData(form);
  const data = {
    tournamentName: String(f.get("tournamentName")).trim(),
    teamName: String(f.get("teamName")).trim(),
    leaderName: String(f.get("leaderName")).trim(),
    whatsapp: String(f.get("whatsapp")).trim(),
    paymentMethod: String(f.get("paymentMethod")),
    transactionId: String(f.get("transactionId")).trim(),
    players: [1,2,3,4].map(n => ({
      name: String(f.get(`p${n}name`)).trim(),
      uid: String(f.get(`p${n}uid`)).trim()
    })),
    status: "pending",
    paymentStatus: "pending",
    createdAt: serverTimestamp()
  };
  try {
    await addDoc(collection(db, "registrations"), data);
    msg.textContent = "রেজিস্ট্রেশন সফলভাবে জমা হয়েছে! Admin যাচাই করার পর Confirm হবে।";
    msg.classList.add("success");
    form.reset();
  } catch (error) {
    console.error(error);
    msg.textContent = "জমা হয়নি। Firebase config ও Firestore Rules চেক করে আবার চেষ্টা করুন।";
    msg.classList.add("error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'SUBMIT REGISTRATION <span>↗</span>';
  }
});
