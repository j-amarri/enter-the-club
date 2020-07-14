class Drink {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'green';
    context.fillRect(
      this.col * this.game.SQUARE_WIDTH,
      this.row * this.game.SQUARE_WIDTH,
      this.game.SQUARE_WIDTH,
      this.game.SQUARE_WIDTH
    );
    context.restore();
  }
}
