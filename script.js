let canvas = document.getElementById('pongCanvas')
let ctx = canvas.getContext('2d')

//Declare all golbal variables here
let playerOneMoveUp = false;
let playerOneMoveDown = false;
let playerTwoMoveDown = false;
let playerTwoMoveUp = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneReady = false;
let playerTwoReady = false;

//Player paddle objects
let playerOnePaddle = {
    x: 10,
    y: 265,
    height: 70,
    width: 10
};

let playerTwoPaddle = {
    x: canvas.width - 20,
    y: 265,
    height: 70,
    width: 10
};

//Ball object
let pongBall = {
    x: 400,
    y: 300,
    radius: 5,
    moveX: 0,
    moveY: 0,
    speed: 2.75
}

const calculateSpeed = (moveY) => {
    pongBall.moveX = Math.sqrt(Math.pow(pongBall.speed, 2) - Math.pow(moveY, 2))
}

const moveStartDirection = () => {
    pongBall.x = 400;
    pongBall.y = 300;
    var startDirectionY = Math.floor(Math.random() * 2) + 1;
    var startAdjustmentY = Math.floor(Math.random() * 5) + 1;
    //Determines the start angle for Y 
    if (startAdjustmentY == 1) {
        pongBall.moveY = 0.3;
    } else if (startAdjustmentY == 2) {
        pongBall.moveY = 0.6;
    } else if (startAdjustmentY == 3) {
        pongBall.moveY = 0.9;
    } else if (startAdjustmentY == 4) {
        pongBall.moveY = 1.2;
    } else if (startAdjustmentY == 5) {
        pongBall.moveY = 1.5;
    }
    //CURRENTLY UNUSED
    else if (startAdjustmentY == 6) {
        pongBall.moveY = 1.8;
    } else if (startAdjustmentY == 7) {
        pongBall.moveY = 2.1;
    } else if (startAdjustmentY == 8) {
        pongBall.moveY = 2.4;
    }
    //Determine +/-
    if (startDirectionY == 1) {
        pongBall.moveY = -pongBall.moveY;
    }
    calculateSpeed(pongBall.moveY)
    var startDirectionX = Math.floor(Math.random() * 2) + 1;
    console.log(startDirectionX);
    if (startDirectionX == 1) {
        pongBall.moveX = -pongBall.moveX;
    }
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
        playerOnePaddle.y += 3;
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
        playerTwoPaddle.y += 3;
    }
};

const drawPongBall = () => {
    ctx.beginPath();
    ctx.arc(pongBall.x, pongBall.y, pongBall.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

const movePongBall = () => {
    if (playerOneReady && playerTwoReady) {
        pongBall.x += pongBall.moveX;
        pongBall.y += pongBall.moveY;
    }

}

const pongBallBorderCollisions = () => {
    if (pongBall.y - pongBall.radius <= 0 || pongBall.y + pongBall.radius >= canvas.height) {
        pongBall.moveY = -pongBall.moveY
    }
    //LEFT
    if (pongBall.x - pongBall.radius <= 0) {
        playerTwoScore++;
        pongBall.x = 400;
        pongBall.y = 300;
        pongBall.moveX = 0;
        pongBall.moveY = 0;
        playerOnePaddle.y = 265;
        playerTwoPaddle.y = 265;
        $('#playerTwoHTMLscore').text(playerTwoScore);
        setTimeout(moveStartDirection, 1000);
    }
    //RIGHT
    else if (pongBall.x + pongBall.radius >= canvas.width) {
        playerOneScore++;
        pongBall.x = 400;
        pongBall.y = 300;
        pongBall.moveX = 0;
        pongBall.moveY = 0;
        playerOnePaddle.y = 265;
        playerTwoPaddle.y = 265;
        $('#playerOneHTMLscore').text(playerOneScore);
        setTimeout(moveStartDirection, 1000);
    }
}

const pongBallPlayerOnePaddleCollision = () => {
    if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height * 0.125)) {
        pongBall.moveY = (2 - Math.round(Math.random() * 0.4, -2)) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    } else if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y + (playerOnePaddle.height * 0.125) && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height * 0.25)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.4, -2)) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    } else if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y + (playerOnePaddle.height * 0.25) && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height * 0.375)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.8, -2) + 0.8) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    } else if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y + (playerOnePaddle.height * 0.375) && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height * 0.5)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 1.2, -2) + 1.2) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    } else if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y + (playerOnePaddle.height * 0.5) && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height * 0.625)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 1.2, -2) + 1.2) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    } else if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y + (playerOnePaddle.height * 0.625) && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height * 0.75)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.8, -2) + 0.8) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    } else if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y + (playerOnePaddle.height * 0.75) && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height * 0.875)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.4, -2) + 0.4) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    } else if (pongBall.x - pongBall.radius <= playerOnePaddle.x + playerOnePaddle.width && pongBall.x - pongBall.radius >= playerOnePaddle.x && pongBall.y >= playerOnePaddle.y + (playerOnePaddle.height * 0.875) && pongBall.y < playerOnePaddle.y + (playerOnePaddle.height)) {
        pongBall.moveY = (2 - Math.round(Math.random() * 0.4, -2)) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
    }
}

