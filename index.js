const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const gameOver = document.getElementById("message");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 20;
let mouseIndex = 0;
let score = 0;
let intervalTime = 500;
let speed = 0.9;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    //create element
    const square = document.createElement("div");
    //add styling to the element
    square.classList.add("square");
    //put the element into our grid
    grid.appendChild(square);
    //push it into a new squares array
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  gameOver.style.display = "none";
  //remove the snake
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  //remove the mouse (here some issues to remove all items from classList, I tried with a few ideas but didn't work )
  squares[mouseIndex].classList.remove("mouse-1");
  squares[mouseIndex].classList.remove("mouse-2");
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  //re add new score to browser
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 500;
  generateMouse1();
  generateMouse2();
  //readd the class of snake to our new currentSnake
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    //Game over message and end of game
    gameOver.style.display = "block";
    return clearInterval(timerId);
  }
  //remove last element from our currentSnake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove("snake");
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);
  //add styling so we can see it

  //deal with snake head gets mouse1
  if (squares[currentSnake[0]].classList.contains("mouse-1")) {
    //remove the class of mouse1
    squares[currentSnake[0]].classList.remove("mouse-1");
    //grow our snake by adding class of snake to it
    squares[tail].classList.add("snake");
    //grow our snake array
    currentSnake.push(tail);
    //generate new mouse1
    generateMouse1();
    //add one to the score
    score++;
    //display our score
    scoreDisplay.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
  if (squares[currentSnake[0]].classList.contains("mouse-2")) {
    //remove the class of mouse
    squares[currentSnake[0]].classList.remove("mouse-2");
    //grow our snake by adding class of snake to it
    squares[tail].classList.add("snake");
    //grow our snake array
    currentSnake.push(tail);
    //generate new mouse
    generateMouse2();
    //add one to the score
    score += 3;
    //display our score
    scoreDisplay.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

function generateMouse1() {
  do {
    mouseIndex = Math.floor(Math.random() * squares.length);
  } while (squares[mouseIndex].classList.contains("snake"));
  squares[mouseIndex].classList.add("mouse-1");
}

function generateMouse2() {
  do {
    mouseIndex = Math.floor(Math.random() * squares.length);
  } while (squares[mouseIndex].classList.contains("snake"));
  squares[mouseIndex].classList.add("mouse-2");
}

function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
