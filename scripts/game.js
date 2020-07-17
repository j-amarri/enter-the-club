class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = new Clubber(this, 0, 0);
    this.scoreboard = new Scoreboard(this);
    this.running = false;
    this.gameStarted = false;
    this.startingTime = 0;

    // Dancers variables
    this.dancers = [];
    this.deltaStamp = 5000;
    this.timer = 0;

    // Drink variables
    this.vodka = 0;
    this.vodkaTimestampStart = 5000;
    this.vodkaTimerStart = 0;
    this.slowspeed = false;
    this.vodkaTimestampLength = 5000;
    this.vodkaTimer = 0;

    // Potion variables
    this.potion = 0;
    this.immunity = false;
    this.potionTimestamp = 5000;
    this.potionTimer = 0;
    this.immunityTimestampStart = 20000;
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
        case 'Enter':
          event.preventDefault();
          this.running = true;

          // Audio handling
          outsideClubAudio.pause();
          outsideClubAudio.currentTime = 0;
          songAnna.play();

          // Display DJ set
          const vinylSet = document.getElementById('hide');
          vinylSet.style.display = 'flex';

          // Start game
          this.gameStarted = true;
          this.loop();
          break;
        case 's':
          event.preventDefault();
          window.location.reload();
          break;
      }
    });
  }

  checkClubberCollision() {
    for (let i = 0; i < this.dancers.length; i++) {
      let dancerX = Math.floor(this.dancers[i].positionX / SQUARE_WIDTH);
      let dancerY = Math.floor(this.dancers[i].positionY / SQUARE_WIDTH);
      if (
        dancerX < this.player.col + 3 &&
        dancerX + 1 > this.player.col &&
        dancerY < this.player.row + 3 &&
        dancerY + 1 > this.player.row &&
        !this.immunity
      ) {
        this.running = false;
        const vinylSet = document.getElementById('hide');
        vinylSet.style.display = 'none';
        songAnna.volume = 0.3;
      }
    }
  }

  createVodka() {
    this.vodka = new Drink(this);
  }

  findVodka() {
    if (
      this.vodka.col < this.player.col + 3 &&
      this.vodka.col + 1 > this.player.col &&
      this.vodka.row < this.player.row + 3 &&
      this.vodka.row + 1 > this.player.row
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
    this.context.font = '18px "Press Start 2P"';
    this.context.fillText('You got smoothness!', 20, 30);
    this.context.restore();
  }

  createPotion() {
    this.potion = new Potion(this);
  }

  findPotion() {
    if (
      this.potion.col < this.player.col + 3 &&
      this.potion.col + 1 > this.player.col &&
      this.potion.row < this.player.row + 3 &&
      this.potion.row + 1 > this.player.row
    ) {
      this.potion = 0;
      this.immunity = true;
    }
  }

  paintPotionMessage() {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px "Press Start 2P"';
    this.context.fillText('You are immune!', 20, 30);
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
        20,
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
    this.scoreboard.calculateTime(timestamp - this.startingTime);
  }

  // Clean method
  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Paint method
  paintStartScreen() {
    this.context.save();
    this.context.font = '24px "Press Start 2P"';
    this.context.fillStyle = 'white';
    this.context.fillText('RULES OF CONDUCT', 50, 100);
    let charsDown = new Image();
    charsDown.src = '/styles/images/sprite/frente2.png';
    charsDown.addEventListener('load', event => {
      this.context.drawImage(charsDown, 600, 50, 150, 150);
    });
    this.context.font = '14px "Press Start 2P"';
    this.context.fillText('* Keep distance from clubbers', 50, 150);
    this.context.fillText('* Take 🧪 for immunity', 50, 200);
    this.context.fillText('* Take 🍷 for smoothness', 50, 250);
    this.context.fillText('* ENJOY club as much as you can!', 50, 300);
    /* let keyboard = new Image();
    keyboard.src = '/styles/images/keyboard-arrow.png';
    keyboard.addEventListener('load', event => {
      this.context.drawImage(keyboard, 600, 50, 150, 150);
    }); */
    this.context.fillStyle = '#fc583a';
    this.context.font = '18px "Press Start 2P"';
    this.context.fillText('- Press enter to start -', 50, 450);
    this.context.restore();
  }

  paintEndGame() {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '32px "Press Start 2P"';
    this.context.fillText('You have been', 50, 100);
    this.context.fillText('infected!', 50, 150);
    this.context.font = '18px "Press Start 2P"';
    this.context.fillText('You have been clubbing for', 50, 200);
    this.context.fillStyle = '#fc583a';
    this.context.font = '64px "Press Start 2P"';
    this.context.fillText(this.scoreboard.clubbingTime + ' secs', 50, 300);
    let charSad = new Image();
    charSad.src = '/styles/images/sprite/frente3 copiar.png';
    charSad.addEventListener('load', event => {
      this.context.drawImage(charSad, 600, 50, 150, 150);
    });
    this.context.font = '18px "Press Start 2P"';
    this.context.fillText('- Press S to go on line again -', 50, 450);
    this.context.restore();
  }

  paint(timestamp) {
    if (this.running === false) {
      this.paintEndGame();
    } else {
      this.player.paint(timestamp);
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
  }

  // Loop method
  loop(timestamp) {
    this.runLogic(timestamp);
    this.clean();
    if (this.gameStarted && timestamp) {
      this.startingTime = timestamp;
      this.gameStarted = false;
    }
    if (this.running) {
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
    this.paint(timestamp);
  }
}
