class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.SQUARE_WIDTH = 30;
    this.player = new Clubber(this, 0, 0);
    this.randomColumn = Math.floor(
      Math.random() * (this.canvas.width / this.SQUARE_WIDTH)
    );
    this.randomRow = Math.floor(
      Math.random() * (this.canvas.height / this.SQUARE_WIDTH)
    );
    this.vodka = new Drink(this, this.randomColumn, this.randomRow);
    this.dancers = [];
    this.deltaStamp = 5000;
    this.timer = 0;
    // Booze varibals
    this.slowspeed = false;
    this.boozeTimestamp = 10000;
    this.boozeTimer = 0;
    //

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

  checkClubberCollision() {
    for (let i = 0; i < this.dancers.length; i++) {
      let dancerX = Math.floor(this.dancers[i].positionX / 30);
      let dancerY = Math.floor(this.dancers[i].positionY / 30);
      if (dancerX === this.player.col && dancerY === this.player.row) {
        this.lose();
      }
    }
  }

  findBoozes() {
    if (
      this.player.col === this.vodka.col &&
      this.player.row === this.vodka.row
    ) {
      for (let dancer of this.dancers) {
        console.log(dancer.speedX);
        dancer.speedX *= 0.5;
        console.log(dancer.speedX);
        dancer.speedY *= 0.5;
      }
      this.vodka = 0;
      this.slowspeed = true;
    }
  }

  runLogic(timestamp) {
    if (this.timer < timestamp - this.deltaStamp) {
      this.timer = timestamp;
      let dancer = new Dancers(
        this,
        Math.floor(Math.random() * 800),
        Math.floor(Math.random() * 400),
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 5),
        10,
        'red'
      );
      this.dancers.push(dancer);
    }
    for (let dancer of this.dancers) {
      dancer.runLogic();
    }
    this.checkClubberCollision();

    // When user takes a booze, logic is described below
    if (!this.slowspeed) {
      this.boozeTimer = timestamp;
    }

    if (this.slowspeed) {
      if (this.boozeTimer < timestamp - this.boozeTimestamp) {
        console.log('aline');
        for (let dancer of this.dancers) {
          dancer.speedX *= 1.5;
          dancer.speedY *= 1.5;
          this.slowspeed = false;
        }
      }
    }
    this.findBoozes();
  }

  // Clean method
  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Paint method
  paint() {
    this.player.paint();
    for (let dancer of this.dancers) {
      dancer.paint();
    }
    if (this.vodka !== 0) {
      this.vodka.paint();
    }
  }

  // Lose game method
  lose() {
    //this.running = false;
    clearInterval();
    window.location.reload();
  }

  // Loop method
  loop(timestamp) {
    this.runLogic(timestamp);
    this.clean();
    this.paint();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }
}
