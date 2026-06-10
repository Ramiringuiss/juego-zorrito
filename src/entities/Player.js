export default class Player {
  constructor(x = 0, y = 0) {
    this.size = 48; // hitbox size
    this.x = x - this.size / 2;
    this.y = y - this.size / 2;
    this.speed = 220; // px/s
    this.emoji = "👨🏽‍🌾";
  }

  reset(x, y) {
    this.x = x - this.size / 2;
    this.y = y - this.size / 2;
  }

  update(dt, keys, width, height) {
    let dx = 0, dy = 0;
    if (keys["ArrowLeft"] || keys["a"]) dx -= 1;
    if (keys["ArrowRight"] || keys["d"]) dx += 1;
    if (keys["ArrowUp"] || keys["w"]) dy -= 1;
    if (keys["ArrowDown"] || keys["s"]) dy += 1;

    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy) || 1;
      this.x += (dx / len) * this.speed * dt;
      this.y += (dy / len) * this.speed * dt;
    }

    // keep inside
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.size > width) this.x = width - this.size;
    if (this.y + this.size > height) this.y = height - this.size;
  }

  draw(ctx) {
    // draw hitbox lightly for debug
    // ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.strokeRect(this.x,this.y,this.size,this.size);

    // Draw emoji centered
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${this.size}px serif`;
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 6;
    ctx.fillText(this.emoji, this.x + this.size / 2, this.y + this.size / 2 + 2);
    ctx.restore();
  }
}
