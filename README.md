// ...existing code...
# Pastor de Cabras en el Desierto de Sechura

**Minijuego educativo e infantil** inspirado en la Idea 16 (costumbres locales). Eres un pastor que debe cuidar sus cabras en el desierto de Sechura: agrupar cabras, esquivar al zorro y, en un segundo nivel, recolectar algarrobas.

---

## 1. TÍTULO Y DESCRIPCIÓN DEL JUEGO

**Pastor de Cabras en el Desierto de Sechura**

- Objetivo: controlar al pastor para reunir cabras 🐐, evitar al zorro 🦊 y, en Nivel 2, recolectar algarrobas 🌾.
- Niveles:
  - **Nivel 1 — Agrupar cabras 🐐 y esquivar al zorro 🦊**  
    - Reúne cabras para sumar puntos. Cada cabra suma **+10**.  
    - Evita al zorro; al colisionar resta **-10** y el jugador se reinicia al centro.  
    - Implementación: [`Goat`](src/entities/Items.js), [`Fox`](src/entities/Enemies.js), lógica de colisiones en [`SceneManager`](src/game/SceneManager.js).
  - **Nivel 2 — Recolectar algarrobas 🌾 con mayor dificultad**  
    - Se desbloquea al alcanzar 100 pts: el zorro acelera y aparecen algarrobas que suman **+20**.  
    - Implementación: [`Algarroba`](src/entities/Items.js), subida de velocidad en [`Fox.speedUp()`](src/entities/Enemies.js), gestión de transición en [`SceneManager`](src/game/SceneManager.js).
- Enfoque: educativo / infantil — uso de emojis como sprites y mecánicas simples para niños.
- Puntos de entrada: [index.html](index.html) / [docs/index.html](docs/index.html) y arranque en [`src/main.js`](src/main.js).

---

## 2. BITÁCORA DE DESARROLLO (cronológica)

1. Inicialización con Node.js y Vite  
   - Configuración del proyecto y scripts en [package.json](package.json).  
   - Base/build para GitHub Pages en [`vite.config.js`](vite.config.js) (salida en `docs/`).

2. Programación del Game Loop a 60 FPS en HTML5 Canvas  
   - Bucle principal con `requestAnimationFrame` y cálculo de dt en [`src/main.js`](src/main.js).

3. Implementación de colisiones AABB y renderizado de emojis como sprites  
   - Colisión AABB en [`src/utils/physics.js`](src/utils/physics.js).  
   - Entidades y dibujo por emoji en [`src/entities/Player.js`](src/entities/Player.js), [`src/entities/Items.js`](src/entities/Items.js), [`src/entities/Enemies.js`](src/entities/Enemies.js).  
   - Gestión de escenas y reglas en [`src/game/SceneManager.js`](src/game/SceneManager.js).

4. Integración de Firebase (Autenticación con Google y Firestore para Top 5)  
   - Inicialización y helpers en [`src/firebase.js`](src/firebase.js) — exports: [`auth`](src/firebase.js), [`provider`](src/firebase.js), [`saveRecord`](src/firebase.js), [`getTop5`](src/firebase.js).  
   - Adapter export en [`src/services/firebase.js`](src/services/firebase.js).  
   - Uso en el flujo de juego desde [`src/main.js`](src/main.js) (sign-in, onAuthStateChanged, guardar records).

5. Despliegue estático en GitHub Pages  
   - Build en `docs/` y archivos servidos: [docs/index.html](docs/index.html) y [docs/assets/](docs/) (assets compilados).

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
[Frontend: Canvas] -- (game loop) --> [SceneManager] (`src/game/SceneManager.js`)
   |                                      |
   v                                      v
[UI / HUD] (`src/ui/UIManager.js`)    [Lógica de entidades: `Player`, `Goat`, `Fox`, `Algarroba`]
   |
   v
[Servicios Firebase]
   ├─ Auth (Google) -> [`auth`, `provider`] (`src/firebase.js`)
   └─ Firestore (Top 5) -> [`saveRecord`](src/firebase.js), [`getTop5`](src/firebase.js)
