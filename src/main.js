import SceneManager from "./game/SceneManager.js";
import { auth, provider } from "./firebase.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { saveRecord, getTop5 } from "./services/firebase.js";

const canvas = document.getElementById("juegoCanvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const loginOverlay = document.getElementById("loginOverlay");
const signBtn = document.getElementById("googleSignIn");
const userBar = document.getElementById('userBar');
const userNameSpan = document.getElementById('userName');
const signOutBtn = document.getElementById('signOutBtn');
const playAgainBtn = document.getElementById('playAgain');

// keyboard
const keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true; });
window.addEventListener("keyup", (e) => { keys[e.key] = false; });

let scene = null;
let raf = null;
let last = performance.now();

function startGameLoop() {
  if (!scene) scene = new SceneManager(ctx, WIDTH, HEIGHT);
  // wire onGameOver to save using authenticated user
  scene.onGameOver = async (finalScore) => {
    const user = auth.currentUser;
    const name = (user && user.displayName) ? user.displayName : 'Anónimo';
    try {
      await saveRecord(name, finalScore);
    } catch (err) { console.warn('Error guardando record:', err); }
    try {
      const top = await getTop5();
      scene.ui.showTop5(top);
    } catch (err) { scene.ui.showTop5([]); }
  };

  last = performance.now();
  if (!raf) raf = requestAnimationFrame(loop);
}

function stopGameLoop() {
  if (raf) cancelAnimationFrame(raf);
  raf = null;
}

function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  scene.update(dt, keys);
  scene.draw();
  raf = requestAnimationFrame(loop);
}

// Auth handlers
signBtn.addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error('Error iniciando sesión:', err);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // logged in
    loginOverlay.style.display = 'none';
    canvas.style.display = 'block';
    userBar.style.display = 'flex';
    userNameSpan.textContent = user.displayName || user.email || 'Jugador';
    playAgainBtn.style.display = 'inline-block';
    signOutBtn.style.display = 'inline-block';
    startGameLoop();
  } else {
    // not logged
    if (scene) stopGameLoop();
    loginOverlay.style.display = 'flex';
    canvas.style.display = 'none';
    userBar.style.display = 'none';
  }
});

// sign out handler
signOutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
  } catch (err) { console.error('Error cerrando sesión:', err); }
});

// play again handler
playAgainBtn.addEventListener('click', () => {
  if (!scene) return;
  // reset scene and UI
  scene.reset();
  scene.ui.showTop5([]);
  // ensure game loop is running
  startGameLoop();
});

