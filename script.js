// DOM Elements
const gameBoard = document.querySelector('.game-board')
const currentScore = document.querySelector('.current-score')


//Variables
const snakePositions = [{x:10,y:10}] //the snake position in the begining of the game is the center
const snakeDirection =  "ArrowUp" //the snake will default by moving to the top
const gameStarted = false //keeps track of whether the game has started or not
const foodPosition = generateFood() //will hold the position of the food on the gameboard
const user_current_score = 0 //keeps track of user's score


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

//This function would update the current score based on the speed of the snake
const updateCurrentScore = () => {
    let user_score = String(user_current_score)
    currentScore.textContent = user_score.padStart(3,"0")
}

//the move function would move the snake around the gameboard based on the user's input
const move = (direction) => {
    //copy of the head of the snake
    let head = {...snakePositions[0]}

    //based on the user's input, the switch case would change the position of the new head of the snake
    switch(direction){
        case "ArrowUp":
            head.x += 1
            break
        case "ArrowDown":
            head.x -= 1
            break
        case "ArrowLeft":
            head.y -= 1
            break
        case "ArrowRight":
            head.y += 1
            break
    }

    //it would add the new head to the snake aka SnakePositions array
    snakePositions.unshift(head)
    
    //if user hasn't eaten any food or collided with itself or the border, 
    //and pop the previous head to give the sense of the snake moving
    snakePositions.pop()
}

const userInputHandler = (e) => {
    //getting the user input
    let key = e.code
    //if space bar is pressed, we start the game 
    //if any of the direction keys are pressed, we would call the move function
    switch(key){
        case "Space":
            gameStarted = true
            startGame()
            break
        case "ArrowUp":
            snakeDirection = "ArrowUp"
            break
        case "ArrowDown":
            snakeDirection = "ArrowDown"
            break
        case "ArrowLeft":
            snakeDirection = "ArrowLeft"
            break
        case "ArrowRight":
            snakeDirection = "ArrowRight"
            break
    }
}


//adding event listener to the window to specifically listen for space bar being pressed by the user
window.addEventListener("keydown",userInputHandler)















