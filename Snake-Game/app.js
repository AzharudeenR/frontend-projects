const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreValue');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let started = false;

let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener('keydown', keyPress);

startGame();

function startGame() {
    context.fillStyle = '#212121';
    //fillRect(xstart,ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
    // nextTick();
}

function clearBoard() {
    context.fillStyle = '#212121';
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function createFood() {
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function displayFood() {
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,UNIT,UNIT)
}

function drawSnake() {
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121'
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}

function moveSnake() {
    const head = {
        x:(snake[0].x + xVel),
        y:(snake[0].y + yVel)
    };

    snake.unshift(head);
    if(snake[0].x ==foodX && snake[0].y==foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else
    {
        snake.pop()
    };
};

function nextTick() {
    if(active) {
    setTimeout(() => {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    },300);
}
else {
    clearBoard();
    context.font = 'bold 50px serif';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText('Game Over!!', WIDTH/2, HEIGHT/2)
}
}


function keyPress(event) {
    if(!started) {
        started = true;
        nextTick();
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch(true) {
        //down key pressed and not goin right
        case(event.keyCode==LEFT && xVel != UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        //right key pressed and not goin left
        case(event.keyCode==RIGHT && xVel != -UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        //up key pressed and not goin down
        case(event.keyCode==UP && yVel != UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        //downkey pressed and not goin up
        case(event.keyCode==DOWN && yVel != -UNIT):
            xVel = 0;
            yVel = UNIT;
            break;
    }
}


function checkGameOver() {
    switch(true) {
        case(snake[0].x < 0):
        case(snake[0]).x >= WIDTH:
        case(snake[0]).y < 0:
        case(snake[0]).y >= HEIGHT:
            active = false;
            break;
    }
}