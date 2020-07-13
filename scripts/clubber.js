class Clubber {
  constructor(game) {
    this.game = game;
    this.col = col;
    this.row = row;
  }

  moveUp() {
    this.row--;
  }

  moveDown() {
    this.row++;
  }

  moveLeft() {
    this.col--;
  }

  moveRight() {
    this.col++;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'white';
    context.fillRect(this.col * 30, this.row * 30, 30, 30);
    context.restore();
  }
}
