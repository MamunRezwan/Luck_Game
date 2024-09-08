/*
Tools- variable, condition, loop, function
Technique- problem solving and logic development
Understanding the flow- 

clear idea about the project (mock up, prototype)
Having mental model about the project
gausing the step
*/

//Selector declaration

const formElm = document.querySelector('form')
const inputElm = document.querySelector('#luck-input')
const winScoreElm = document.querySelector('.lucky-number span')
const winPlayerElm = document.querySelector('.winner')
const p1BtnElm = document.querySelector('.p1Btn')
const p2BtnElm = document.querySelector('.p2Btn')
const p1ScoreElm = document.querySelector('.p1')
const p2ScoreElm = document.querySelector('.p2')
const resetBtnElm = document.querySelector('#resetBtn')

//Data store

let p1Score = 0
let p2Score = 0
let winningScore = 7
let gameOver = false
let winner = null
let p1Turn = true
let p2Turn = false

//Randomized Start Player

function setInitialPlayerTurnValue(){
    const player = randomizedStartPlayer()
    if(player==='p1'){
        p1Turn = true
        p2BtnElm.setAttribute('disabled','disabled')
        p1BtnElm.removeAttribute('disabled')
    }else{
        p2Turn = true
        p1BtnElm.setAttribute('disabled','disabled')
        p2BtnElm.removeAttribute('disabled')
    }
}
setInitialPlayerTurnValue()

function randomizedStartPlayer(){
    const players = ['p1','p2']
    const index = Math.floor((Math.random()*players.length))
    const player = players[index]
    return player
}

//Settign Up Winner Score

winScoreElm.textContent = winningScore


function identifyingWinnigState(){
    
    if (p1Score === winningScore || p2Score===winningScore){
        gameOver = true
    }
}

function identifyWinner(){
    if(p1Score === winningScore){
        winner="p1"
        winPlayerElm.textContent='Player-1 is Winner'
    }
    if(p2Score===winningScore){
        winner='p2'
        winPlayerElm.textContent='Player-2 is Winner'
    }
}

function disableBtnInput(){
    p1BtnElm.setAttribute('disabled','disabled')
    p2BtnElm.setAttribute('disabled','disabled')
}

//Reset Button Setting

function resetInput(){
    p1Score = 0
    p2Score = 0
    winningScore = 7
    gameOver = false
    winner = null

    p1ScoreElm.textContent=p1Score
    p2ScoreElm.textContent=p2Score
    winScoreElm.textContent = winningScore
    winPlayerElm.textContent = ''

    p1BtnElm.removeAttribute('disabled')
    p2BtnElm.removeAttribute('disabled')
}

//Validation
function validateInput(elmVal) {
    if (
      elmVal.trim() == '' ||
      Number(elmVal) !== Number(elmVal) ||
      Number(elmVal) <= 0
    ) {
      alert('Please input a valid number')
      return false
    } else {
      return true
    }
  }

p1BtnElm.addEventListener('click',(event)=>{

    if(p1Turn){
        p1Score++
    p1ScoreElm.textContent= p1Score
    identifyingWinnigState()   
    }
    identifyWinner()
    p1Turn = false
    p2Turn = true

    p1BtnElm.setAttribute('disabled','disabled')
    p2BtnElm.removeAttribute('disabled')
    if(gameOver){
        disableBtnInput()
    }
    
})

p2BtnElm.addEventListener('click', (event)=>{
    if(p2Turn){
        p2Score++
        p2ScoreElm.textContent=p2Score
        identifyingWinnigState()
    }
   
    identifyWinner()
    p2Turn = false
    p1Turn = true

    p2BtnElm.setAttribute('disabled','disabled')
    p1BtnElm.removeAttribute('disabled')

    if(gameOver){
        disableBtnInput()
    }  
})


  //Reset Button

  resetBtnElm.addEventListener('click', (event)=>{

    resetInput()
 
 })

//Form Setting

formElm.addEventListener('submit',(event)=>{
    event.preventDefault()

    resetInput()
    if(!validateInput(inputElm.value)) return
    const val = Number(inputElm.value)
    winningScore = val
    winScoreElm.textContent = val
    inputElm.value = ''
    setInitialPlayerTurnValue()
    
})

