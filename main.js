'use strict'

function onBallClick(el, maxDiameter){
    var randomDiff = getRandomInt(20, 60);
    var randomColor = getRandomColor()
    var currentWidth = el.offsetWidth;
    var newWidth = currentWidth + randomDiff;
    if (newWidth > maxDiameter) {
        newWidth = 100;
    }
    el.style.background = randomColor;
    el.style.width = newWidth + 'px';
    el.style.height = newWidth + 'px';
    el.innerText = newWidth;
}
function onThiredBallClick(){
    var elBall1 = document.querySelector('.ball-1')
    var elBall2 = document.querySelector('.ball-2')

    var ball1Color = elBall1.style.backgroundColor || 'red'
    var ball1Width = elBall1.style.width || '100px'

    elBall1.style.backgroundColor = elBall2.style.backgroundColor || 'blue'
    elBall1.style.width = elBall2.style.width || '200px'
    elBall1.style.height = elBall2.style.width || '200px'
    elBall1.innerText = parseInt(elBall1.style.width)

    elBall2.style.backgroundColor = ball1Color 
    elBall2.style.width = ball1Width
    elBall2.style.height = ball1Width
    elBall2.innerText = parseInt(elBall2.style.width)
}