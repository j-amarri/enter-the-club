window.addEventListener('load', () => {
  const canvasElement = document.getElementById('club');
  const game = new Game(canvasElement);
  game.loop();
});

const SQUARE_WIDTH = 30;

// var audio = new Audio(
//   "/styles/sounds/Ebo Taylor, Pat Thomas, Henrik Schwarz - Eye Nyam Nam 'A' Mensuro (Henrik Schwarz Blend).mp3"
// );
// audio.play();
