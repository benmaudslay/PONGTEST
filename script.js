let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')



let playerOneMoveUp = false;
let playerOneMoveDown = false;
let playerTwoMoveDown = false;
let playerTwoMoveUp = false;


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

const drawPlayerOnePaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerOnePaddle.x, playerOnePaddle.y, playerOnePaddle.width, playerOnePaddle.height);
    ctx.fill();
    ctx.closePath;
    if (playerOneMoveUp == true) {
        playerOnePaddle.y += 3;
    } else if (playerOneMoveDown == true) {
        playerOnePaddle.y -=3
    }
};

const drawPlayerTwoPaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerTwoPaddle.x, playerTwoPaddle.y, playerTwoPaddle.width, playerTwoPaddle.height);
    ctx.fill();
    ctx.closePath;
    if (playerTwoMoveUp == true) {
        playerTwoPaddle.y += 3;
    } else if (playerTwoMoveDown == true) {
        playerTwoPaddle.y -=3
    }
};

const playerKeyDownHandlers = (e) => {
    if (e.keyCode == 40) {
        playerOneMoveUp = true;
    } else if (e.keyCode == 38) {
        playerOneMoveDown = true;
    }
    if (e.keyCode == 83) {
        playerTwoMoveUp = true;
    } else if (e.keyCode == 87) {
        playerTwoMoveDown = true;
    }
};

const playerKeyUpHandlers = (e) => {
    if (e.keyCode == 40) {
        playerOneMoveUp = false;
    } else if (e.keyCode == 38) {
        playerOneMoveDown = false;
    };
    if (e.keyCode == 83) {
        playerTwoMoveUp = false;
    } else if (e.keyCode == 87) {
        playerTwoMoveDown = false;
    };
};


document.addEventListener("keydown", playerKeyDownHandlers, false);
document.addEventListener("keyup", playerKeyUpHandlers, false);

drawPlayerOnePaddle();
drawPlayerTwoPaddle();

const drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayerOnePaddle();
    drawPlayerTwoPaddle();
}

let game = setInterval(drawGame, 10)