// Basic game settings
let moveSpeed = 4; // מהירות ציפור
let gravity = 1; // מהיות נפילה 
let pipeGap = 70;  // המרחק בין העמודים בהתחלה 
let pipeSeparation = 150; // התחלה עם פחות עמודים
let intervalTime = 16; // מהירות קבועה


let bird = document.querySelector('.bird');
let background = document.querySelector('.background').getBoundingClientRect();
let scoreVal = document.querySelector('.score_val');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.score_title');
// מצב התחלתי
let gameState = 'Start';
let birdDy = 0;
let gameInterval; // משתנה עבור setInterval

// פונקציה בודקת אם להחיל את המשחק
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    if (gameState === 'Start' || gameState === 'End') {
      startGame();
    }
  }
});
// איפוס משחק
function resetGame() {
  clearInterval(gameInterval); //עוצר את המשחק אם הוא רץ
  document.querySelectorAll('.pipe_sprite').forEach(function (pipe) {
    pipe.remove();
  });

  bird.style.top = '40vh';
  birdDy = 0;
  gameState = 'Start';
}
// התחלת המשחק
function startGame() {
  resetGame();
  gameState = 'Play';
  message.innerHTML = '';
  scoreTitle.innerHTML = 'Score: ';
  scoreVal.innerHTML = '0';
  moveSpeed = 2;
  pipeGap = 70;  // Reset gap to the initial large gap
  pipeSeparation = 150;
    // מפעיל את המשחק בקצב קבוע
  gameInterval = setInterval(playGame, intervalTime);
}

// Function to run the game logic
function playGame() {
  movePipes();
  applyGravity();
  createPipe();
}

