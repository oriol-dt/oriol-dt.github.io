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

function randomObstacleHeight(min, max) {
    let height = Math.round(Math.random() * (max - min) + min);
    document.getElementById("height").textContent = `Altura: ${height}px`;
    return height;
}

let obstacleX = 400;
let obstacleHeight = randomObstacleHeight(15, 35);
let obstacleWidth = 20;
let obstacleSpeed = 5;

let score = 0;
let gameSpeed = 1;
let isGameOver = false;
let scoreTimer = 0;
let gameStarted = false;
let gameInterval;

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

function drawStartMessage() {
    ctx.fillStyle = 'green';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Presiona Espacio para empezar', canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'start';
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
    dinoY = 120;
    obstacleX = 600;
    score = 0;
    gameSpeed = 1;
    isGameOver = false;
    scoreTimer = 0;
    obstacleHeight = randomObstacleHeight(15, 35);
    gameOverDisplay.style.display = 'none';
    gameStarted = true;
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

    if (!isGameOver && gameStarted) {
        scoreTimer++;
        if (scoreTimer % 30 === 0) {
            score++;
        }
        if (score % 500 === 0 && score > 0) {
            gameSpeed += 0.1;
        }
    } else if (!gameStarted) {
        drawStartMessage();
    }

    if (isGameOver) {
        gameOver();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!gameStarted) {
            gameStarted = true;
            gameInterval = setInterval(gameLoop, 20);
        } else if (!isJumping && !isGameOver) {
            isJumping = true;
            dinoSpeedY = 10;
        } else if (isGameOver) {
            resetGame();
        }
    }
});

gameLoop();