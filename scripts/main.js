window.addEventListener('load', () => {
  const canvasElement = document.getElementById('club');
  const game = new Game(canvasElement);
  game.loop();
});
