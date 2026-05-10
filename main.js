'use strict'

function onBallClick(el){
    // console.log( el.style )
    // var currentWidth = el.offsetWidth
    // var currentHeight = el.offsetHeight
    
    // var newWidth = currentWidth + 50
    // var newHeight  = currentHeight + 50
    // if(newWidth >= 400){
    //     newHeight = 100
    //     newWidth = 100
    // }
    var currentWidth = getRandomInt(20, 60)
   
    el.style.width = currentWidth + 'px'
    el.style.height = currentWidth + 'px'

    el.innerText = currentWidth;
}