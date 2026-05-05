'use strict'

function onBallClick(el){
    // console.log( el.style )
    var currentWidth = el.offsetWidth
    var currentHeight = el.offsetHeight
    
    var newWidth = currentWidth + 50
    var newHeight  = currentHeight + 50

    el.style.width = newWidth + 'px'
    el.style.height = newHeight + 'px'

    el.innerText = newWidth;
}