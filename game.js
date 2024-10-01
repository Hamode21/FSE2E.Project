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
