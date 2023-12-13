

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
let growSpeed = 100;






function createCavas () {
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
  document.body.appendChild(canvas);
  return { canvas, ctx };
}



// Define flower pot properties
const topPotWidth = 100; // Adjust the width at the top as needed
const bottomPotWidth = 70; // Adjust the width at the bottom as needed
const potHeight = 100; // Adjust the height as needed
const potColorTop = "#814220";
const potColorBottom = "#8b4513";
const rimColor = "brown"; // Color of the rim
const rimHeight = 10; // Height of the rim

// Create the flower pot
function createFlowerPot(canvas, ctx) {
    const centerX = canvas.width / 2; // Center the pot horizontally

    // Calculate the positions of the top, bottom, and rim of the pot
    const topY = canvas.height - potHeight - rimHeight;
    const bottomY = canvas.height;
    const rimY = canvas.height - potHeight - rimHeight;

    // Create the flower pot shape
    const gradient = ctx.createLinearGradient(centerX, topY, centerX, bottomY);
    gradient.addColorStop(0, potColorTop);
    gradient.addColorStop(.8, potColorBottom);

    ctx.fillStyle = gradient;

    // Draw the main pot shape
    ctx.beginPath();
    ctx.moveTo(centerX - topPotWidth / 2, topY);
    ctx.lineTo(centerX + topPotWidth / 2, topY);
    ctx.lineTo(centerX + bottomPotWidth / 2, bottomY);
    ctx.lineTo(centerX - bottomPotWidth / 2, bottomY);
    ctx.closePath();
    ctx.fill();

    // Create the rim on the top edge
    ctx.fillStyle = rimColor;
    ctx.fillRect(centerX - topPotWidth / 2, rimY, topPotWidth, rimHeight);
}




function createSquare(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, pixelSize, pixelSize);
  squares.push({ x, y, color, id: i });
  i++;
}


function growPlant(ctx, canvas) {
  if (i < pixelAmount) {
    setTimeout(function () {
      newLeafe(ctx, canvas);
      growPlant(ctx, canvas); // Call growPlant again inside the setTimeout
    }, growSpeed);
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

function newLeafe(ctx, canvas) {
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
    createSquare(ctx, leftX, y, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  } if (randomDirection < leftProbability + rightProbability && !isSquareOccupied(rightX, y)) {
    createSquare(ctx, rightX, y, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  } if (randomDirection < leftProbability + rightProbability + upProbability && !isSquareOccupied(x, topY)) {
    createSquare(ctx, x, topY, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  } if (randomDirection < leftProbability + rightProbability + upProbability + downProbability &&
    bottomY < canvas.height-potHeight-50 && !isSquareOccupied(x, bottomY)) {
    createSquare(ctx, x, bottomY, newLeafes);
    redSquares.push(squares[squares.length - 1]);
  }

  const randomIndex = Math.floor(Math.random() * redSquares.length); // Random index from 0 to redSquares.length
  const randomSquare = redSquares[randomIndex]; // Random square from redSquares

  let colorVariation = Math.floor(Math.random()* 50)+20 ;
  console.log(colorVariation);

  oldLeafes = `hsl(120, 61%, ${Math.floor(Math.random() * 40) + 30}%)`;
  try{
    createSquare(ctx, randomSquare.x, randomSquare.y, oldLeafes);
    console.log("squares: ", squares.length);
  }
  catch{
    console.log("error");
    main();
  }

  redSquares.splice(randomIndex, 1);
  greenSquares.push(randomSquare);

  const itenth = i * 0.01;
  if (greenSquares.length > 1) {
    for (const element of greenSquares) {
      if (element.id <= itenth) {
        element.color = "brown";
      }
      if (i % itenth === 0) {
          createSquare(ctx, randomSquare.x, randomSquare.y, flowers);
      }
    }
  }
}


function isSquareOccupied(x, y) {
  return squares.some((element) => element.x === x && element.y === y);
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

function petThePlant(ctx, canvas) {
  const fractionToGrow = 0.3; // Define the fraction of squares to grow
  const squaresToGrow = Math.floor(squares.length * fractionToGrow);
  let squaresGrown = 0;

  function grow() {
    if (squaresGrown < squaresToGrow) {
      newLeafe(ctx, canvas);
      console.log("pet the plant ", squaresGrown, " grows of ", squaresToGrow);
      squaresGrown++;
      setTimeout(grow, growSpeed/3);
    }
  }

  grow(); // Start the growing process
}



function main() {
  const { canvas, ctx } = createCavas();
  createFlowerPot(canvas, ctx);
  createSquare(ctx, canvas.width/2, canvas.height-potHeight-rimHeight*1.5, "brown");
  growPlant(ctx, canvas);


  // on klick execute growPlant
  document.addEventListener("click", function () {
    petThePlant(ctx, canvas);
  });
}

main();