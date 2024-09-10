// Basic game settings
let moveSpeed = 2;
let gravity = 0.5;
let pipeGap = 45;
let pipeSeparation = 150;
let bird = document.querySelector('.bird');
let background = document.querySelector('.background').getBoundingClientRect();
let scoreVal = document.querySelector('.score_val');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.score_title');

let gameState = 'Start';
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    if (gameState === 'Start' || gameState === 'End') {
      startGame();
    }
  }
});
function resetGame() {
  document.querySelectorAll('.pipe_sprite').forEach(function (pipe) {
    pipe.remove();
  });

  bird.style.top = '40vh';
  birdDy = 0;
  gameState = 'Start';
}
function startGame() {
  resetGame();
  gameState = 'Play';
  message.innerHTML = '';
  scoreTitle.innerHTML = 'Score: ';
  scoreVal.innerHTML = '0';
  moveSpeed = 2;
  pipeGap = 45;
  pipeSeparation = 150;
  playGame();
}
