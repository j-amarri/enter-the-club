//const outsideClubAudio = new Audio('/styles/sounds/outside_club.mp3');

window.addEventListener('load', () => {
  const canvasElement = document.getElementById('club');
  const game = new Game(canvasElement);
  //const outsideClubAudio = new Audio('/styles/sounds/outside_club.mp3');

  outsideClubAudio.play();
  game.paintStartScreen();

  //game.loop();
});

// const outsideClubAudioURL = '/styles/sounds/outside_club.mp3';
// const outsideClubAudio = new Audio(outsideClubAudioURL);
// outsideClubAudio.play();

const SQUARE_WIDTH = 30;

// var audio = new Audio(
//   "/styles/sounds/Ebo Taylor, Pat Thomas, Henrik Schwarz - Eye Nyam Nam 'A' Mensuro (Henrik Schwarz Blend).mp3"
// );
// audio.play();
