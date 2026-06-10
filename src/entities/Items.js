export class Goat {
  constructor(canvasWidth = 600, canvasHeight = 400) {
    this.size = 34;
    this.x = 0;
    this.y = 0;
    this.emoji = "🐐";
    this.spawn(canvasWidth, canvasHeight);
  }

  spawn(w, h) {
    this.x = Math.floor(Math.random() * (w - this.size - 10)) + 5;
    this.y = Math.floor(Math.random() * (h - this.size - 10)) + 5;
  }

  draw(ctx) {
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.emoji, this.x + this.size / 2, this.y + this.size / 2 + 2);
    ctx.restore();
  }
}

export class Algarroba {
  constructor(canvasWidth = 600, canvasHeight = 400) {
    this.size = 36;
    this.x = -100;
    this.y = -100;
    this.emoji = "🌾";
    this.active = false;
  }

  spawn(w, h) {
    this.x = Math.floor(Math.random() * (w - this.size - 10)) + 5;
    this.y = Math.floor(Math.random() * (h - this.size - 10)) + 5;
    this.active = true;
  }

  draw(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.emoji, this.x + this.size / 2, this.y + this.size / 2 + 2);
    ctx.restore();
  }
}
