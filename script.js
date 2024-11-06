// DOM Elements
const gameBoard = document.querySelector('.game-board')
const currentScore = document.querySelector('.current-score')
const gameDisplay = document.querySelector('.game-display')
const highestScore = document.querySelector('.highest-score')
const gameOverText = document.querySelector('.game-over-text')
const startGameText = document.querySelector('.start-game-text')

//Variables
let snakePositions = [{x:10,y:10}] //the snake position in the begining of the game is the center
let snakeDirection =  "ArrowUp" //the snake will default by moving to the top
let gameStarted = false //keeps track of whether the game has started or not
let foodPosition = generateFood() //will hold the position of the food on the gameboard
let user_current_score = 0 //keeps track of user's score
let user_highest_score = 0 //keeps track of user's highest score
let gameTimeInterval = 200 //the game delay interval for the gaming loop
let gameLoop = null //will store the interval id for the set interval in startGame

//This function would start the game and repeatdely call a few functions on repeat to keep the game responive and ongoing
const startGame = () => {
    gameLoop = setInterval(()=> {
        if(gameStarted){
        //clear the gameboard
        gameBoard.innerHTML = ""
        //create snake segments
        createSnake()
        //create food
        createFood()
        //make the snake move according to the user input
        move(snakeDirection)
        //update current score board
        updateCurrentScore()
        }
    },gameTimeInterval)
}

//This function would end the game by stopping the gaming loop
const endGame = () => {
    //stop the gaming loop
    clearInterval(gameLoop)
    console.log("Game Ended")
    //update highest score
    updateHighestScore()
    //clear the gameboard inner html
    gameBoard.innerHTML = ""
    //reset the variables
    gameStarted = false
    user_current_score = 0
    gameTimeInterval = 200
    snakeDirection =  "ArrowUp" 
    snakePositions = [{x:10,y:10}]
    foodPosition = generateFood() 
    //bring back the snake logo and text
    gameDisplay.style.display = "flex"
    startGameText.style.display = "none"
    //show game over text
    gameOverText.style.display = "block"

}


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

//This function would increase the speed of the snake's movement by decrementing the game loop's time interval
//The rate at how much time interval would decrease depends on how fast the snake's speed is
// The rate of decrement would get lower as the speed of the snake increases
//The higher the speed, the more points the user will earn
const updateSnakeSpeed = () => {
    if (gameTimeInterval < 100) {
        gameTimeInterval -= 1
        user_current_score += 15
    }else if (gameTimeInterval < 150){
        gameTimeInterval -= 3
        user_current_score += 10
    }else{
        gameTimeInterval -= 5
        user_current_score += 5
    }
}

//This function would update the current score on the score board
const updateCurrentScore = () => {
    let user_score = String(user_current_score)
    currentScore.textContent = user_score.padStart(3,"0")
}

//This function would update the highest score on the score board
function updateHighestScore() {
    //if the current score is higher than the highest score recorded, then current scores becomes highest score
    if (user_current_score > user_highest_score ){
        user_highest_score = user_current_score;
    }
    let highScore = String(user_highest_score)
    highestScore.textContent = highScore.padStart(3,0)
}

//This function checks for border collision and self collision
const  checkCollison = (head) => {
    //border collision
    if((head.x < 1) || (head.x > 20) || (head.y < 1) || (head.y > 20)){
        return true
    }else{
        //self collision
        for (let i=1; i<snakePositions.length; i++){
            if((head.x == snakePositions[i].x) && (head.y == snakePositions[i].y)){
                return true
            }
        }
    }
    return false
}

//the move function would move the snake around the gameboard based on the user's input
const move = (direction) => {
    //copy of the head of the snake
    let head = {...snakePositions[0]}

    //based on the user's input, the switch case would change the position of the new head of the snake
    switch(direction){
        case "ArrowUp":
            head.x -= 1
            break
        case "ArrowDown":
            head.x += 1
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

    //call the collision function to check if snake's head has collided
    let isCollision = checkCollison(head)

    //if the user eats the food, we don't want to pop off their tail
    if ((head.x == foodPosition.x) && (head.y == foodPosition.y)){
        //generate new food position
        foodPosition = generateFood() 
        //update the snake's speed
        updateSnakeSpeed()
     
    //if the user's collided with the gameboard's border or collided with itself   
    }else if (isCollision){
        //we want to end the game
        endGame()
    }else{
        //if user hasn't eaten any food or collided with itself or the border, 
        //and pop the previous head to give the sense of the snake moving
        snakePositions.pop()
    }
}

const userInputHandler = (e) => {
    //getting the user input
    let key = e.code
    //if space bar is pressed, we start the game 
    //if any of the direction keys are pressed, we would call the move function
    switch(key){
        case "Space":
            gameDisplay.style.display = "none";
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















