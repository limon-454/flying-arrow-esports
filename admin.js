import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, query, orderBy, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const loginPanel = document.getElementById("loginPanel");
const dashboard = document.getElementById("dashboard");
const rows = document.getElementById("registrationRows");
let stopListening = null;

document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const message = document.getElementById("loginMessage");
  message.textContent = "";
  try {
    await signInWithEmailAndPassword(auth, document.getElementById("email").value.trim(), document.getElementById("password").value);
  } catch (err) {
    message.textContent = "লগইন হয়নি। Email/Password এবং Firebase Authentication সেটিংস চেক করুন।";
    message.classList.add("error");
  }
});

onAuthStateChanged(auth, user => {
  if (stopListening) { stopListening(); stopListening = null; }
  loginPanel.hidden = !!user;
  dashboard.hidden = !user;
  if (user) loadRegistrations();
});

document.getElementById("logoutBtn").addEventListener("click", () => signOut(auth));

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function loadRegistrations() {
  const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
  stopListening = onSnapshot(q, snapshot => {
    document.getElementById("countText").textContent = `TOTAL REGISTRATIONS: ${snapshot.size}`;
    rows.innerHTML = "";
    snapshot.forEach(item => {
      const d = item.data();
      const playerText = (d.players || []).map(p => `${safe(p.name)} (${safe(p.uid)})`).join("<br>");
      const tr = document.createElement("tr");
      tr.innerHTML = `<td><b>${safe(d.teamName)}</b><br><small>${safe(d.tournamentName)}</small></td>
        <td>${safe(d.leaderName)}</td><td>${safe(d.whatsapp)}</td>
        <td>${safe(d.paymentMethod)}<br><small>${safe(d.transactionId)}</small><br><span class="status">${safe(d.paymentStatus || "pending")}</span></td>
        <td>${playerText}</td><td><span class="status ${safe(d.status)}">${safe(d.status)}</span></td>
        <td><button class="action-btn" data-action="approve">APPROVE</button><button class="action-btn" data-action="reject">REJECT</button><button class="action-btn" data-action="paid">PAYMENT OK</button></td>`;
      tr.querySelector('[data-action="approve"]').addEventListener("click", () => changeStatus(item.id, {status:"approved"}));
      tr.querySelector('[data-action="reject"]').addEventListener("click", () => changeStatus(item.id, {status:"rejected"}));
      tr.querySelector('[data-action="paid"]').addEventListener("click", () => changeStatus(item.id, {paymentStatus:"verified"}));
      rows.appendChild(tr);
    });
  }, error => {
    document.getElementById("dashboardMessage").textContent = "ডেটা লোড হয়নি। Firestore Rules-এ Admin email অনুমোদিত কি না দেখুন।";
    document.getElementById("dashboardMessage").className = "message error";
    console.error(error);
  });
}
async function changeStatus(id, changes) {
  try {
    await updateDoc(doc(db, "registrations", id), changes);
    document.getElementById("dashboardMessage").textContent = "আপডেট সফল হয়েছে।";
    document.getElementById("dashboardMessage").className = "message success";
  } catch (err) {
    document.getElementById("dashboardMessage").textContent = "আপডেট হয়নি। Admin permission চেক করুন।";
    document.getElementById("dashboardMessage").className = "message error";
    console.error(err);
  }
}
