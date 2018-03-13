let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')

let playerOnePaddle = {
    x: 10,
    y: 300,
    height: 70,
    width: 10
}

let playerTwoPaddle = {
    x: canvas.width - 20,
    y: 300,
    height: 70,
    width: 10
}

const drawPlayerOnePaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red'
    ctx.rect(playerOnePaddle.x, playerOnePaddle.y, playerOnePaddle.width, playerOnePaddle.height)
    ctx.fill();
    ctx.closePath;
}

const drawPlayerTwoPaddle = () => {
    ctx.beginPath();
    ctx.fillStyle = 'red'
    ctx.rect(playerTwoPaddle.x, playerTwoPaddle.y, playerTwoPaddle.width, playerTwoPaddle.height)
    ctx.fill();
    ctx.closePath;
}

drawPlayerOnePaddle()
drawPlayerTwoPaddle()