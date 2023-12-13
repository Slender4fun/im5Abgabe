let allSquares = [];
const borderLeaves = [];
let i = 1;


const pixelSize = Math.floor(window.innerWidth / 150);
const pixelAmount = 5000; 
console.log(pixelAmount);
const growSpeed = 20;   

////////////////// Flower Pot Variables
  const topPotWidth = 12 * pixelSize;
  const bottomPotWidth = 8 * pixelSize;
  const potHeight = 10 * pixelSize;
  const potColorTop = "#814220";
  const potColorBottom = "#8b4513";  
  const rimColor = "brown";
  const rimHeight = 1 * pixelSize;
////////////////// Flower Pot Variables
 

  const budColor = "#8b4"; 
  // const budColor = "#fb0000";   

  const leafColor = "green";
  const stemColor = "brown";
  let oldLeaves = "hsl(120, 61%, 24%)";
  const flowersYellow = "rgb(255, 255, 0)";
  const flowersRose = "hsl(285, 84%, 82%)";
////////////////// Leaf Variables 

let buds = [];
let value;
let flip = 0;     
let darkness = 70;
let stash = [];
 
 


function main() {
  const { canvas, ctx } = createCanvas();
  createFlowerPot(canvas, ctx);
  // createSquare(ctx, (canvas.width / 4)-pixelSize/2, canvas.height - potHeight - rimHeight * 1.5, "brown", 0, 'bud');
  // allSquares.push({id:0, x: (canvas.width / 4)-pixelSize/2, y: canvas.height - potHeight - rimHeight * 1.5, color: "blue", typeOfSquare: "bud", drawn: 'notDrawn'});
  allSquares.push({id:0, x: (canvas.width / 4)-pixelSize/2, y: canvas.height - potHeight - rimHeight * 1.5, color: 'brown', typeOfSquare: "bud", drawn: 'notDrawn'});

  growPlant(ctx, canvas);
}

