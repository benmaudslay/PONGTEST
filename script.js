let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')

let playerOneMoveUP = false;
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
};

const drawPlayerTwoPaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(playerTwoPaddle.x, playerTwoPaddle.y, playerTwoPaddle.width, playerTwoPaddle.height);
    ctx.fill();
    ctx.closePath;
};

function playerOneKeyDownHandler(e) {
    if (e.keyCode == 38) {
        playerOneMoveUP = true;
    } else if (e.keyCode == 40) {
        playerOneMoveDown = true;
    }
};
//Function to make our ship move left or right when the corresponding key is pressed
function playerOneKeyUpHandler(e) {
    if (e.keyCode == 39) {
        playerOneMoveUP = false;
    } else if (e.keyCode == 37) {
        playerOneMoveUP = false;
    };
};

drawPlayerOnePaddle();
drawPlayerTwoPaddle();