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
