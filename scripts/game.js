class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = new Clubber(this, 0, 0);
    this.scoreboard = new Scoreboard(this);

    // Dancers variables
    this.dancers = [];
    this.deltaStamp = 5000;
    this.timer = 0;

    this.running = true;

    // Drink variables
    this.vodka = 0;
    this.vodkaTimestampStart = 10000;
    this.vodkaTimerStart = 0;
    this.slowspeed = false;
    this.vodkaTimestampLength = 10000;
    this.vodkaTimer = 0;

    // Potion variables
    this.potion = 0;
    this.immunity = false;
    this.potionTimestamp = 10000;
    this.potionTimer = 0;
    this.immunityTimestampStart = 30000;
    this.immunityTimer = 0;

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
      if (
        dancerX === this.player.col &&
        dancerY === this.player.row &&
        !this.immunity
      ) {
        this.running = false;
        //clearInterval();
        window.location.reload();
      }
    }
  }

  createVodka() {
    this.vodka = new Drink(this);
  }

  findVodka() {
    if (
      this.player.col === this.vodka.col &&
      this.player.row === this.vodka.row
    ) {
      for (let dancer of this.dancers) {
        dancer.speedX *= 0.5;
        dancer.speedY *= 0.5;
      }
      this.vodka = 0;
      this.slowspeed = true;
    }
  }

  paintDrinkMessage() {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '24px Arial';
    this.context.fillText('You got a drink!', 20, 20);
    this.context.restore();
  }

  createPotion() {
    this.potion = new Potion(this);
  }

  findPotion() {
    if (
      this.player.col === this.potion.col &&
      this.player.row === this.potion.row
    ) {
      this.potion = 0;
      this.immunity = true;
    }
  }

  paintPotionMessage() {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '24px Arial';
    this.context.fillText('You are immune!', 20, 20);
    this.context.restore();
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

    // Logic to create a drink
    if (this.vodkaTimerStart === 0 && timestamp) {
      this.vodkaTimerStart = timestamp;
    }
    if (this.vodkaTimerStart < timestamp - this.vodkaTimestampStart) {
      this.createVodka();
      this.vodkaTimerStart = timestamp;
    }

    // Logic to create a potion
    if (this.immunityTimer === 0 && timestamp) {
      this.immunityTimer = timestamp;
    }
    if (this.immunityTimer < timestamp - this.immunityTimestampStart) {
      this.createPotion();
      this.immunityTimer = timestamp;
    }

    // When user takes a booze, logic is described below
    if (!this.slowspeed) {
      this.vodkaTimer = timestamp;
    }

    if (this.slowspeed) {
      if (this.vodkaTimer < timestamp - this.vodkaTimestampLength) {
        for (let dancer of this.dancers) {
          dancer.speedX *= 1.5;
          dancer.speedY *= 1.5;
          this.slowspeed = false;
        }
      }
    }
    this.findVodka();

    // When user takes a immunity potion, logic below
    if (!this.immunity) {
      this.potionTimer = timestamp;
    }
    if (this.immunity) {
      if (this.potionTimer < timestamp - this.potionTimestamp) {
        this.immunity = false;
      }
    }
    this.findPotion();

    // Scoreboard logic
    this.scoreboard.calculateTime(timestamp);
  }

  // Clean method
  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Paint method
  paint() {
    this.player.paint();
    this.scoreboard.paint();
    for (let dancer of this.dancers) {
      dancer.paint();
    }
    if (this.vodka !== 0) {
      this.vodka.paint();
    }
    if (this.potion !== 0) {
      this.potion.paint();
    }
    if (this.slowspeed) {
      this.paintDrinkMessage();
    }
    if (this.immunity) {
      this.paintPotionMessage();
    }
  }

  // Lose game method
  lose() {
    //clearInterval();
    //window.location.reload();
  }

  // Loop method
  loop(timestamp) {
    this.runLogic(timestamp);
    this.clean();
    this.paint();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }
}
