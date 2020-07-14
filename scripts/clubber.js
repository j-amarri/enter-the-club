class Clubber {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
  }

  moveUp() {
    if (this.row > 0) {
      this.row--;
    }
  }
  moveDown() {
    if (this.row < this.game.canvas.height / 30 - 1) {
      this.row++;
    }
  }

  moveLeft() {
    if (this.col > 0) {
      this.col--;
    }
  }

  moveRight() {
    if (this.col < this.game.canvas.width / 30 - 1) {
      this.col++;
    }
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'white';
    context.fillRect(
      this.col * this.game.SQUARE_WIDTH,
      this.row * this.game.SQUARE_WIDTH,
      this.game.SQUARE_WIDTH,
      this.game.SQUARE_WIDTH
    );
    context.restore();
  }
}