```

---

## 4. GLOSARIO DE TÉRMINOS

- **HTML5 Canvas** — Lienzo 2D usado para dibujar el juego. Implementado en [`src/main.js`](src/main.js).
- **Game Loop (requestAnimationFrame)** — Bucle principal que actualiza y renderiza con dt; ver [`src/main.js`](src/main.js).
- **Colisión AABB (Axis-Aligned Bounding Box)** — Detección rectilínea usada en [`src/utils/physics.js`](src/utils/physics.js) como `aabb`.
- **Vite (Bundler)** — Herramienta de desarrollo y build; configuración en [`vite.config.js`](vite.config.js).
- **Firebase / Serverless** — Backend sin servidor para Auth y Firestore; implementación y helpers en [`src/firebase.js`](src/firebase.js) y adaptador en [`src/services/firebase.js`](src/services/firebase.js).
- **Módulos ES6** — Organización por archivos con `import`/`export` (ej.: [`src/services/firebase.js`](src/services/firebase.js) reexporta funciones de [`src/firebase.js`](src/firebase.js)).

---

## 5. MINI MANUAL BÁSICO

- Requisitos y comandos:
  ```bash
  npm install
  npm run dev      # desarrollo (Vite)
  npm run build    # producción -> genera docs/
  ```

- Cómo iniciar sesión con Google:
  1. Abre [index.html](index.html) (o la versión desplegada en `docs/`).  
  2. Haz clic en **Iniciar Sesión con Google** (botón `#googleSignIn`, manejado en [`src/main.js`](src/main.js)).  
  3. Al autenticarse, el overlay se oculta y aparece la barra de usuario (`#userBar`). Consulta [`auth`](src/firebase.js).

- Controles de movimiento:
  - Flechas direccionales: ← ↑ → ↓  
  - Alternativa: WASD  
  - Implementado en [`src/entities/Player.js`](src/entities/Player.js).

- Reglas de puntuación (resumen):
  - Cabras (🐐) → **+10** puntos (colisión en [`SceneManager`](src/game/SceneManager.js)).  
  - Algarrobas (🌾) → **+20** puntos (aparecen en Nivel 2; clase [`Algarroba`](src/entities/Items.js)).  
  - Zorro (🦊) → **-10** puntos y reset del jugador (`Player.reset`) al centro (detectado en [`SceneManager`](src/game/SceneManager.js)).

- Condición de fin de juego:
  - Temporizador de **60 segundos**. Al llegar a 0 el juego termina y se ejecuta [`SceneManager.endGame()`](src/game/SceneManager.js).  
  - Si estás autenticado, el puntaje final se guarda con [`saveRecord`](src/services/firebase.js) → [`saveRecord`](src/firebase.js) y se obtiene el Top 5 con [`getTop5`](src/services/firebase.js) → [`getTop5`](src/firebase.js).

- UI / acciones adicionales:
  - Botón **Jugar de nuevo** (`#playAgain`) reinicia la escena (manejado en [`src/main.js`](src/main.js)).  
  - Botón **Cerrar sesión** (`#signOutBtn`) cierra sesión con Firebase (manejado en [`src/main.js`](src/main.js)).  
  - HUD y pantalla de fin de juego: [`src/ui/UIManager.js`](src/ui/UIManager.js).

---

## ARCHIVOS CLAVE (referencias rápidas)

- Raíz: [index.html](index.html), [package.json](package.json), [vite.config.js](vite.config.js), [README.md](README.md)  
- Build / deploy: [docs/index.html](docs/index.html)  
- Estilos: [`src/style.css`](src/style.css)  
- Entrada / loop: [`src/main.js`](src/main.js)  
- Firebase: [`src/firebase.js`](src/firebase.js) — exports: [`auth`](src/firebase.js), [`provider`](src/firebase.js), [`saveRecord`](src/firebase.js), [`getTop5`](src/firebase.js)  
- Adapter servicios: [`src/services/firebase.js`](src/services/firebase.js)  
- Game: [`src/game/SceneManager.js`](src/game/SceneManager.js) — clase [`SceneManager`](src/game/SceneManager.js)  
- Entidades: [`src/entities/Player.js`](src/entities/Player.js) — clase [`Player`](src/entities/Player.js)  
  - [`src/entities/Enemies.js`](src/entities/Enemies.js) — clase [`Fox`](src/entities/Enemies.js)  
  - [`src/entities/Items.js`](src/entities/Items.js) — clases [`Goat`](src/entities/Items.js), [`Algarroba`](src/entities/Items.js)  
- UI: [`src/ui/UIManager.js`](src/ui/UIManager.js)  
- Utilities: [`src/utils/physics.js`](src/utils/physics.js) — funciones [`aabb`](src/utils/physics.js), [`clamp`](src/utils/physics.js)

