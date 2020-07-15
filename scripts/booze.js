class Drink {
  constructor(game, col, row) {
    this.game = game;
    this.col = Math.floor(
      Math.random() * (this.game.canvas.width / SQUARE_WIDTH)
    );
    this.row = Math.floor(
      Math.random() * (this.game.canvas.height / SQUARE_WIDTH)
    );
    this.slowspeed = false;
    this.vodkaTimestamp = 10000;
    this.vodkaTimer = 0;
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'green';
    context.fillRect(
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
    this.immunity = false;
    this.potionTimestamp = 10000;
    this.potionTimer = 0;
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'purple';
    context.fillRect(
      this.col * SQUARE_WIDTH,
      this.row * SQUARE_WIDTH,
      SQUARE_WIDTH,
      SQUARE_WIDTH
    );
    context.restore();
  }
}