const pongBallPlayerTwoPaddleCollision = () => {
    if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height * 0.125)) {
        pongBall.moveY = (2 - Math.round(Math.random() * 0.4, -2)) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    } else if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y + (playerTwoPaddle.height * 0.125) && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height * 0.25)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.4, -2)) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    } else if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y + (playerTwoPaddle.height * 0.25) && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height * 0.375)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.8, -2) + 0.8) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    } else if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y + (playerTwoPaddle.height * 0.375) && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height * 0.5)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 1.2, -2) + 1.2) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    } else if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y + (playerTwoPaddle.height * 0.5) && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height * 0.625)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 1.2, -2) + 1.2) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    } else if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y + (playerTwoPaddle.height * 0.625) && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height * 0.75)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.8, -2) + 0.8) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    } else if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y + (playerTwoPaddle.height * 0.75) && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height * 0.875)) {
        pongBall.moveY = (2 - Math.round((Math.random() * 0.4) + 0.4, -2) + 0.4) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    } else if (pongBall.x + pongBall.radius <= playerTwoPaddle.x + playerTwoPaddle.width && pongBall.x + pongBall.radius >= playerTwoPaddle.x && pongBall.y >= playerTwoPaddle.y + (playerTwoPaddle.height * 0.875) && pongBall.y < playerTwoPaddle.y + (playerTwoPaddle.height)) {
        pongBall.moveY = (2 - Math.round(Math.random() * 0.4, -2)) * Math.sign(pongBall.moveY)
        calculateSpeed(pongBall.moveY)
        pongBall.moveX = -pongBall.moveX
    }
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

    if (e.keyCode == 72) {
        setTimeout(function () {
            playerTwoReady = true;
        }, 2000)
    }
    if (e.keyCode == 71) {
        setTimeout(function () {
            playerOneReady = true;
        }, 2000)
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
    pongBallBorderCollisions();
    pongBallPlayerOnePaddleCollision();
    pongBallPlayerTwoPaddleCollision();
    drawPlayerOnePaddle();
    drawPlayerTwoPaddle();
    drawPongBall();
    movePongBall();
}

//CALLING ACTIONS WHEN PAGE IS LOADED

moveStartDirection();
let game = setInterval(drawGame, 10);



// CSS CHANGES

var pink = false;
var king = false;
var pond = false;
var bong = false;
var gong = false;
var thong = false;
var song = false;
var sarong = false;
var wrong = false;

var themeAspects = [$('body'), $('.title'), $('.score'), $('.net'), $('.pongCanvas'), $('.flamingo')]

const stopAnimationChanges = () => {
    for (i = 0; i < themeAspects.length; i++) {
        themeAspects[i].stop();
    }
}

