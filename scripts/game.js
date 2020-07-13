class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = new Clubber(this, 0, 0);
    this.dancers = [];
    this.deltaStamp = 4000;
    this.timer = 0;
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

  runLogic(timestamp) {
    if (this.timer < timestamp - this.deltaStamp) {
      this.timer = timestamp;
      let dancer = new Dancers(
        this,
        50,
        50,
        Math.floor(Math.random() * 10),
        0.5,
        10,
        'red'
      );
      this.dancers.push(dancer);
    }
    for (let dancer of this.dancers) {
      dancer.runLogic();
    }
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.player.paint();
    for (let dancer of this.dancers) {
      dancer.paint();
    }
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    this.clean();
    this.paint();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }
}
