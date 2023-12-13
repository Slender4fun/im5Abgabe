const squares = [];
const borderLeaves = [];
let i = 1;


const pixelSize = window.innerWidth / 150;
const pixelAmount = 20000;
console.log(pixelAmount);
const growSpeed = 0;  

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
  // const borderLeavesColor = "red";
  let oldLeaves = "hsl(120, 61%, 24%)";
  const flowersYellow = "rgb(255, 255, 0)";
  const flowersRose = "hsl(285, 84%, 82%)";
////////////////// Leaf Variables

 



function main() {
  const { canvas, ctx } = createCanvas();
  createFlowerPot(canvas, ctx);
  createSquare(ctx, (canvas.width / 4)-pixelSize/2, canvas.height - potHeight - rimHeight * 1.5, "brown", 0);
  growPlant(ctx, canvas);
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
  const centerX = canvas.width / 4;                         // Calculate the horizontal center of the canvas
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
  // Check if the coordinates (x, y) and color are already in the squares array
  const existingSquare = squares.find(square => square.x === x && square.y === y && square.color === color);

  if (!existingSquare) {
    ctx.fillStyle = color;  // Set the fill style of the context to the specified color
    ctx.fillRect(x, y, pixelSize, pixelSize);  // Fill a rectangle at the specified position with the specified size

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
  const lastSquare = squares.reduce((prev, current) => {
    if (prev.birth === "unborn") {
      return current;
    }
    if (current.birth === "unborn") {
      return prev;
    }
    return prev.birth > current.birth ? prev : current;
  });
  const x = lastSquare.x;
  const y = lastSquare.y;

  const leftX = x - pixelSize;
  const rightX = x + pixelSize;
  const topY = y - pixelSize;
  const bottomY = y + pixelSize;    
  
  if (leftX >= 0 && !isSquareOccupied(leftX, y)) { // Check if leftX is within the window
    createSquare(ctx, leftX, y, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }
  if (rightX < window.innerWidth && !isSquareOccupied(rightX, y)) { // Check if rightX is within the window
    createSquare(ctx, rightX, y, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }
  if (!isSquareOccupied(x, topY)) {
    createSquare(ctx, x, topY, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }
  if (y < squares.find(square => square.id === 0).y-pixelSize && !isSquareOccupied(x, bottomY)) {
    createSquare(ctx, x, bottomY, borderLeavesColor, i);
    borderLeaves.push(squares[squares.length - 1]);
    i++;
  }  

  // if (randomDirection < leftProbability  && !isSquareOccupied(leftX, y)) {
  //   createSquare(ctx, leftX, y, borderLeavesColor, i);
  //   borderLeaves.push(squares[squares.length - 1]);
  //   i++;
  // }
  // if (randomDirection < leftProbability + rightProbability && !isSquareOccupied(rightX, y)) {
  //   createSquare(ctx, rightX, y, borderLeavesColor, i);
  //   borderLeaves.push(squares[squares.length - 1]);
  //   i++;
  // }
  // if (randomDirection < leftProbability + rightProbability + upProbability && !isSquareOccupied(x, topY)) {
  //   createSquare(ctx, x, topY, borderLeavesColor, i);
  //   borderLeaves.push(squares[squares.length - 1]);
  //   i++;
  // }
  // if (randomDirection < leftProbability + rightProbability + upProbability + downProbability &&
  //    y < squares.find(square => square.id === 0).y-pixelSize && !isSquareOccupied(x, bottomY)) {
  //   createSquare(ctx, x, bottomY, borderLeavesColor, i);
  //   borderLeaves.push(squares[squares.length - 1]);
  //   i++;
  // }

  // Select a random leaf from borderLeaves
  const randomLeaf = Math.floor(Math.random() * borderLeaves.length);
  const nextGrowingLeaf = borderLeaves[randomLeaf];

  // remove the leaf from borderLeaves
  borderLeaves.splice(randomLeaf, 1);

  // Change the color of the selected leaf
  oldLeaves = `hsl(120, 61%, ${Math.floor(Math.random() * 40) + 30}%)`;

  try {
    createSquare(ctx, nextGrowingLeaf.x, nextGrowingLeaf.y, oldLeaves, i);
  } catch {
    console.log("error while growing to old");
  }

  if (i % 10 === 0) {  
    createSquare(ctx, x, y, flowersRose, i);
  } else if (i % 11 === 0) {
    createSquare(ctx, x, y, flowersYellow, i);
  }
  
}


function isSquareOccupied(x, y) {
  return squares.some((element) => element.x === x && element.y === y);
}




function petThePlant(ctx, canvas) {
  const fractionToGrow = 0.3;
  const squaresToGrow = Math.floor(squares.length * fractionToGrow);
  let squaresGrown = 0; 

  // function grow() {
  //   if (squaresGrown < squaresToGrow) {
  //     newLeaf(ctx, canvas);
  //     console.log("petting the plant grew it from", squaresGrown, " to ", squaresToGrow);
  //     squaresGrown++;
  //     setTimeout(grow, growSpeed / 3);
  //   }
  // }
      newLeaf(ctx, canvas);
      console.log("petting the plant grew it from", squaresGrown, " to ", squaresToGrow);
      squaresGrown++;
      setTimeout(petThePlant, growSpeed / 3);

}

main();