---
**¡Listo!** El README ha sido preparado para reemplazar el archivo actual con la documentación final del proyecto.
// ...existing code...
```// filepath: /home/imramson/Documentos/juegov1/README.md
// ...existing code...
# Pastor de Cabras en el Desierto de Sechura

**Minijuego educativo e infantil** inspirado en la Idea 16 (costumbres locales). Eres un pastor que debe cuidar sus cabras en el desierto de Sechura: agrupar cabras, esquivar al zorro y, en un segundo nivel, recolectar algarrobas.

---

## 1. TÍTULO Y DESCRIPCIÓN DEL JUEGO

**Pastor de Cabras en el Desierto de Sechura**

- Objetivo: controlar al pastor para reunir cabras 🐐, evitar al zorro 🦊 y, en Nivel 2, recolectar algarrobas 🌾.
- Niveles:
  - **Nivel 1 — Agrupar cabras 🐐 y esquivar al zorro 🦊**  
    - Reúne cabras para sumar puntos. Cada cabra suma **+10**.  
    - Evita al zorro; al colisionar resta **-10** y el jugador se reinicia al centro.  
    - Implementación: [`Goat`](src/entities/Items.js), [`Fox`](src/entities/Enemies.js), lógica de colisiones en [`SceneManager`](src/game/SceneManager.js).
  - **Nivel 2 — Recolectar algarrobas 🌾 con mayor dificultad**  
    - Se desbloquea al alcanzar 100 pts: el zorro acelera y aparecen algarrobas que suman **+20**.  
    - Implementación: [`Algarroba`](src/entities/Items.js), subida de velocidad en [`Fox.speedUp()`](src/entities/Enemies.js), gestión de transición en [`SceneManager`](src/game/SceneManager.js).
- Enfoque: educativo / infantil — uso de emojis como sprites y mecánicas simples para niños.
- Puntos de entrada: [index.html](index.html) / [docs/index.html](docs/index.html) y arranque en [`src/main.js`](src/main.js).

---

## 2. BITÁCORA DE DESARROLLO (cronológica)

1. Inicialización con Node.js y Vite  
   - Configuración del proyecto y scripts en [package.json](package.json).  
   - Base/build para GitHub Pages en [`vite.config.js`](vite.config.js) (salida en `docs/`).

2. Programación del Game Loop a 60 FPS en HTML5 Canvas  
   - Bucle principal con `requestAnimationFrame` y cálculo de dt en [`src/main.js`](src/main.js).

3. Implementación de colisiones AABB y renderizado de emojis como sprites  
   - Colisión AABB en [`src/utils/physics.js`](src/utils/physics.js).  
   - Entidades y dibujo por emoji en [`src/entities/Player.js`](src/entities/Player.js), [`src/entities/Items.js`](src/entities/Items.js), [`src/entities/Enemies.js`](src/entities/Enemies.js).  
   - Gestión de escenas y reglas en [`src/game/SceneManager.js`](src/game/SceneManager.js).

4. Integración de Firebase (Autenticación con Google y Firestore para Top 5)  
   - Inicialización y helpers en [`src/firebase.js`](src/firebase.js) — exports: [`auth`](src/firebase.js), [`provider`](src/firebase.js), [`saveRecord`](src/firebase.js), [`getTop5`](src/firebase.js).  
   - Adapter export en [`src/services/firebase.js`](src/services/firebase.js).  
   - Uso en el flujo de juego desde [`src/main.js`](src/main.js) (sign-in, onAuthStateChanged, guardar records).

5. Despliegue estático en GitHub Pages  
   - Build en `docs/` y archivos servidos: [docs/index.html](docs/index.html) y [docs/assets/](docs/) (assets compilados).

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
[Frontend: Canvas] -- (game loop) --> [SceneManager] (`src/game/SceneManager.js`)
   |                                      |
   v                                      v
[UI / HUD] (`src/ui/UIManager.js`)    [Lógica de entidades: `Player`, `Goat`, `Fox`, `Algarroba`]
   |
   v
[Servicios Firebase]
   ├─ Auth (Google) -> [`auth`, `provider`] (`src/firebase.js`)
   └─ Firestore (Top 5) -> [`saveRecord`](src/firebase.js), [`getTop5`](src/firebase.js)
```

---

## 4. GLOSARIO DE TÉRMINOS

