class Clubber {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
    this.direction = 'down';
    this.charDown = new Image();
    this.charDown.src = '/styles/images/sprite/frente1 copiar.png';
    this.charUp = new Image();
    this.charUp.src = '/styles/images/sprite/costas1 copiar.png';
    this.charLeft = new Image();
    this.charLeft.src = '/styles/images/sprite/outracaminhada3 copiar.png';
    this.charRight = new Image();
    this.charRight.src = '/styles/images/sprite/caminhada3 copiar.png';
  }

  moveUp() {
    if (this.row > 0) {
      this.direction = 'up';
      this.row--;
    }
  }
  moveDown() {
    if (this.row < this.game.canvas.height / 30 - 3) {
      this.row++;
      this.direction = 'down';
    }
  }

  moveLeft() {
    if (this.col >= 0) {
      this.col--;
      this.direction = 'left';
    }
  }

  moveRight() {
    if (this.col < this.game.canvas.width / 30 - 2) {
      this.col++;
      this.direction = 'right';
    }
  }

  paint() {
    if (this.direction === 'down') {
      [];
      const context = this.game.context;
      context.save();
      context.drawImage(
        this.charDown,
        this.col * SQUARE_WIDTH,
        this.row * SQUARE_WIDTH,
        SQUARE_WIDTH * 3,
        SQUARE_WIDTH * 3
      );
      context.restore();
    } else if (this.direction === 'up') {
      const context = this.game.context;
      context.save();
      context.drawImage(
        this.charUp,
        this.col * SQUARE_WIDTH,
        this.row * SQUARE_WIDTH,
        SQUARE_WIDTH * 3,
        SQUARE_WIDTH * 3
      );
      context.restore();
    } else if (this.direction === 'left') {
      const context = this.game.context;
      context.save();
      context.drawImage(
        this.charLeft,
        this.col * SQUARE_WIDTH,
        this.row * SQUARE_WIDTH,
        SQUARE_WIDTH * 3,
        SQUARE_WIDTH * 3
      );
      context.restore();
    } else if (this.direction === 'right') {
      const context = this.game.context;
      context.save();
      context.drawImage(
        this.charRight,
        this.col * SQUARE_WIDTH,
        this.row * SQUARE_WIDTH,
        SQUARE_WIDTH * 3,
        SQUARE_WIDTH * 3
      );
      context.restore();
    }
  }
}
