const allSquares = [];
const borderLeaves = [];
let i = 1;


const pixelSize = window.innerWidth / 150;
const pixelAmount = 200;
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
  // const budColor = "#228b22";
  const budColor = "red";
  const leafColor = "green";
  let oldLeaves = "hsl(120, 61%, 24%)";
  const flowersYellow = "rgb(255, 255, 0)";
  const flowersRose = "hsl(285, 84%, 82%)";
////////////////// Leaf Variables

let buds = [];
 



function main() {
  const { canvas, ctx } = createCanvas();
  createFlowerPot(canvas, ctx);
  // createSquare(ctx, (canvas.width / 4)-pixelSize/2, canvas.height - potHeight - rimHeight * 1.5, "brown", 0, 'bud');
  allSquares.push({id:0, x: (canvas.width / 4)-pixelSize/2, y: canvas.height - potHeight - rimHeight * 1.5, color: "brown", typeOfSquare: "bud", drawn: 'notDrawn'});
  growPlant(ctx, canvas);
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



function drawSquare(ctx) {
  let counterInside = 0;
  allSquares.forEach((square) => {
    if (square.drawn != 'true') {
      ctx.fillStyle = square.color;  // Set the fill style of the context to the specified color
      ctx.fillRect(square.x, square.y, pixelSize, pixelSize);  // Fill a rectangle at the specified position with the specified size
      square.drawn = true;
    }
  });

}




function growPlant(ctx, canvas) {
  if (i < pixelAmount) {
    setTimeout(function () {
      growNewBud(ctx);
      growNewLeaves(ctx);
      console.log("growing plant", i, "of", pixelAmount, "times");


      growPlant(ctx, canvas); // Call growPlant() again, to loop the animation
    }, growSpeed);
  }
}      

function growNewBud(ctx) {
  allSquares.forEach((square) => {
    if (square.typeOfSquare === "bud") {
      console.log("The square", square.id, "is a bud");
      const x = square.x;
      const y = square.y;
      const leftX = x - pixelSize;
      const rightX = x + pixelSize;
      const topY = y - pixelSize;
      const topleft = isSquareOccupied(leftX, topY);
      const topright = isSquareOccupied(rightX, topY);
      const top = isSquareOccupied(x, topY);
      const left = isSquareOccupied(leftX, y);

      console.log("old bud", square);
      console.log("is top free?", !top);

      let randomOfTurningToStem = Math.floor(Math.random() * 10) + 1;
      if (randomOfTurningToStem > 2) {
        square.typeOfSquare = "stem";
        square.color = "brown";
      }


      let random = Math.floor(Math.random() * 3) + 1;
      switch(random) {
        case 1:
          if (!top) {
            allSquares.push({id:i, x, y:topY, color: budColor, typeOfSquare: "bud", drawn: 'notDrawn'});
            drawSquare(ctx,);
            console.log("grew a new bud at the top", x/pixelSize, topY/pixelSize);
            i++;
          }
          break;
        case 2:
          if (!topleft) {

            allSquares.push({id:i, x:leftX, y:topY, color: budColor, typeOfSquare: "bud", drawn: 'notDrawn'});
            drawSquare(ctx,);
            console.log("grew a new bud at top left", leftX/pixelSize, topY/pixelSize);
            i++;
          }
          break;
        case 3:
          if (!topright) {

            allSquares.push({id:i, x:rightX, y:topY, color: budColor, typeOfSquare: "bud", drawn: 'notDrawn'});
            drawSquare(ctx,);
            i++;
          }
          break;        
      }
    }
  });
}

function growNewLeaves(ctx) {
  allSquares.forEach((square) => {
    if (square.typeOfSquare === "stem") {
      const x = square.x;
      const y = square.y;
      const leftX = x - pixelSize;
      const rightX = x + pixelSize;
      const topY = y - pixelSize;
      const bottomY = y + pixelSize;
      const topleft = isSquareOccupied(leftX, topY);
      const topright = isSquareOccupied(rightX, topY);
      const top = isSquareOccupied(x, topY);
      const left = isSquareOccupied(leftX, y);
      const right = isSquareOccupied(rightX, y);

      const random = Math.floor(Math.random() * 20) + 1;
      switch(random) {
        case 1:
          if (!top) {
            allSquares.push({id:i, x, y:topY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            drawSquare(ctx,);
            i++;
          }
          break;
        case 2:
          if (!left) {
            allSquares.push({id:i, x:leftX, y:topY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            drawSquare(ctx,);
            i++;
          }
          break;
        case 3:
          if (!right) {
            allSquares.push({id:i, x:rightX, y:topY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            drawSquare(ctx,);
            i++;
          }
          break;
        case 4:
          if (!topleft) {
            allSquares.push({id:i, x:leftX, y:bottomY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            drawSquare(ctx,);
            i++;
          }
          break;
        case 5:
          if (!topright) {
            allSquares.push({id:i, x:rightX, y:bottomY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            drawSquare(ctx,);
            i++;
          }
          break;
      }
    }
  });
}


function isSquareOccupied(x, y) {
  return allSquares.some((element) => element.x === x && element.y === y);
}

main();
