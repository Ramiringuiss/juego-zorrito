# Pastor de Cabras en el Desierto de Sechura

**Minijuego** Eres un pastor que debe cuidar sus cabras en el desierto de Sechura: agrupar cabras, esquivar al zorro y, en un segundo nivel, recolectar algarrobas.

---

## 1. TÍTULO Y DESCRIPCIÓN DEL JUEGO

**Pastor de Cabras en el Desierto de Sechura**

- Objetivo: controlar al pastor para reunir cabras 🐐, evitar al zorro 🦊 y, en Nivel 2, recolectar algarrobas 🌾.  
- Niveles:
  - **Nivel 1 — Agrupar cabras 🐐 y esquivar al zorro 🦊**  
    - Reúne cabras para sumar puntos. Cada cabra suma **+10**.  
    - Evita al zorro; al colisionar resta **-10** y el jugador se reinicia al centro.  
  - **Nivel 2 — Recolectar algarrobas 🌾 con mayor dificultad**  
    - Se desbloquea al alcanzar 100 pts: el zorro acelera y aparecen algarrobas que suman **+20**.  
- Enfoque: educativo/infantil — uso de emojis como sprites y mecánicas simples para niños.

---

## 2. BITÁCORA DE DESARROLLO (cronológica)

1. **Inicialización con Node.js y Vite**  
   - Configuración del proyecto y scripts en `package.json`. Build dirigido a `docs/` para GitHub Pages (config en `vite.config.js`).

2. **Programación del Game Loop a 60 FPS en HTML5 Canvas**  
   - Bucle principal con `requestAnimationFrame` y cálculo de dt en `src/main.js`.

3. **Implementación de colisiones AABB y renderizado de emojis como sprites**  
   - Colisión AABB y utilidades en `src/utils/physics.js`.  
   - Entidades y dibujo por emoji en `src/entities/Player.js`, `src/entities/Items.js`, `src/entities/Enemies.js`.  
   - Gestión de escenas y reglas en `src/game/SceneManager.js`.

4. **Integración de Firebase (Autenticación con Google y Firestore para Top 5)**  
   - Inicialización y helpers en `src/firebase.js` (exports: `auth`, `provider`, `saveRecord`, `getTop5`).  
   - Adaptador en `src/services/firebase.js`. Uso en el flujo del juego desde `src/main.js`.

5. **Despliegue estático en GitHub Pages**  
   - Build en `docs/` y contenidos servidos desde esa carpeta (`docs/index.html`, `docs/assets/`).

---

## 3. DIAGRAMA DE CONTEXTO

Jugador -> Controles (Teclado) -> Frontend (Canvas / Vite) -> Backend Serverless (Firebase Auth & Firestore)

Flujo ASCII:

```
[Jugador]
   |
   v
[Controles (Teclado: ← ↑ → ↓ / WASD)]
   |
   v
[Frontend: Canvas] -- (game loop) --> [SceneManager] (src/game/SceneManager.js)
   |                                      |
   v                                      v
[UI / HUD] (src/ui/UIManager.js)       [Entidades: Player, Goat, Fox, Algarroba]
   |
   v
[Servicios Firebase]
   ├─ Auth (Google) -> (auth, provider) (src/firebase.js)
   └─ Firestore (Top 5) -> (saveRecord, getTop5) (src/firebase.js)
```

---

## 4. GLOSARIO DE TÉRMINOS

- **HTML5 Canvas** — Lienzo 2D usado para dibujar el juego (src/main.js).  
- **Game Loop (requestAnimationFrame)** — Bucle principal que actualiza y renderiza con dt (src/main.js).  
- **Colisión AABB (Axis-Aligned Bounding Box)** — Detección rectilínea usada en `src/utils/physics.js`.  
- **Vite (Bundler)** — Herramienta de desarrollo y build; configuración en `vite.config.js`.  
- **Firebase / Serverless** — Backend sin servidor para Auth y Firestore; implementado en `src/firebase.js` y adaptador en `src/services/firebase.js`.  
- **Módulos ES6** — Organización por archivos con `import`/`export`.

---

## 5. MINI MANUAL BÁSICO

- Requisitos y comandos:
  ```bash
  npm install
  npm run dev      # desarrollo (Vite)
  npm run build    # producción -> genera docs/
  ```

- Cómo iniciar sesión con Google:
  1. Abre `index.html` (o la versión desplegada en `docs/`).  
  2. Haz clic en **Iniciar Sesión con Google** (botón `#googleSignIn` manejado en `src/main.js`).  
  3. Al autenticarse la UI se actualiza y tu nombre aparece en la barra de usuario.

- Controles de movimiento:
  - Flechas direccionales: ← ↑ → ↓  
  - Alternativa: WASD

- Reglas de puntuación:
  - Cabras (🐐) → **+10** puntos.  
  - Algarrobas (🌾) → **+20** puntos (Nivel 2).  
  - Zorro (🦊) → **-10** puntos y reset del jugador al centro.

- Condición de fin de juego:
  - Temporizador de **60 segundos**. Al llegar a 0 se termina la partida y se guarda el puntaje si hay sesión iniciada (`saveRecord` -> `src/services/firebase.js`).

---

## Archivos y referencias clave

- Entrada: `index.html`, `docs/index.html`  
- Config: `package.json`, `vite.config.js`  
- Código fuente: `src/main.js`, `src/style.css`, `src/game/SceneManager.js`, `src/entities/*.js`, `src/ui/UIManager.js`, `src/utils/physics.js`, `src/firebase.js`, `src/services/firebase.js`  
- Build: `docs/`
