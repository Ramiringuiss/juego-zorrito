export default class UIManager {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.top5 = [];
  }

  drawHUD({ score = 0, level = 1, timeLeft = 60 } = {}) {
    const ctx = this.ctx;
    ctx.save();

    // background ribbon
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(8, 8, 220, 60);

    // Score
    ctx.fillStyle = "#111";
    ctx.font = "18px Inter, system-ui, sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 6;
    ctx.fillText(`Puntaje: ${score}`, 18, 30);

    // Level
    ctx.fillStyle = "#444";
    ctx.font = "14px Inter, system-ui, sans-serif";
    ctx.fillText(`Nivel actual: ${level}`, 18, 50);

    // Time on right
    ctx.textAlign = "right";
    ctx.fillStyle = "#111";
    ctx.font = "18px Inter, system-ui, sans-serif";
    ctx.fillText(`Tiempo: ${Math.ceil(timeLeft)}s`, this.width - 14, 30);

    ctx.restore();
  }

  drawGameOver(finalScore) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "36px Inter, system-ui, sans-serif";
    ctx.fillText("Juego Terminado", this.width / 2, this.height / 2 - 40);

    ctx.font = "20px Inter, system-ui, sans-serif";
    ctx.fillText(`Puntaje final: ${finalScore}`, this.width / 2, this.height / 2);

    // draw top5 on canvas if available
    if (this.top5 && this.top5.length > 0) {
      ctx.font = "16px Inter, system-ui, sans-serif";
      ctx.textAlign = "left";
      const startX = this.width / 2 - 140;
      let y = this.height / 2 + 40;
      ctx.fillText("Top 5:", startX, y);
      y += 22;
      this.top5.forEach((p, idx) => {
        const txt = `${idx + 1}. ${p.nombre} — ${p.puntaje} pts`;
        ctx.fillText(txt, startX, y);
        y += 20;
      });
    }

    ctx.restore();
  }

  showTop5(list) {
    this.top5 = list.map(item => ({ nombre: item.nombre || '—', puntaje: item.puntaje || 0 }));
  }
}
