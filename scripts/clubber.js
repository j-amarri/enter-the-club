class Clubber {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
    this.direction = 'down';
    this.spriteSpeed = 200;

    // Sprite image down
    this.charDown = new Image();
    this.charDown.src = '/styles/images/sprite/frente1_copiar.png';
    this.charDown1 = new Image();
    this.charDown1.src = '/styles/images/sprite/frente2.png';
    this.charMovingDown = [this.charDown, this.charDown1];
    this.charMovingDownTimer = 0;
    this.arrayNum = 0;

    // Sprite images right
    this.charRight = new Image();
    this.charRight.src = '/styles/images/sprite/caminhada2 copiar.png';
    this.charRight1 = new Image();
    this.charRight1.src = '/styles/images/sprite/caminhada3 copiar.png';
    this.charRight2 = new Image();
    this.charRight2.src = '/styles/images/sprite/caminhada4 copiar.png';
    this.charRight3 = new Image();
    this.charRight3.src = '/styles/images/sprite/caminhada5 copiar.png';
    this.charRight4 = new Image();
    this.charRight4.src = '/styles/images/sprite/caminhada6 copiar.png';
    this.charRight5 = new Image();
    this.charRight5.src = '/styles/images/sprite/caminhada7 copiar.png';
    this.charRight6 = new Image();
    this.charRight6.src = '/styles/images/sprite/caminhada8 copiar.png';
    this.charRight7 = new Image();
    this.charRight7.src = '/styles/images/sprite/caminhada9 copiar.png';
    this.charRight8 = new Image();
    this.charRight8.src = '/styles/images/sprite/caminhada10 copiar.png';
    this.charMovingRight = [
      this.charRight,
      this.charRight1,
      this.charRight2,
      this.charRight3,
      this.charRight4,
      this.charRight5,
      this.charRight6,
      this.charRight7,
      this.charRight8
    ];
    this.charMovingRightTimer = 0;
    this.arrayRight = 0;

    // Sprite images left
    this.charLeft = new Image();
    this.charLeft.src = '/styles/images/sprite/outracaminhada2 copiar.png';
    this.charLeft1 = new Image();
    this.charLeft1.src = '/styles/images/sprite/outracaminhada3 copiar.png';
    this.charLeft2 = new Image();
    this.charLeft2.src = '/styles/images/sprite/outracaminhada4 copiar.png';
    this.charLeft3 = new Image();
    this.charLeft3.src = '/styles/images/sprite/outracaminhada5 copiar.png';
    this.charLeft4 = new Image();
    this.charLeft4.src = '/styles/images/sprite/outracaminhada6 copiar.png';
    this.charLeft5 = new Image();
    this.charLeft5.src = '/styles/images/sprite/outracaminhada7 copiar.png';
    this.charLeft6 = new Image();
    this.charLeft6.src = '/styles/images/sprite/outracaminhada8 copiar.png';
    this.charLeft7 = new Image();
    this.charLeft7.src = '/styles/images/sprite/outracaminhada9 copiar.png';
    this.charLeft8 = new Image();
    this.charLeft8.src = '/styles/images/sprite/outracaminhada10 copiar.png';
    this.charMovingLeft = [
      this.charLeft,
      this.charLeft1,
      this.charLeft2,
      this.charLeft3,
      this.charLeft4,
      this.charLeft5,
      this.charLeft6,
      this.charLeft7,
      this.charLeft8
    ];
    this.charMovingLeftTimer = 0;
    this.arrayLeft = 0;

    this.charUp = new Image();
    this.charUp.src = '/styles/images/sprite/costas1 copiar.png';
    //this.charLeft = new Image();
    //this.charLeft.src = '/styles/images/sprite/outracaminhada3 copiar.png';
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

  paint(timestamp) {
    if (this.direction === 'down') {
      if (this.charMovingDownTimer < timestamp - this.spriteSpeed) {
        this.charMovingDownTimer = timestamp;
        this.arrayNum = this.arrayNum === 0 ? 1 : 0;
      }
      const context = this.game.context;
      context.save();
      context.drawImage(
        this.charMovingDown[this.arrayNum],
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
      if (this.charMovingLeftTimer < timestamp - this.spriteSpeed) {
        this.charMovingLeftTimer = timestamp;
        this.arrayLeft = this.arrayLeft === 0 ? 1 : 0;
      }
      const context = this.game.context;
      context.save();
      context.drawImage(
        this.charMovingLeft[this.arrayLeft],
        this.col * SQUARE_WIDTH,
        this.row * SQUARE_WIDTH,
        SQUARE_WIDTH * 3,
        SQUARE_WIDTH * 3
      );
      context.restore();
    } else if (this.direction === 'right') {
      if (this.charMovingRightTimer < timestamp - this.spriteSpeed) {
        this.charMovingRightTimer = timestamp;
        this.arrayRight = this.arrayRight === 0 ? 1 : 0;
      }
      const context = this.game.context;
      context.save();
      context.drawImage(
        this.charMovingRight[this.arrayRight],
        this.col * SQUARE_WIDTH,
        this.row * SQUARE_WIDTH,
        SQUARE_WIDTH * 3,
        SQUARE_WIDTH * 3
      );
      context.restore();
    }
  }
}
