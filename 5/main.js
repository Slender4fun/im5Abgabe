const squares = [];
const greenSquares = [];
const borderLeaves = [];
let i = 1;


const pixelSize = window.innerWidth / 150;
const pixelAmount = 1000;
const growSpeed = 10;

////////////////// Flower Pot Variables
  const topPotWidth = 100;
  const bottomPotWidth = 70;
  const potHeight = 100;
  const potColorTop = "#814220";
  const potColorBottom = "#8b4513";
  const rimColor = "brown";
  const rimHeight = 10;
////////////////// Flower Pot Variables


////////////////// Leaf Variables
  const leftProbability = 0.25;
  const rightProbability = 0.25;
  const upProbability = 0.25;
  const downProbability = 0.01;
  const borderLeavesColor = "#228b22";
  let oldLeaves = "hsl(120, 61%, 24%)";
  const flowersYellow = "rgb(255, 255, 0)";
  const flowersRose = "rgb(222, 152, 246)";
////////////////// Leaf Variables





function main() {
  const { canvas, ctx } = createCanvas();
  createFlowerPot(canvas, ctx);
  createSquare(ctx, (canvas.width / 2)-pixelSize/2, canvas.height - potHeight - rimHeight * 1.5, "brown", 0);
  growPlant(ctx, canvas);
  document.addEventListener("click", function () {
    petThePlant(ctx, canvas);
  });
  console.log(squares);
}









function createCanvas() {
  const canvas = document.createElement("canvas");      // Create a canvas element
  const ctx = canvas.getContext("2d");                  // Get the 2D context needed to draw on the canvas
  canvas.width = window.innerWidth;                     // Set the canvas width to the window's inner width
  canvas.height = window.innerHeight;                   // Set the canvas height to the window's inner height
  canvas.style.position = "fixed";                      // Set the canvas's position to "fixed"
  canvas.style.bottom = 0;                              // Set the canvas's position at the bottom of the page
  canvas.style.left = 0;                                // Set the canvas's position at the left of the page
  canvas.style.zIndex = 9999;                           // Set the canvas's z-index to 9999, ensuring it's displayed above other elements
  canvas.style.pointerEvents = "none";                  // Set pointer events to "none," making the canvas non-interactable
  canvas.style.backgroundColor = "transparent";         // Set the canvas background color to transparent
  canvas.style.width = "100%";                          // Set the canvas width to 100% of its container
  document.body.appendChild(canvas);                    // Append the canvas to the document's body
  return { canvas, ctx };                               // Return an object containing the canvas and its 2D context
}


function createFlowerPot(canvas, ctx) {
  const centerX = canvas.width / 2;                         // Calculate the horizontal center of the canvas
  const topY = canvas.height - potHeight - rimHeight;        // Calculate the top Y-coordinate for the flower pot
  const bottomY = canvas.height;                             // Calculate the bottom Y-coordinate of the flower pot
  const rimY = canvas.height - potHeight - rimHeight;        // Calculate the Y-coordinate of the rim
  
  const gradient = ctx.createLinearGradient(centerX, topY, centerX, bottomY);  // Create a linear gradient
  gradient.addColorStop(0, potColorTop);                 // Add a color stop to the gradient at position 0
  gradient.addColorStop(0.8, potColorBottom);            // Add a color stop to the gradient at position 0.8
  ctx.fillStyle = gradient;                              // Set the fill style of the context to the gradient

  ctx.beginPath();                                       // Begin a new path
  ctx.moveTo(centerX - topPotWidth / 2, topY);           // Move to the top-left corner of the flower pot
  ctx.lineTo(centerX + topPotWidth / 2, topY);           // Draw a line to the top-right corner
  ctx.lineTo(centerX + bottomPotWidth / 2, bottomY);     // Draw a line to the bottom-right corner
  ctx.lineTo(centerX - bottomPotWidth / 2, bottomY);     // Draw a line to the bottom-left corner
  ctx.closePath();                                       // Close the path
  ctx.fill();                                            // Fill the path with the current fill style

  ctx.fillStyle = rimColor;                              // Set the fill style to the rim color
  ctx.fillRect(centerX - topPotWidth / 2, rimY, topPotWidth, rimHeight);  // Fill a rectangle for the rim
}


