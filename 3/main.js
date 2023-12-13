

let squares = [];
let greenSquares = [];
const redSquares = [];
let i = 1;

let newLeafes = "#228b22";
// let newLeafes = "hsl(0, 100%, 50%)";
let oldLeafes = "hsl(120, 61%, 24%)";
let flowers = "rgb(255, 255, 0)";

let pixelSize = window.innerWidth/150;
let pixelAmount = 200;
let growSpeed = 10;




function createCavas () {
    // const canvas = document.getElementById("plantCanvas");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.bottom = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 9999;
    canvas.style.pointerEvents = "none";
    canvas.style.backgroundColor = "transparent";
    canvas.style.width = "100%";
    // create a canvas at the end of the html body
    document.body.appendChild(canvas);
    return canvas;
}

function createSquare(x, y, color) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, pixelSize, pixelSize);
    squares.push({ x, y, color, id: i });
    i++;
}


function growPlant() {
  if (i < pixelAmount) {
    newLeafe();
    setTimeout(growPlant, growSpeed);
  }
}

// const style = document.createElement("style")
// style.textContent = "* { background-color: red; }"
// document.head.appendChild(style);


// Define probabilities for different directions (e.g., left, right, up, down)
const leftProbability = 0.25; // 25% chance of growing to the left
const rightProbability = 0.25; // 25% chance of growing to the right
const upProbability = 0.25; // 25% chance of growing upwards
const downProbability = 0.05; // 25% chance of growing downwards

function newLeafe() {
  const lastSquare = squares[squares.length - 1];
  const x = lastSquare.x;
  const y = lastSquare.y;

  // Calculate random numbers to decide the direction of growth
  const randomDirection = Math.random();

  const leftX = x - pixelSize;
  const rightX = x + pixelSize;
  const topY = y - pixelSize;
  const bottomY = y + pixelSize;

  if (randomDirection < leftProbability*2 && !isSquareOccupied(leftX, y)) {
    createSquare(leftX, y, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  } if (randomDirection < leftProbability + rightProbability && !isSquareOccupied(rightX, y)) {
    createSquare(rightX, y, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  } if (randomDirection < leftProbability + rightProbability + upProbability && !isSquareOccupied(x, topY)) {
    createSquare(x, topY, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  } if (randomDirection < leftProbability + rightProbability + upProbability + downProbability &&
    bottomY < canvas.height && !isSquareOccupied(x, bottomY)) {
    createSquare(x, bottomY, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  }

  const randomIndex = Math.floor(Math.random() * redSquares.length); // Random index from 0 to redSquares.length
  const randomSquare = redSquares[randomIndex]; // Random square from redSquares

  let colorVariation = Math.floor(Math.random()* 10) ;
  console.log(colorVariation);

  oldLeafes = `hsl(120, 61%, ${Math.floor(Math.random() * 40) + 30}%)`;
  try{
    createSquare(randomSquare.x, randomSquare.y, oldLeafes);
  }
  catch{
    console.log("error");
    newLeafe();
  }

  redSquares.splice(randomIndex, 1);
  greenSquares.push(randomSquare);

  const itenth = i * 0.01;

  for (const square of greenSquares) {
    if (square.id <= itenth) {
      square.color = "brown";
    }
    if (i % itenth === 0) {
        createSquare(randomSquare.x, randomSquare.y, flowers);
    }
  }
}


function isSquareOccupied(x, y) {
  return squares.some((square) => square.x === x && square.y === y);
}

let ispace = 1; // Initialize ispace

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    i = ispace;
    growPlant();
  }
  if (event.key === " ") {
    ispace = i;
    i = pixelAmount;
  }
});

// on klick execute growPlant
document.addEventListener("click", function () {
    i = 0;
    petThePlant();
});
function petThePlant() {
    if (i < squares.length*0.3) {
        newLeafe();
        i++;
        console.log('neue felder: ', squares.length*0.3);
        setTimeout( petThePlant, growSpeed/3);
    };
}
const canvas = createCavas();
createSquare(canvas.width/2, canvas.height, "brown");
growPlant();
