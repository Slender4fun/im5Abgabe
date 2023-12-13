const container = document.getElementById('container');
let squares = [];
let greenSquares = [];
// Create an array to store red squares
const redSquares = [];
i = 1;

function createSquare(x, y, color) {
    const square = document.createElement('div');
    square.className = 'square';
    square.style.left = x + 'px';
    square.style.top = y + 'px';
    square.style.backgroundColor = color;
    //give the square an id 
    square.id = i;
    container.appendChild(square);
    squares.push(square);

    return square;
}

// Create the first square
let lastSquare = createSquare(400, 385, 'brown');

function growPlant() {
    if (i < 1000) {
        const x = parseInt(lastSquare.style.left);
        const y = parseInt(lastSquare.style.top);

        // Calculate the positions of adjacent squares
        const leftX = x - 20;
        const rightX = x + 20;
        const topY = y - 20;
        const bottomY = y + 20;

        // Check if the adjacent squares are free and name them 
        if (!isSquareOccupied(leftX, y)) {
            leftSquare = createSquare(leftX, y, '');
            // leftSquare.innerHTML = i;
            // console.log('left '+ i);
            i++;
        }
        if (!isSquareOccupied(rightX, y)) {
            rightSquare = createSquare(rightX, y, '');
            // rightSquare.innerHTML = i;
            // console.log('right '+ i);
            i++;
        }
        if (!isSquareOccupied(x, topY)) {
            topSquare = createSquare(x, topY, '');
            // topSquare.innerHTML = i;
            // console.log('top '+ i);
            i++;
        }
        if (bottomY < 350 && !isSquareOccupied(x, bottomY)) {
            bottomSquare = createSquare(x, bottomY, '');
            // bottomSquare.innerHTML = i;
            redSquares.push(bottomSquare);
            // console.log('bottom '+ i);
            i++;
        }
        // Add red squares to the redSquares array
        redSquares.push(leftSquare, rightSquare, topSquare, topSquare, leftSquare, rightSquare, topSquare, topSquare, );
        

        function isSquareOccupied(x, y) {
            // Check if the square at (x, y) is occupied by iterating through the squares array
            for (const square of squares) {
                const squareX = parseInt(square.style.left);
                const squareY = parseInt(square.style.top);
                if (squareX === x && squareY === y) {
                    return true;
                }
            }
            return false;
        }


        // creating the newest leaf
        const randomIndex = Math.floor(Math.random() * redSquares.length);
        const randomSquare = redSquares[randomIndex];
        randomSquare.style.backgroundColor = 'rgb(0, 128, 0)';
        lastSquare = randomSquare;

        // Remove the square from the redSquares array
        redSquares.splice(randomIndex, 1);
        // Add the square to the greenSquares array
        greenSquares.push(randomSquare);

        // take every green square that has an id that is a multiple of 10 and make it a flower
        // for (const square of greenSquares) {
        //     if (lastSquare.id - square.id <= 10) {
        //         square.style.backgroundColor = 'brown';
        //     }
        // }
        
        itenth = i * 0.1;

        // get the squares in greenSquares that have an id that is a older than 10 and make them brown
        console.log(i);
        for (const square of greenSquares) { 
            console.log('square.id', square);
            if (square.id <=  itenth) {
                square.style.backgroundColor = 'brown';
            }
            // take every green square that has an id that is a multiple of 10 and make it a flower
            if (square.id % 10 === 0) {
                square.style.backgroundColor = 'rgb(255, 255, 0)';
            }
        }
        


        // Make a delay
        setTimeout(growPlant, 50);
        
    }
}


//wait for key input before advancing
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        i = ispace;
        growPlant();
    }
    if (event.key === ' ') {
        ispace = i;
        i = 1000;
    }
});


growPlant();


