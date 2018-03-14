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
    if (playerOneMoveUp == true && playerOnePaddle.y >= 0) {
        playerOnePaddle.y -= 3;
    } else if (playerOneMoveDown == true && playerOnePaddle.y + playerOnePaddle.height <= canvas.height) {
        playerOnePaddle.y +=3
    }
};

const drawPlayerTwoPaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerTwoPaddle.x, playerTwoPaddle.y, playerTwoPaddle.width, playerTwoPaddle.height);
    ctx.fill();
    ctx.closePath;
    if (playerTwoMoveUp == true && playerTwoPaddle.y >= 0) {
        playerTwoPaddle.y -= 3;
    } else if (playerTwoMoveDown == true && playerTwoPaddle.y + playerTwoPaddle.height <= canvas.height) {
        playerTwoPaddle.y +=3
    }
};

const playerKeyDownHandlers = (e) => {
    if (e.keyCode == 38) {
        playerOneMoveUp = true;
    } else if (e.keyCode == 40) {
        playerOneMoveDown = true;
    }
    if (e.keyCode == 87) {
        playerTwoMoveUp = true;
    } else if (e.keyCode == 83) {
        playerTwoMoveDown = true;
    }
};

const playerKeyUpHandlers = (e) => {
    if (e.keyCode == 38) {
        playerOneMoveUp = false;
    } else if (e.keyCode == 40) {
        playerOneMoveDown = false;
    };
    if (e.keyCode == 87) {
        playerTwoMoveUp = false;
    } else if (e.keyCode == 83) {
        playerTwoMoveDown = false;
    };
};


document.addEventListener("keydown", playerKeyDownHandlers, false);
document.addEventListener("keyup", playerKeyUpHandlers, false);


const drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayerOnePaddle();
    drawPlayerTwoPaddle();
}

let game = setInterval(drawGame, 10)