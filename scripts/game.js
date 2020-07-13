class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = new Clubber(this, 0, 0);
    this.setKeyBindings();
  }

  setKeyBindings() {
    window.addEventListener('keydown', () => {
      const key = event.key;
      switch (key) {
        case 'ArrowUp':
          event.preventDefault();
          this.player.moveUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.player.moveDown();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.player.moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.player.moveRight();
          break;
      }
    });
  }

  runLogic() {}

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.player.paint();
  }

  loop() {
    this.runLogic();
    this.clean();
    this.paint();
  }
}
