'use strict'

var gHoverTimeout
var gAutoClickInterval
var gIntervalCount = 0
var gStateHistory = []
var gRedoStack = []
var gMoveCount = 0 

function onInit(){
    saveState()
}

function onBallClick(el, maxDiameter){
    var randomDiff = getRandomInt(20, 60)
    var randomColor = getRandomColor()
    var currentWidth = el.offsetWidth || 100
    var newWidth = currentWidth + randomDiff
    if (newWidth > maxDiameter) {
        newWidth = 100;
    }
    el.style.background = randomColor;
    el.style.width = newWidth + 'px'
    el.style.height = newWidth + 'px'
    el.innerText = newWidth;
    saveState()
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
    saveState()
}

function onFourthBallClick(){
    var elBall1 = document.querySelector('.ball-1')
    var elBall2 = document.querySelector('.ball-2')

    var balls = [elBall1, elBall2]

    balls.forEach(ball=>{
        var randomDiff = getRandomInt(20,60)
        var currentWidth = ball.offsetWidth 
        var newWidth = currentWidth - randomDiff
        if(newWidth < 100){
            newWidth = 100
        }
        ball.style.width = newWidth + 'px'
        ball.style.height = newWidth + 'px'
        ball.innerText = newWidth
    })
    saveState()
}
function onChangeBackgroundColor(){
    var randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor
    saveState()
}
function onResetGame(){
    document.body.style.backgroundColor = 'black'
    var allBalls = document.querySelectorAll('[class^="ball-"]')

    allBalls.forEach(ball =>{
        ball.style.width = '100px'
        ball.style.height = '100px'
        ball.innerText = '100'
        ball.style.backgroundColor = ''
    })
    saveState()
}
function startHoverTimer(){
    stopHoverTimer()
    gHoverTimeout = setTimeout(()=>{
        gIntervalCount = 0
       gAutoClickInterval = setInterval(()=>{
        autoClickBalls()
        gIntervalCount++
        if (gIntervalCount >= 10) {
            stopHoverTimer();
        }
       },2000)
    },2000)
}

function stopHoverTimer(){
    clearInterval(gAutoClickInterval)
    clearTimeout(gHoverTimeout)
    gIntervalCount = 0
}

function autoClickBalls(){
    var elBall1 = document.querySelector('.ball-1');
    var elBall2 = document.querySelector('.ball-2');

    onBallClick(elBall1, 300)
    onBallClick(elBall2, 400)

    onThiredBallClick()
    onFourthBallClick()
    
}
function saveState() {
    var state = {
        balls : [],
        bodyBgColor: document.body.style.backgroundColor || 'black' 
    }
    var allBalls = document.querySelectorAll('[class^="ball-"]')

    allBalls.forEach(ball =>{
        state.balls.push({
            className : ball.className,
            width: ball.style.width || '100px',
            height: ball.style.height || '100px',
            backgroundColor: ball.style.background,
            innerText: ball.innerText
        })
    })
    gStateHistory.push(JSON.parse(JSON.stringify(state)))
    gRedoStack = [];
    updateUndoRedoButtons()

    updateTitle()
}

function renderState(state){
    if(!state) return
    document.body.style.backgroundColor = state.bodyBgColor;
    state.balls.forEach(ballState=>{
        var elBall = document.querySelector('.' + ballState.className.split(' ')[0])
        if (elBall) {
            elBall.style.width = ballState.width
            elBall.style.height = ballState.height
            elBall.style.backgroundColor = ballState.backgroundColor
            elBall.innerText = ballState.innerText
        }
    })
}
function onUndo() {
    if (gStateHistory.length <= 1) return;
    var currentState = gStateHistory.pop();
    gRedoStack.push(currentState);
    var prevState = gStateHistory[gStateHistory.length - 1]
    renderState(prevState)
    updateUndoRedoButtons()
}

function onRedo() {
    if (gRedoStack.length === 0) return
    var nextState = gRedoStack.pop()
    gStateHistory.push(nextState)
    renderState(nextState)
    updateUndoRedoButtons()
}

function updateUndoRedoButtons() {
    var elUndoBtn = document.getElementById('btn-undo')
    var elRedoBtn = document.getElementById('btn-redo')
    elUndoBtn.disabled = (gStateHistory.length <= 1)
    elRedoBtn.disabled = (gRedoStack.length === 0)
}

function updateTitle(){
    gMoveCount = gStateHistory.length - 1
     if(gMoveCount < 0 ) gMoveCount = 0
    document.title = 'Moves ' + gMoveCount
}