// DOM Elements
const gameBoard = document.querySelector('.game-board')

//Variables
const snakePositions = [{x:10,y:10}] //the snake position in the begining of the game is the center
const snakeDirection = "top" //the snake will default by moving to the top
const gameStarted = false //keeps track of whether the game has started or not
const foodPosition = generateFood() //will hold the position of the food on the gameboard

//This function will create each snake segment based on the snakePosition array and set its position
const createSnake = () => {
    snakePositions.forEach((position) => {
        const segment = document.createElement('div')
        segment.style.gridArea = `${position.x} / ${position.y}`
        segment.style.backgroundColor = "black"
        gameBoard.appendChild(segment)
    })
}

//This function would generate a random position of the food on the gameboard
function generateFood() {
    //x is for the row
    let xPosition = Math.floor(Math.random() * 20) + 1;
    //y is for the column
    let yPosition = Math.floor(Math.random() * 20) + 1;

    //return an object with the position
    return {
        x: xPosition,
        y: yPosition
    }
}

//This function would create a food element and set its position on the gameboard
const createFood = () => {
    const food = document.createElement('div')
    food.style.gridArea = `${foodPosition.x} / ${foodPosition.y}`
    food.style.backgroundColor = "#EEEEEE"
    gameBoard.appendChild(food)
}

createFood();













