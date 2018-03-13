let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')

let playerOnePaddle = {
    x: 10,
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

drawPlayerOnePaddle()