function createSquare(ctx, x, y, color, i) {
  ctx.fillStyle = color;  // Set the fill style of the context to the specified color
  ctx.fillRect(x, y, pixelSize, pixelSize);  // Fill a rectangle at the specified position with the specified size

  // Check if the coordinates (x, y) are already in the squares array
  const existingSquare = squares.find(square => square.x === x && square.y === y);

  if (existingSquare) {
    // Update the color of the existing square
    existingSquare.color = color;
    existingSquare.birth = Date.now();
  } else {
    // Push a new object representing the square to the array
    squares.push({id:i, x, y, color, birth: 'unborn'});
  }
}



function growPlant(ctx, canvas) {
  if (i < pixelAmount) {
    setTimeout(function () {
      newLeaf(ctx, canvas);
      growPlant(ctx, canvas);
    }, growSpeed);
  }
}

function newLeaf(ctx) {
  const lastSquare = squares.reduce((prev, current) => (prev.birth > current.birth) ? prev : current);  
  const x = lastSquare.x;
  const y = lastSquare.y;
  const randomDirection = Math.random();
  const leftX = x - pixelSize;
  const rightX = x + pixelSize;
  const topY = y - pixelSize;
  const bottomY = y + pixelSize;      

  if (randomDirection < leftProbability  && !isSquareOccupied(leftX, y)) {
    createSquare(ctx, leftX, y, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }
  if (randomDirection < leftProbability < rightProbability && !isSquareOccupied(rightX, y)) {
    createSquare(ctx, rightX, y, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }
  if (randomDirection < leftProbability + rightProbability + upProbability && !isSquareOccupied(x, topY)) {
    createSquare(ctx, x, topY, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }
  if (randomDirection < leftProbability + rightProbability + upProbability + downProbability &&
     y < squares.find(square => square.id === 0).y && !isSquareOccupied(x, bottomY)) {
    createSquare(ctx, x, bottomY, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }

  // Select a random leaf from borderLeaves
  const randomLeaf = Math.floor(Math.random() * borderLeaves.length);
  const nextGrowingLeaf = borderLeaves[randomLeaf];

  // Move the leaf from borderLeaves to greenSquares
  borderLeaves.splice(randomLeaf, 1);
  greenSquares.push(nextGrowingLeaf);

  // Change the color of the selected leaf
  oldLeaves = `hsl(120, 61%, ${Math.floor(Math.random() * 40) + 30}%)`;

  try {
    createSquare(ctx, nextGrowingLeaf.x, nextGrowingLeaf.y, oldLeaves, i);
  } catch {
    console.log("error");
  }

  

  // const a = i * 0.01;
  // const b = i * 0.02;
  // if (greenSquares.length > 1) {
  //   for (const x of greenSquares) {
  //     if (i % a === 0) {
  //       createSquare(ctx, nextGrowingLeaf.x, nextGrowingLeaf.y, flowersRose, i);
  //     }
      
  //     if (i % b === 0) {
  //       createSquare(ctx, nextGrowingLeaf.x, nextGrowingLeaf.y, flowersYellow, i);
  //     }
  //   }
  // }
}


function isSquareOccupied(x, y) {
  return squares.some((element) => element.x === x && element.y === y);
}

let ispace = 1;

function isClickWithinPlant(clickX, clickY, canvas) {
  // Define the boundaries of the plant
  const centerX = canvas.width / 2;
  const plantTopY = canvas.height - potHeight - rimHeight - pixelSize; // Adjusted for the square size
  const plantBottomY = canvas.height - rimHeight;

  // Check if the click coordinates are within the plant boundaries
  return clickX >= centerX - topPotWidth / 2 && clickX <= centerX + topPotWidth / 2 &&
         clickY >= plantTopY && clickY <= plantBottomY;
}

document.addEventListener("click", function (event) {
  const clickX = event.clientX;
  const clickY = event.clientY;

  // Check if the click is within the plant before triggering petThePlant
  if (isClickWithinPlant(clickX, clickY, canvas)) {
    petThePlant(ctx, canvas);
  }
});

function petThePlant(ctx, canvas) {
  const fractionToGrow = 0.3;
  const squaresToGrow = Math.floor(squares.length * fractionToGrow);
  let squaresGrown = 0;

  function grow() {
    if (squaresGrown < squaresToGrow) {
      newLeaf(ctx, canvas);
      console.log("petting the plant grew it from", squaresGrown, " to ", squaresToGrow);
      squaresGrown++;
      setTimeout(grow, growSpeed / 3);
    }
  }

  grow();
}

main();
