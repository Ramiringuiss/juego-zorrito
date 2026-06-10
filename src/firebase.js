// src/firebase.js
// Inicialización de Firebase (SDK modular v9+)
// -------------------------------
// Pega tu firebaseConfig en el objeto `firebaseConfig` abajo.
// Ejemplo:
// const firebaseConfig = {
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "..."
// };

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6zts2MY1uEdm0ElnpZjXsGcZN9yT_L8A",
  authDomain: "juego-sechura.firebaseapp.com",
  projectId: "juego-sechura",
  storageBucket: "juego-sechura.firebasestorage.app",
  messagingSenderId: "818024632140",
  appId: "1:818024632140:web:506b5652236c73698149e9",
  measurementId: "G-HL6QP8NPEQ"
};

const app = initializeApp(firebaseConfig);
// Analytics (opcional)
let analytics;
try { analytics = getAnalytics(app); } catch (e) { /* Analytics puede requerir entorno de navegador */ }
const db = getFirestore(app);

// Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

const RECORDS_COLLECTION = "tabla_records";

export async function saveRecord(nombre, puntaje) {
  try {
    const colRef = collection(db, RECORDS_COLLECTION);
    const docRef = await addDoc(colRef, {
      nombre,
      puntaje,
      fecha: serverTimestamp()
    });
    return { id: docRef.id };
  } catch (err) {
    console.error("Error guardando record:", err);
    throw err;
  }
}

export async function getTop5() {
  try {
    const colRef = collection(db, RECORDS_COLLECTION);
    const q = query(colRef, orderBy("puntaje", "desc"), limit(5));
    const snapshot = await getDocs(q);
    const results = [];
    snapshot.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (err) {
    console.error("Error obteniendo top5:", err);
    throw err;
  }
}