- **HTML5 Canvas** — Lienzo 2D usado para dibujar el juego. Implementado en [`src/main.js`](src/main.js).
- **Game Loop (requestAnimationFrame)** — Bucle principal que actualiza y renderiza con dt; ver [`src/main.js`](src/main.js).
- **Colisión AABB (Axis-Aligned Bounding Box)** — Detección rectilínea usada en [`src/utils/physics.js`](src/utils/physics.js) como `aabb`.
- **Vite (Bundler)** — Herramienta de desarrollo y build; configuración en [`vite.config.js`](vite.config.js).
- **Firebase / Serverless** — Backend sin servidor para Auth y Firestore; implementación y helpers en [`src/firebase.js`](src/firebase.js) y adaptador en [`src/services/firebase.js`](src/services/firebase.js).
- **Módulos ES6** — Organización por archivos con `import`/`export` (ej.: [`src/services/firebase.js`](src/services/firebase.js) reexporta funciones de [`src/firebase.js`](src/firebase.js)).

---

## 5. MINI MANUAL BÁSICO

- Requisitos y comandos:
  ```bash
  npm install
  npm run dev      # desarrollo (Vite)
  npm run build    # producción -> genera docs/
  ```

- Cómo iniciar sesión con Google:
  1. Abre [index.html](index.html) (o la versión desplegada en `docs/`).  
  2. Haz clic en **Iniciar Sesión con Google** (botón `#googleSignIn`, manejado en [`src/main.js`](src/main.js)).  
  3. Al autenticarse, el overlay se oculta y aparece la barra de usuario (`#userBar`). Consulta [`auth`](src/firebase.js).

- Controles de movimiento:
  - Flechas direccionales: ← ↑ → ↓  
  - Alternativa: WASD  
  - Implementado en [`src/entities/Player.js`](src/entities/Player.js).

- Reglas de puntuación (resumen):
  - Cabras (🐐) → **+10** puntos (colisión en [`SceneManager`](src/game/SceneManager.js)).  
  - Algarrobas (🌾) → **+20** puntos (aparecen en Nivel 2; clase [`Algarroba`](src/entities/Items.js)).  
  - Zorro (🦊) → **-10** puntos y reset del jugador (`Player.reset`) al centro (detectado en [`SceneManager`](src/game/SceneManager.js)).

- Condición de fin de juego:
  - Temporizador de **60 segundos**. Al llegar a 0 el juego termina y se ejecuta [`SceneManager.endGame()`](src/game/SceneManager.js).  
  - Si estás autenticado, el puntaje final se guarda con [`saveRecord`](src/services/firebase.js) → [`saveRecord`](src/firebase.js) y se obtiene el Top 5 con [`getTop5`](src/services/firebase.js) → [`getTop5`](src/firebase.js).

- UI / acciones adicionales:
  - Botón **Jugar de nuevo** (`#playAgain`) reinicia la escena (manejado en [`src/main.js`](src/main.js)).  
  - Botón **Cerrar sesión** (`#signOutBtn`) cierra sesión con Firebase (manejado en [`src/main.js`](src/main.js)).  
  - HUD y pantalla de fin de juego: [`src/ui/UIManager.js`](src/ui/UIManager.js).

---

## ARCHIVOS CLAVE (referencias rápidas)

- Raíz: [index.html](index.html), [package.json](package.json), [vite.config.js](vite.config.js), [README.md](README.md)  
- Build / deploy: [docs/index.html](docs/index.html)  
- Estilos: [`src/style.css`](src/style.css)  
- Entrada / loop: [`src/main.js`](src/main.js)  
- Firebase: [`src/firebase.js`](src/firebase.js) — exports: [`auth`](src/firebase.js), [`provider`](src/firebase.js), [`saveRecord`](src/firebase.js), [`getTop5`](src/firebase.js)  
- Adapter servicios: [`src/services/firebase.js`](src/services/firebase.js)  
- Game: [`src/game/SceneManager.js`](src/game/SceneManager.js) — clase [`SceneManager`](src/game/SceneManager.js)  
- Entidades: [`src/entities/Player.js`](src/entities/Player.js) — clase [`Player`](src/entities/Player.js)  
  - [`src/entities/Enemies.js`](src/entities/Enemies.js) — clase [`Fox`](src/entities/Enemies.js)  
  - [`src/entities/Items.js`](src/entities/Items.js) — clases [`Goat`](src/entities/Items.js), [`Algarroba`](src/entities/Items.js)  
- UI: [`src/ui/UIManager.js`](src/ui/UIManager.js)  
- Utilities: [`src/utils/physics.js`](src/utils/physics.js) — funciones [`aabb`](src/utils/physics.js), [`clamp`](src/utils/physics.js)

---
**¡Listo!**