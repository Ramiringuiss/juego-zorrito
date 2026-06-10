import Player from "../entities/Player.js";
import { Fox } from "../entities/Enemies.js";
import { Goat, Algarroba } from "../entities/Items.js";
import UIManager from "../ui/UIManager.js";
import { aabb } from "../utils/physics.js";

export default class SceneManager {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.ui = new UIManager(ctx, width, height);
    this.onGameOver = null; // callback(score)
    this.reset();
    this.screenShake = { timeLeft: 0, duration: 0, magnitude: 0 };
    this.overlayPulse = { timeLeft: 0, duration: 0 };
  }

  reset() {
    this.state = "playing"; // playing | gameover
    this.score = 0;
    this.level = 1;
    this.timeLeft = 60;

    this.player = new Player(this.width / 2, this.height / 2);
    this.goat = new Goat(this.width, this.height);
    this.fox = new Fox(80, 80);
    this.algarroba = new Algarroba(this.width, this.height);
    this.algarroba.active = false;
    // spawn initial goat
    this.goat.spawn(this.width, this.height);
    // clear top5 from UI
    if (this.ui && typeof this.ui.showTop5 === 'function') this.ui.showTop5([]);
  }

  update(dt, keys) {
    if (this.state !== "playing") return;

    this.timeLeft -= dt;
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.endGame();
      return;
    }

    this.player.update(dt, keys, this.width, this.height);
    this.fox.update(dt, this.width, this.height);

    // collisions
    if (aabb(this.player, this.goat)) {
      this.score += 10;
      this.goat.spawn(this.width, this.height);
    }

    if (aabb(this.player, this.fox)) {
      this.score = Math.max(0, this.score - 10);
      this.player.reset(this.width / 2, this.height / 2);
    }

    if (this.algarroba.active && aabb(this.player, this.algarroba)) {
      this.score += 20;
      this.algarroba.spawn(this.width, this.height);
    }

    // level progression
    if (this.level === 1 && this.score >= 100) {
      this.level = 2;
      this.fox.speedUp();
      this.algarroba.spawn(this.width, this.height);
      this.algarroba.active = true;
      // trigger screen effect: shake + overlay pulse
      this.screenShake.timeLeft = 1.6;
      this.screenShake.duration = 1.6;
      this.screenShake.magnitude = 8;
      this.overlayPulse.timeLeft = 1.6;
      this.overlayPulse.duration = 1.6;
    }

    // update screen effects timers
    if (this.screenShake.timeLeft > 0) this.screenShake.timeLeft = Math.max(0, this.screenShake.timeLeft - dt);
    if (this.overlayPulse.timeLeft > 0) this.overlayPulse.timeLeft = Math.max(0, this.overlayPulse.timeLeft - dt);
  }

  async endGame() {
    this.state = "gameover";
    // delegate saving to external handler (main.js) which has access to current user
    if (typeof this.onGameOver === "function") {
      try { this.onGameOver(this.score); } catch (e) { console.error(e); }
    }
  }

  draw() {
    // clear
    this.ctx.clearRect(0, 0, this.width, this.height);

    // apply screen shake if active
    let shakeX = 0, shakeY = 0;
    if (this.screenShake.timeLeft > 0) {
      const t = this.screenShake.timeLeft / this.screenShake.duration;
      const mag = this.screenShake.magnitude * t;
      shakeX = (Math.random() * 2 - 1) * mag;
      shakeY = (Math.random() * 2 - 1) * mag;
    }

    this.ctx.save();
    if (shakeX !== 0 || shakeY !== 0) this.ctx.translate(shakeX, shakeY);

    // draw items and entities (shaken)
    this.goat.draw(this.ctx);
    if (this.algarroba.active) this.algarroba.draw(this.ctx);
    this.fox.draw(this.ctx);
    this.player.draw(this.ctx);

    this.ctx.restore();

    // overlay pulse (heat) after restore so HUD not shaken too much
    if (this.overlayPulse.timeLeft > 0) {
      const p = this.overlayPulse.timeLeft / Math.max(0.0001, this.overlayPulse.duration);
      const alpha = 0.12 * p + 0.02 * Math.sin((Date.now() % 500) / 500 * Math.PI * 2);
      this.ctx.save();
      this.ctx.fillStyle = `rgba(217,83,79,${alpha})`;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }

    // ui overlay (not shaken)
    this.ui.drawHUD({ score: this.score, level: this.level, timeLeft: this.timeLeft });

    if (this.state === "gameover") {
      this.ui.drawGameOver(this.score);
    }
  }

}
