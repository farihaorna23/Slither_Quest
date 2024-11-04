// DOM Elements
const gameBoard = document.querySelector('.game-board')

//Variables
const snakePositions = [{x:10,y:10}] //the snake position in the begining of the game is the center
const snakeDirection = "top" //the snake will default by moving to the top
const gameStarted = false //the 


console.log(gameBoard)

//This function will create each snake segment based on the snakePosition array and set its position
const createSnake = () => {
    snakePositions.forEach((position) => {
        const segment = document.createElement('div')
        segment.style.gridArea = `${position.x} / ${position.y}`
        segment.style.backgroundColor = `black`
        gameBoard.appendChild(segment)
    })
}

createSnake();













