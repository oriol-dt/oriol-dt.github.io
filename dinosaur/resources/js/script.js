const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');

let dinoX = 50;
let dinoY = 120;
let dinoHeight = 30;
let dinoWidth = 30;
let dinoSpeedY = 0;
let gravity = 1;
let isJumping = false;

let obstacleX = 600;
let obstacleHeight = 40;
let obstacleWidth = 20;
let obstacleSpeed = 5;

let score = 0;
let gameSpeed = 1;
let isGameOver = false;

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);
}

function drawObstacle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacleX, canvas.height - obstacleHeight, obstacleWidth, obstacleHeight);
}

function drawScore() {
    scoreDisplay.textContent = `Puntuación: ${Math.floor(score)}`;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateDino() {
    if (isJumping) {
        dinoY -= dinoSpeedY;
        dinoSpeedY -= gravity;
        if (dinoY >= 120) {
            dinoY = 120;
            isJumping = false;
            dinoSpeedY = 0;
        }
    }
}

function updateObstacle() {
    obstacleX -= obstacleSpeed * gameSpeed;
    if (obstacleX < -obstacleWidth) {
        obstacleX = canvas.width + Math.random() * 200;
        score += 10;
        if (score % 100 === 0) {
            gameSpeed += 0.1;
        }
    }
}

function checkCollision() {
    if (dinoX < obstacleX + obstacleWidth &&
        dinoX + dinoWidth > obstacleX &&
        dinoY < canvas.height &&
        dinoY + dinoHeight > canvas.height - obstacleHeight) {
        isGameOver = true;
    }
}

function gameOver() {
    clearInterval(gameInterval);
    gameOverDisplay.style.display = 'block';
}

function resetGame() {
    dinoY = 100;
    obstacleX = 600;
    score = 0;
    gameSpeed = 1;
    isGameOver = false;
    gameOverDisplay.style.display = 'none';
    gameInterval = setInterval(gameLoop, 20);
}

function gameLoop() {
    clearCanvas();
    updateDino();
    updateObstacle();
    drawDino();
    drawObstacle();
    drawScore();
    checkCollision();

    if (isGameOver) {
        gameOver();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        isJumping = true;
        dinoSpeedY = 15;
    } else if (event.code === 'Space' && isGameOver) {
        resetGame();
    }
});

let gameInterval = setInterval(gameLoop, 20); // Ejecutar el bucle del juego cada 20 milisegundos (50 FPS)