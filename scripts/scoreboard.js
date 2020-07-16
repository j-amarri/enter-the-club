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
    context.font = '18px "Press Start 2P"';
    context.fillText(
      'CLUB TIME: ' + this.clubbingTime,
      this.game.canvas.width - 250,
      this.game.canvas.height - 20
    );
    context.restore();
  }
}
