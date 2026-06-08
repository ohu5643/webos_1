import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1ZoiIa-l_5448EV7MJMOpwAWQKlToa4w",
  authDomain: "suhang-20db6.firebaseapp.com",
  projectId: "suhang-20db6",
  storageBucket: "suhang-20db6.firebasestorage.app",
  messagingSenderId: "358735909030",
  appId: "1:358735909030:web:7f58fa5f2554508477e467",
  measurementId: "G-ZBPY3XBBFW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
