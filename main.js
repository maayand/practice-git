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