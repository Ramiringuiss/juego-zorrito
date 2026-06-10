export class Fox {
  constructor(x = 0, y = 0) {
    this.size = 44;
    this.x = x;
    this.y = y;
    this.vx = 120 * (Math.random() < 0.5 ? -1 : 1);
    this.vy = 90 * (Math.random() < 0.5 ? -1 : 1);
    this.emoji = "🦊";
    this.trail = [];
    this.trailActive = false;
    this._trailTimer = 0;
  }

  update(dt, width, height) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.x <= 0) { this.x = 0; this.vx *= -1; }
    if (this.y <= 0) { this.y = 0; this.vy *= -1; }
    if (this.x + this.size >= width) { this.x = width - this.size; this.vx *= -1; }
    if (this.y + this.size >= height) { this.y = height - this.size; this.vy *= -1; }

    // Trail generation when active
    if (this.trailActive) {
      // Emit a trail particle every ~0.03s
      this._trailTimer += dt;
      const emitInterval = 0.03;
      while (this._trailTimer >= emitInterval) {
        this._trailTimer -= emitInterval;
        this.trail.push({
          x: this.x + this.size / 2,
          y: this.y + this.size / 2,
          life: 0.6,
          size: this.size * 0.5,
          alpha: 0.9
        });
      }
    }

    // update trail particles
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i];
      p.life -= dt;
      p.alpha = Math.max(0, p.life / 0.6);
      p.size *= 0.995;
      if (p.life <= 0) this.trail.splice(i, 1);
    }
  }

  speedUp() {
    const signX = Math.sign(this.vx) || 1;
    const signY = Math.sign(this.vy) || 1;
    this.vx = signX * (Math.abs(this.vx) + 80);
    this.vy = signY * (Math.abs(this.vy) + 80);
    // enable visual trail when fox speeds up
    this.trailActive = true;
  }

  draw(ctx) {
    // draw trail first (fading circles)
    if (this.trail && this.trail.length) {
      for (let i = 0; i < this.trail.length; i++) {
        const p = this.trail[i];
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.alpha * 0.9);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grd.addColorStop(0, 'rgba(217,83,79,0.9)');
        grd.addColorStop(0.6, 'rgba(217,83,79,0.4)');
        grd.addColorStop(1, 'rgba(217,83,79,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${this.size}px serif`;
    ctx.shadowColor = "rgba(0,0,0,0.18)";
    ctx.shadowBlur = 4;
    ctx.fillText(this.emoji, this.x + this.size / 2, this.y + this.size / 2 + 2);
    ctx.restore();
  }
}
