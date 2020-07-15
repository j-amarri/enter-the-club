class Scoreboard {
  constructor(game) {
    this.game = game;
    this.clubbingTime = 0;
  }

  calculateTime(timestamp) {
    this.clubbingTime = Math.floor(Math.floor(timestamp) / 1000);
  }

  paint(timestamp) {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.fillText(
      'Clubbing time: ' + this.clubbingTime,
      this.game.canvas.width - 200,
      this.game.canvas.height - 30
    );
    context.restore();
  }
}