function checkTheseDamnSquares() {
  allSquares.forEach((square) => {
    // check if there are double squares
    allSquares.forEach((otherSquare) => {
      if (square.x === otherSquare.x && square.y === otherSquare.y && square.id !== otherSquare.id) {
        console.log("double square");
        console.log(square);
        console.log(otherSquare);
      }
      else {
        console.log("no double square");
      }
    });
  });
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



function drawSquare(ctx, darkness) {
  allSquares.forEach((square) => {
    if (square.drawn !== true) {
      if (square.typeOfSquare === "leaf") {
        square.color = `hsl(120, 61%, ${Math.floor(Math.random() * 40) + 30}%)`;
      }
      if (square.typeOfSquare === "petal") {
        square.color = `hsl(310, 100%, ${Math.round(Math.random() * 30) + darkness}%)`; 
      }
      ctx.fillStyle = square.color;  // Set the fill style of the context to the specified color
      ctx.fillRect(square.x, square.y, pixelSize, pixelSize);  // Fill a rectangle at the specified position with the specified size
      square.drawn = true;
    }
  });
}
   
function growPlant(ctx, canvas) {


  if (i < pixelAmount && !allSquares.some(square => square.y < 20)){
    setTimeout(function () {
      growNewBud(ctx);
      growNewLeaves(ctx);
      drawSquare(ctx, 70);
      growPlant(ctx, canvas); // Call growPlant() again, to loop the animation
    }, growSpeed);
  } 
  
  
  else if (i < pixelAmount && allSquares.some(square => square.y < 20)) {
    // if (flip === 0) {
      if (stash.length > 0) {
        stash = stash.concat(allSquares);
      }
      else {
        stash = allSquares;
      }
      allSquares = []
      allSquares.push({i, x: (canvas.width / 4)-pixelSize/2, y: canvas.height - potHeight - rimHeight * 1.5, color: 'black', typeOfSquare: "bud", drawn: 'notDrawn'});
      console.log("allSquares", allSquares);
      console.log("second run");
      growPlant(ctx, canvas); // Call growPlant() again, to loop the animation
    // }                   
  }
  
  if (i >= pixelAmount) {

    firstWave = allSquares.length;
    if (stash.length > 0) {
      allSquares = stash.concat(allSquares);
    }
    updateLeafToPetal(ctx, 0); // Start the process of updating leaves to petals
  }
}

function updateLeafToPetal(ctx, index) {
  if (index < allSquares.length) {
    let square = allSquares[index];
    if (square.typeOfSquare === "leaf") {
      square.typeOfSquare = 'petal';
      square.drawn = 'notDrawnAsPetal'; // Set to false to ensure it gets redrawn
      darkness = 50 + (square.id / firstWave) * (pixelAmount/5000);  

      drawSquare(ctx, darkness); // Redraw squares

      // Call the function again for the next square after a delay
      setTimeout(() => updateLeafToPetal(ctx, index + 1), growSpeed/2); // Replace yourDelay with the desired delay in milliseconds
    } else if (square.typeOfSquare === "bud") {
      // If it's a bud, color it yellow
      square.color = flowersYellow;
      square.drawn = 'notDrawnAsPetal'; // Set to false to ensure it gets redrawn
      drawSquare(ctx, darkness); // Redraw squares
    
      setTimeout(() => updateLeafToPetal(ctx, index + 1), growSpeed/2); // Replace yourDelay with the desired delay in milliseconds
    }
    else {
      // If it's not a leaf, move to the next square immediately
      updateLeafToPetal(ctx, index + 1);
    }
  }
}
       
function growNewBud(ctx) {
  allSquares.forEach((square, index) => {
    if (square.typeOfSquare === "bud") {
      const x = square.x;
      const y = square.y;
      const leftX = x - pixelSize;
      const rightX = x + pixelSize;
      const topY = y - pixelSize;
      const topleft = isSquareOccupied(leftX, topY,  square.id);
      const topright = isSquareOccupied(rightX, topY,  square.id);
      const top = isSquareOccupied(x, topY,  square.id);
      const left = isSquareOccupied(leftX, y,  square.id);
      const right = isSquareOccupied(rightX, y,  square.id);

      // if (allSquares.length > 20) {
      //   let budsCount = allSquares.filter(square => square.typeOfSquare === "bud").length;
      //   let probabilityFactor = 1 - (budsCount / (allSquares.length || 1));

      //   if (Math.random() < probabilityFactor) {
      //     square.typeOfSquare = "stem";
      //     square.color = stemColor;
      //     square.drawn = 'notDrawn';
      //   } else {
      //     square.typeOfSquare = "bud";
      //     square.color = budColor;
      //   }    
      // } else {
        let randomOfTurningToStem = Math.floor(Math.random() * 4) + 1;
        if (randomOfTurningToStem > 2 && allSquares.filter(square => square.typeOfSquare === "bud").length > 1) {
          // if more than 2 sides are stem, turn to leaf
          if (topleft && topright && top && left && right) {
            square.typeOfSquare = "leaf";
            square.color = leafColor;
            square.drawn = 'notDrawn';
          }
          else { 
            square.typeOfSquare = "stem";
            square.color = stemColor;
            square.drawn = 'notDrawn';
          }
          // square.typeOfSquare = "stem";
          // square.color = "brown";
          // square.drawn = 'notDrawn'; 
        }
      // }  

      let random = Math.floor(Math.random() * 4) + 1;
      switch(random) {
        case 1:
          if (!top) {
            allSquares.push({id:i, x, y:topY, color: budColor, typeOfSquare: "bud", drawn: 'notDrawn'});
            i++;
            return;
          }
        case 2:
          if (!topleft) {
            allSquares.push({id:i, x:leftX, y:topY, color: budColor, typeOfSquare: "bud", drawn: 'notDrawn'});
            i++;
            return;  
          }
        case 3:
          if (!topright) {
            allSquares.push({id:i, x:rightX, y:topY, color: budColor, typeOfSquare: "bud", drawn: 'notDrawn'});
            i++;
            return;
          }
        case 4:
          // if there are more than two buds, don't grow a new one
          if (allSquares.filter(square => square.typeOfSquare === "bud").length > 2) {
            return;
          }
        // case 5:
        //   // if there are more than two buds, don't grow a new one
        //   if (allSquares.filter(square => square.typeOfSquare === "bud").length > 2) {
        //     return;
        //   }        
          
           
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
      const topleft = isSquareOccupied(leftX, topY,  square.id);
      const topright = isSquareOccupied(rightX, topY,  square.id);
      const top = isSquareOccupied(x, topY, square.id);
      const left = isSquareOccupied(leftX, y,  square.id);
      const right = isSquareOccupied(rightX, y,  square.id);

      const random = Math.floor(Math.random() * 3) + 1; 
      switch(random) { 
        case 1:
          if (!top) {
            allSquares.push({id:i, x, y:topY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            // drawSquare(ctx,);
            i++;
            return;
          }
          break;
        case 2:
          if (!left) {
            allSquares.push({id:i, x:leftX, y, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            // drawSquare(ctx,);
            i++;
            return;
          }
          break;
        case 3:
          if (!right) {
            allSquares.push({id:i, x:rightX, y, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
            // drawSquare(ctx,);
            i++;
            return;
          }
          break;
        default:
          console.error("no leaf grown", random);
          break;

        // case 4:
        //   if (!topleft) {
        //     allSquares.push({id:i, x:leftX, y:bottomY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
        //     drawSquare(ctx,);
        //     i++;
        //   }
        //   break;
        // case 5:
        //   if (!topright) {
        //     allSquares.push({id:i, x:rightX, y:bottomY, color: leafColor, typeOfSquare: "leaf", drawn: 'notDrawn'});
        //     drawSquare(ctx,);
        //     i++;
        //   }
        //   break;
      }
    }
  });
}


// function isSquareOccupied(x, y, id) {
//   allSquares.forEach((square) => {
//     if (square.x === x && square.y === y && square.id !== id) {
//       value = true;
//     }
//     else {
//       value = false;
//     }
//   });
//   // return allSquares.some((element) => element.x === x && element.y === y);
//   return value;
// }

function isSquareOccupied(x, y, id) {
  for (let square of allSquares) {
    if (square.x === x && square.y === y && square.id !== id) {
      return true;
    }
  }
  return false;
}  


main();
    