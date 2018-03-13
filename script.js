let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')

let playerOnePaddle = {
    x: 10,
    y: 300,
    height: 70
}

const drawPlayerOnePaddle = () => {
    ctx.beginPath();
    ctx.fillstyle = 'red'
    ctx.moveTo(10, 300);
    ctx.lineTo(10, 370);
    ctx.stroke();
    ctx.closePath();
}

drawPlayerOnePaddle()