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

// פונקציה לתנועת הצינורות ובודקת אם יש פגיעה במכשול
function movePipes() {
  if (gameState !== 'Play') return;

  let pipes = document.querySelectorAll('.pipe_sprite');
  pipes.forEach(function (pipe) {
    let pipePos = pipe.getBoundingClientRect();
    let birdPos = bird.getBoundingClientRect();

    if (pipePos.right <= 0) {
      pipe.remove();
    } else if (
      birdPos.left < pipePos.left + pipePos.width - 10 &&
      birdPos.left + birdPos.width > pipePos.left &&
      birdPos.top < pipePos.top + pipePos.height - 10 &&
      birdPos.top + birdPos.height > pipePos.top
    ) {
      gameState = 'End';
      message.innerHTML = 'Press Enter To Restart';
      clearInterval(gameInterval); // עוצר את המשחק כשמפסידים
    } else {
      if (
        pipePos.right < birdPos.left &&
        pipePos.right + moveSpeed >= birdPos.left &&
        pipe.getAttribute('increase_score') === '1'
      ) {
        scoreVal.innerHTML = parseInt(scoreVal.innerHTML) + 1;
        adjustDifficulty(parseInt(scoreVal.innerHTML));
      }
      pipe.style.left = pipePos.left - moveSpeed + 'px';
    }
  });
}

// פונקציה GRAVITY לציפור
function applyGravity() {
  if (gameState !== 'Play') return;

  birdDy += gravity;

  document.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      birdDy = -15; // קפיצה
    }
  });

  let birdPos = bird.getBoundingClientRect();
  if (birdPos.top <= 0 || birdPos.bottom >= background.bottom) {
    gameState = 'End';
    message.innerHTML = 'Press Enter To Restart';
    clearInterval(gameInterval); // עוצר את המשחק כשמפסידים
  }

  bird.style.top = birdPos.top + birdDy + 'px';
}

// פונקציה ליצר עמודים (מכשולים)
function createPipe() {
  if (gameState !== 'Play') return;

  if (pipeSeparation > 118) {
    pipeSeparation = 0;

    let pipePosition = Math.floor(Math.random() * 43) + 8;

    let topPipe = document.createElement('div');
    topPipe.className = 'pipe_sprite';
    topPipe.style.top = pipePosition - 70 + 'vh';
    topPipe.style.left = '100vw';
    document.body.appendChild(topPipe);

    let bottomPipe = document.createElement('div');
    bottomPipe.className = 'pipe_sprite';
    bottomPipe.style.top = pipePosition + pipeGap + 'vh'; // Set gap based on pipeGap
    bottomPipe.style.left = '100vw';
    bottomPipe.setAttribute('increase_score', '1');
    document.body.appendChild(bottomPipe);
  }

  pipeSeparation++;
}

// פונקציה לרמת הקשה  של משחק לפי הסקור
function adjustDifficulty(score) {
  if (score % 10 === 0) {
    moveSpeed += 1; //  מעלה מהירות
    pipeGap = Math.max(30, pipeGap - 5); // מקטין מרווח בין עמודים אך לא פחות מ 30
  }
//Increase gravity when score reaches or exceeds 70
  if (score >= 70) {
    gravity += 0.1; // Increase gravity by 0.1 when score is 80 or higher
  }
}