document.getElementById('pinkTheme').addEventListener('click', function () {
    pink = true;
    king = false;
    pond = false;
    bong = false;
    gong = false;
    thong = false;
    song = false;
    sarong = false;
    wrong = false;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})


document.getElementById('kingTheme').addEventListener('click', function () {
    pink = false;
    king = true;
    pond = false;
    bong = false;
    gong = false;
    thong = false;
    song = false;
    sarong = false;
    wrong = false;
    stopAnimationChanges();

    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

document.getElementById('pondTheme').addEventListener('click', function () {
    pink = false;
    king = false;
    pond = true;
    bong = false;
    gong = false;
    thong = false;
    song = false;
    sarong = false;
    wrong = false;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

document.getElementById('bongTheme').addEventListener('click', function () {
    pink = false;
    king = false;
    pond = false;
    bong = true;
    gong = false;
    thong = false;
    song = false;
    sarong = false;
    wrong = false;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

document.getElementById('gongTheme').addEventListener('click', function () {
    pink = false;
    king = false;
    pond = false;
    bong = false;
    gong = true;
    thong = false;
    song = false;
    sarong = false;
    wrong = false;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

document.getElementById('thongTheme').addEventListener('click', function () {
    pink = false;
    king = false;
    pond = false;
    bong = false;
    gong = false;
    thong = true;
    song = false;
    sarong = false;
    wrong = false;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

document.getElementById('songTheme').addEventListener('click', function () {
    pink = false;
    king = false;
    pond = false;
    bong = false;
    gong = false;
    thong = false;
    song = true;
    sarong = false;
    wrong = false;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

document.getElementById('sarongTheme').addEventListener('click', function () {
    pink = false;
    king = false;
    pond = false;
    bong = false;
    gong = false;
    thong = false;
    song = false;
    sarong = true;
    wrong = false;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

document.getElementById('wrongTheme').addEventListener('click', function () {
    pink = false;
    king = false;
    pond = false;
    bong = false;
    gong = false;
    thong = false;
    song = false;
    sarong = false;
    wrong = true;
    stopAnimationChanges();
    themeBackground();
    themeText();
    themeNet();
    themePongCanvas();
    themeImages();
})

const themeBackground = () => {
    if (pink == true) {
        $('body').animate({
            backgroundColor: '#fd79a8'
        }, 2000)
    } else if (king == true) {
        $('body').animate({
            backgroundColor: '#ffb142'
        }, 2000)
    } else if (pond == true) {
        $('body').animate({
            backgroundColor: '#22a6b3'
        }, 2000)
    } else if (bong == true) {
        $('body').animate({
            backgroundColor: '#009432'
        }, 2000)
    } else if (gong == true) {
        $('body').animate({
            backgroundColor: '#b33939'
        }, 2000)
    } else if (thong == true) {
        $('body').animate({
            backgroundColor: '#000000'
        }, 2000)
    } else if (song == true) {
        $('body').animate({
            backgroundColor: '#f7d794'
        }, 2000)
    } else if (sarong == true) {
        $('body').animate({
            backgroundColor: '#e58e26'
        }, 2000)
    } else if (wrong == true) {
        $('body').animate({
            backgroundColor: '#4b4b4b'
        }, 2000)
    }
}

const themeText = () => {
    if (pink == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('PINK PONG')
            $('.title').css('color', '#fff')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: '#fff'
        }, 2000)

    } else if (king == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('KING PONG')
            $('.title').css('color', 'black')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: 'black'
        }, 2000)

    } else if (pond == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('POND PONG')
            $('.title').css('color', 'black')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: 'black'
        }, 2000)

    } else if (bong == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('BONG PONG')
            $('.title').css('color', '#000000')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: '#000000'
        }, 2000)

    } else if (gong == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('GONG PONG')
            $('.title').css('color', '#ffb142')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: '#ffb142'
        }, 2000)

    } else if (thong == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('THONG PONG')
            $('.title').css('color', '#ff3838')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: '#ff3838'
        }, 2000)

    } else if (song == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('SONG PONG')
            $('.title').css('color', '#ff3838')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: '#ff3838'
        }, 2000)

    } else if (sarong == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('SARONG PONG')
            $('.title').css('color', '#fad390')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: '#fad390'
        }, 2000)

    } else if (wrong == true) {
        //Fade out
        $('.title').animate({
            opacity: '0'
        }, 1000)
        //Fade in and replace
        setTimeout(function () {
            $('.title').text('WRONG PONG')
            $('.title').css('color', '#7efff5')
            $('.title').animate({
                opacity: '1'
            }, 1000)
        }, 1000)
        $('.score').animate({
            color: '#7efff5'
        }, 2000)
    }
}

