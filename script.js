let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')


//Declare all golbal variables here
let playerOneMoveUp = false;
let playerOneMoveDown = false;
let playerTwoMoveDown = false;
let playerTwoMoveUp = false;

//Player paddle objects
let playerOnePaddle = {
    x: 10,
    y: 300,
    height: 70,
    width: 10
};

let playerTwoPaddle = {
    x: canvas.width - 20,
    y: 300,
    height: 70,
    width: 10
};

let pongBall ={
    x: 400,
    y:300,
    radius: 5,
    moveX: 3,
    moveY: 3,
}


//Draws the Player 1 Paddle at the appropriate position, also contains the movement limiters to stop it going of the screen
const drawPlayerOnePaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerOnePaddle.x, playerOnePaddle.y, playerOnePaddle.width, playerOnePaddle.height);
    ctx.fill();
    ctx.closePath();
    if (playerOneMoveUp == true && playerOnePaddle.y >= 0) {
        playerOnePaddle.y -= 3;
    } else if (playerOneMoveDown == true && playerOnePaddle.y + playerOnePaddle.height <= canvas.height) {
        playerOnePaddle.y +=3;
    }
};
//Draws the Player 2 Paddle at the appropriate position, also contains the movement limiters to stop it going of the screen
const drawPlayerTwoPaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerTwoPaddle.x, playerTwoPaddle.y, playerTwoPaddle.width, playerTwoPaddle.height);
    ctx.fill();
    ctx.closePath();
    if (playerTwoMoveUp == true && playerTwoPaddle.y >= 0) {
        playerTwoPaddle.y -= 3;
    } else if (playerTwoMoveDown == true && playerTwoPaddle.y + playerTwoPaddle.height <= canvas.height) {
        playerTwoPaddle.y +=3;
    }
};

const drawPongBall = () => {
    ctx.beginPath();
    ctx.arc(pongBall.x, pongBall.y, pongBall.radius, 0, 2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}


//Key Handlers to move paddles when key are down and stops movemewnt when key is released
const playerKeyDownHandlers = (e) => {
    if (e.keyCode == 87) {
        playerOneMoveUp = true;
    } else if (e.keyCode == 83) {
        playerOneMoveDown = true;
    }
    if (e.keyCode == 38) {
        playerTwoMoveUp = true;
    } else if (e.keyCode == 40) {
        playerTwoMoveDown = true;
    }
};

const playerKeyUpHandlers = (e) => {
    if (e.keyCode == 87) {
        playerOneMoveUp = false;
    } else if (e.keyCode == 83) {
        playerOneMoveDown = false;
    };
    if (e.keyCode == 38) {
        playerTwoMoveUp = false;
    } else if (e.keyCode == 40) {
        playerTwoMoveDown = false;
    };
};

//Calling our key handlers on our document
document.addEventListener("keydown", playerKeyDownHandlers, false);
document.addEventListener("keyup", playerKeyUpHandlers, false);


//Basic drawGame function and interval, set for change to integrate menus 
const drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayerOnePaddle();
    drawPlayerTwoPaddle();
    drawPongBall();
}

let game = setInterval(drawGame, 10);