class Dancers {
  constructor(game, positionX, positionY, speedX, speedY, radius, color) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = positionY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
  }

  runLogic() {
    if (
      this.positionX + this.radius >= this.game.canvas.width ||
      this.positionX - this.radius <= 0
    ) {
      this.speedX *= -1;
    }

    if (
      this.positionY + this.radius >= this.game.canvas.height ||
      this.positionY - this.radius <= 0
    ) {
      this.speedY *= -1;
    }

    this.positionX += this.speedX;
    this.positionY += this.speedY;
  }

  paint() {
    const context = this.game.context;
    context.save();
    let colors = ['purple', 'red', 'blue', 'lime'];
    context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.restore();
  }
}