const themeNet = () => {
    if (pink == true) {
        $('.net').animate({
            borderLeftColor: '#ffffff'
        }, 2000)
    } else if (king == true) {
        $('.net').animate({
            borderLeftColor: '#ffffff'
        }, 2000)
    } else if (pond == true) {
        $('.net').animate({
            borderLeftColor: '#ffffff'
        }, 2000)
    } else if (bong == true) {
        $('.net').animate({
            borderLeftColor: '#000000'
        }, 2000)
    } else if (gong == true) {
        $('.net').animate({
            borderLeftColor: '#ffffff'
        }, 2000)
    } else if (thong == true) {
        $('.net').animate({
            borderLeftColor: '#ff3838'
        }, 2000)
    } else if (song == true) {
        $('.net').animate({
            borderLeftColor: '#ff3838'
        }, 2000)
    } else if (sarong == true) {
        $('.net').animate({
            borderLeftColor: '#ff3838'
        }, 2000)
    } else if (wrong == true) {
        $('.net').animate({
            borderLeftColor: '#ff3838'
        }, 2000)
    }
}

const themePongCanvas = () => {
    if (pink == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#f8a5c2',
            borderColor: '#ffffff'
        }, 2000)
    } else if (king == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#2f3542',
            borderColor: '#ffeaa7'
        }, 2000)
    } else if (pond == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#78e08f',
            borderColor: '#ffffff'
        }, 2000)
    } else if (bong == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#278e08f',
            borderColor: '#000000'
        }, 2000)
    } else if (gong == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#218c74',
            borderColor: '#ffffff'
        }, 2000)
    } else if (thong == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#ff3838',
            borderColor: '#ff3838'
        }, 2000)
    } else if (song == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#ffffff',
            borderColor: '#ff3838'
        }, 2000)
    } else if (sarong == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#f6b93b',
            borderColor: '#ff3838'
        }, 2000)
    } else if (wrong == true) {
        $('.pongCanvas').animate({
            backgroundColor: '#4bcffa',
            borderColor: '#ff3838'
        }, 2000, )
    }
}


const themeImages = () => {
    if (pink == true) {
            $('.flamingo').css('display', 'block')
            $('.flamingo').animate({
                opacity: '0.00000001'
            }, 1000, 'linear', function() {
                $('.flamingo').animate({
                    opacity: '0.5'
                }, 1000)
            })
    } else if (pink == false) {
        $('.flamingo').animate({
            opacity: '0'
        }, 1000, function() {
            $('.flamingo').css('display', 'none')
        })
    } else if (king == true) {

    } else if (pond == true) {

    } else if (bong == true) {

    } else if (gong == true) {

    } else if (thong == true) {

    } else if (song == true) {

    } else if (sarong == true) {

    } else if (wrong == true) {

    }
}

//     $('.flamingo').css('display', 'none')


//FUNCTION TEMPLATE
/*
if (pink == true) {
} else if (king == true) {
} else if (pond == true) {
} else if (bong == true) {
} else if (gong == true) {
} else if (thong == true) {
} else if (song == true) {
} else if (sarong == true) {
} else if (wrong == true) {
}
*/