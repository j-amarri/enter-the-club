class Drink {
  constructor(game, col, row) {
    this.game = game;
    this.col = Math.floor(
      Math.random() * (this.game.canvas.width / SQUARE_WIDTH)
    );
    this.row = Math.floor(
      Math.random() * (this.game.canvas.height / SQUARE_WIDTH)
    );
    this.image = new Image();
    this.image.src = '/styles/images/cup_02b.png';
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'green';
    context.drawImage(
      this.image,
      this.col * SQUARE_WIDTH,
      this.row * SQUARE_WIDTH,
      SQUARE_WIDTH,
      SQUARE_WIDTH
    );
    context.restore();
  }
}

class Potion extends Drink {
  constructor(game, col, row) {
    super(game, col, row);
    this.image = new Image();
    this.image.src = '/styles/images/potion_03c.png';
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(
      this.image,
      this.col * SQUARE_WIDTH,
      this.row * SQUARE_WIDTH,
      SQUARE_WIDTH,
      SQUARE_WIDTH
    );
    context.restore();
  }
}
