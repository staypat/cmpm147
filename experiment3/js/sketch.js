// sketch.js - purpose and description here
// Author: Patrick Hu
// Date: 4/23/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
// let seed = 0;
// let tilesetImage;
// let currentGrid = [];
// let numRows, numCols;

// const lookup = [
//   [1, 1],
//   [1, 0],
//   [0, 1],
//   [0, 0],
//   [2, 1],
//   [2, 0],
//   [1, 1],
//   [1, 0],
//   [1, 2],
//   [1, 1],
//   [0, 2],
//   [0, 1],
//   [2, 2],
//   [2, 1],
//   [1, 2],
//   [1, 1]
// ];

// function resizeScreen() {
//   centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
//   centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
//   console.log("Resizing...");
//   resizeCanvas(canvasContainer.width(), canvasContainer.height());
//   // redrawCanvas(); // Redraw everything based on new size
// }

// // setup() function is called once when the program starts
// function setup() {
//   // place our canvas, making it fit our container
//   canvasContainer = $("#canvas-container");
//   let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
//   canvas.parent("canvas-container");
//   // resize canvas is the page is resized
//   $(window).resize(function() {
//     resizeScreen();
//   });
//   resizeScreen();

//   numCols = select("#asciiBox").attribute("rows") | 0;
//   numRows = select("#asciiBox").attribute("cols") | 0;

//   createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
//   select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

//   select("#reseedButton").mousePressed(reseed);
//   select("#asciiBox").input(reparseGrid);

//   reseed();
// }

// // draw() function is called repeatedly, it's the main animation loop
// function draw() {
//     randomSeed(seed);
//     drawGrid(currentGrid);
// }

// function preload() {
//   tilesetImage = loadImage("./img/tilesetP8.png");
// }

// function reseed() {
//   seed = (seed | 0) + 1109;
//   randomSeed(seed);
//   noiseSeed(seed);
//   select("#seedReport").html("seed " + seed);
//   regenerateGrid();
// }

// function regenerateGrid() {
//   select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
//   reparseGrid();
// }

// function reparseGrid() {
//   currentGrid = stringToGrid(select("#asciiBox").value());
// }

// function gridToString(grid) {
//   let rows = [];
//   for (let i = 0; i < grid.length; i++) {
//     rows.push(grid[i].join(""));
//   }
//   return rows.join("\n");
// }

// function stringToGrid(str) {
//   let grid = [];
//   let lines = str.split("\n");
//   for (let i = 0; i < lines.length; i++) {
//     let row = [];
//     let chars = lines[i].split("");
//     for (let j = 0; j < chars.length; j++) {
//       row.push(chars[j]);
//     }
//     grid.push(row);
//   }
//   return grid;
// }

// function placeTile(i, j, ti, tj) {
//   image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
// }

// function generateGrid(numCols, numRows) {
//   let grid = [];
//   for (let i = 0; i < numRows; i++) {
//     let row = [];
//     for (let j = 0; j < numCols; j++) {
//       let river = noise(i / 30, j / 30);
//       if (abs(river - 0.5) < 0.04) {
//         row.push("w");
//       } else {
//         let environment = noise(i / 0.001, j / 0.001);
//         if (environment > 0.7) {
//           row.push(":");
//         } else if(environment > 0.6){
//           row.push("h");
//         } else{
//           row.push(".");
//         }
//       }
//     }
//     grid.push(row);
//   }
  
//   return grid;
// }

// function drawGrid(grid) {
//   background(128);
  
//   const time = millis() / 750;

//   for(let i = 0; i < grid.length; i++) {
//     for(let j = 0; j < grid[i].length; j++) {
//       placeTile(i, j, floor(4 * random()), 13);
//       if (gridCheck(grid, i, j, "w")) {
//         placeTile(i, j, (4 * pow(noise(time / 15, i, j / 4 + time), 5)), 14);
//       } else {
//         drawContext(grid, i, j, "w", 12, 18);
//       }
//       if (gridCheck(grid, i, j, ":")) {
//         placeTile(i, j, floor(random(14, 19)), 14);
//       }
//       if (gridCheck(grid, i, j, "h")) {
//         placeTile(i, j, 27, floor(random(0, 4)));
//       }
//     }
//   }
// }

// function gridCheck(grid, i, j, target) {
//   if(i >= 0 && i < grid.length && j >= 0 && j < grid[i].length){
//     if(grid[i][j] == target){
//       return true;
//     }
//   }
//   return false;
// }

// function gridCode(grid, i, j, target) {
//   let north = gridCheck(grid, i - 1, j, target);
//   let south = gridCheck(grid, i + 1, j, target);
//   let east = gridCheck(grid, i, j + 1, target);
//   let west = gridCheck(grid, i, j - 1, target);
  
//   let bitMask = (north << 0) + (west << 1) + (east << 2) + (south << 3);
//   return bitMask;
// }

// function drawContext(grid, i, j, target, dti, dtj) {
//   let code = gridCode(grid, i, j, target);
//   const [tiOffset, tjOffset] = lookup[code];
//   placeTile(i, j, dti + tiOffset, dtj + tjOffset);
// }

const w1 = (sketch) => {
  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;
  
  const lookup = [
    [1, 1],
    [1, 0],
    [0, 1],
    [0, 0],
    [2, 1],
    [2, 0],
    [1, 1],
    [1, 0],
    [1, 2],
    [1, 1],
    [0, 2],
    [0, 1],
    [2, 2],
    [2, 1],
    [1, 2],
    [1, 1]
  ];
  
  sketch.resizeScreen = () => {
    centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
    centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
    console.log("Resizing...");
    sketch.resizeCanvas(canvasContainer.width(), canvasContainer.height());
    // redrawCanvas(); // Redraw everything based on new size
  };
  
  // setup() function is called once when the program starts
  sketch.setup = () => {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container-1");
    let canvas = sketch.createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container-1");
    // resize canvas is the page is resized
    sketch.windowResized = () => {
      sketch.resizeScreen();
    };
    sketch.resizeScreen();
  
    numCols = sketch.select("#asciiBox1").attribute("rows") | 0;
    numRows = sketch.select("#asciiBox1").attribute("cols") | 0;
  
    sketch.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer1");
    sketch.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;
  
    sketch.select("#reseedButton1").mousePressed(reseed);
    sketch.select("#asciiBox1").input(reparseGrid);
  
    reseed();
  };
  
  // draw() function is called repeatedly, it's the main animation loop
  sketch.draw = () => {
      sketch.randomSeed(seed);
      drawGrid(currentGrid);
  }
  
  sketch.preload = () => {
    tilesetImage = sketch.loadImage("./img/tilesetP8.png");
  }
  
  function reseed() {
    seed = (seed | 0) + 1109;
    sketch.randomSeed(seed);
    sketch.noiseSeed(seed);
    sketch.select("#seedReport1").html("seed " + seed);
    regenerateGrid();
  }
  
  function regenerateGrid() {
    sketch.select("#asciiBox1").value(gridToString(generateGrid(numCols, numRows)));
    reparseGrid();
  }
  
  function reparseGrid() {
    currentGrid = stringToGrid(sketch.select("#asciiBox1").value());
  }
  
  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }
  
  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }
  
  function placeTile(i, j, ti, tj) {
    sketch.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }
  
  function generateGrid(numCols, numRows) {
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        let river = sketch.noise(i / 30, j / 30);
        if (sketch.abs(river - 0.5) < 0.04) {
          row.push("w");
        } else {
          let environment = sketch.noise(i / 0.001, j / 0.001);
          if (environment > 0.7) {
            row.push(":");
          } else if(environment > 0.6){
            row.push("h");
          } else{
            row.push(".");
          }
        }
      }
      grid.push(row);
    }
    
    return grid;
  }
  
  function drawGrid(grid) {
    sketch.background(128);
    
    const time = sketch.millis() / 750;
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        placeTile(i, j, sketch.floor(4 * sketch.random()), 13);
        if (gridCheck(grid, i, j, "w")) {
          placeTile(i, j, (4 * sketch.pow(sketch.noise(time / 15, i, j / 4 + time), 5)), 14);
        } else {
          drawContext(grid, i, j, "w", 12, 18);
        }
        if (gridCheck(grid, i, j, ":")) {
          placeTile(i, j, sketch.floor(sketch.random(14, 19)), 14);
        }
        if (gridCheck(grid, i, j, "h")) {
          placeTile(i, j, 27, sketch.floor(sketch.random(0, 4)));
        }
      }
    }
  }
  
  function gridCheck(grid, i, j, target) {
    if(i >= 0 && i < grid.length && j >= 0 && j < grid[i].length){
      if(grid[i][j] == target){
        return true;
      }
    }
    return false;
  }
  
  function gridCode(grid, i, j, target) {
    let north = gridCheck(grid, i - 1, j, target);
    let south = gridCheck(grid, i + 1, j, target);
    let east = gridCheck(grid, i, j + 1, target);
    let west = gridCheck(grid, i, j - 1, target);
    
    let bitMask = (north << 0) + (west << 1) + (east << 2) + (south << 3);
    return bitMask;
  }
  
  function drawContext(grid, i, j, target, dti, dtj) {
    let code = gridCode(grid, i, j, target);
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, dti + tiOffset, dtj + tjOffset);
  }
}

let world1 = new p5(w1, 'w1');

const w2 = (sketch) => {
  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;
  
  const lookup = [
    [1, 1],
    [1, 0],
    [0, 1],
    [0, 0],
    [2, 1],
    [2, 0],
    [1, 1],
    [1, 0],
    [1, 2],
    [1, 1],
    [0, 2],
    [0, 1],
    [2, 2],
    [2, 1],
    [1, 2],
    [1, 1]
  ];
  
  sketch.resizeScreen = () => {
    centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
    centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
    console.log("Resizing...");
    sketch.resizeCanvas(canvasContainer.width(), canvasContainer.height());
    // redrawCanvas(); // Redraw everything based on new size
  };
  
  // setup() function is called once when the program starts
  sketch.setup = () => {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container-2");
    let canvas = sketch.createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container-2");
    // resize canvas is the page is resized
    sketch.windowResized = () => {
      sketch.resizeScreen();
    };
    sketch.resizeScreen();
  
    numCols = sketch.select("#asciiBox2").attribute("rows") | 0;
    numRows = sketch.select("#asciiBox2").attribute("cols") | 0;
  
    sketch.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer2");
    sketch.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;
  
    sketch.select("#reseedButton2").mousePressed(reseed);
    sketch.select("#asciiBox2").input(reparseGrid);
  
    reseed();
  };
  
  // draw() function is called repeatedly, it's the main animation loop
  sketch.draw = () => {
      sketch.randomSeed(seed);
      drawGrid(currentGrid);
  }
  
  sketch.preload = () => {
    tilesetImage = sketch.loadImage("./img/tilesetP8.png");
  }
  
  function reseed() {
    seed = (seed | 0) + 1109;
    sketch.randomSeed(seed);
    sketch.noiseSeed(seed);
    sketch.select("#seedReport2").html("seed " + seed);
    regenerateGrid();
  }
  
  function regenerateGrid() {
    sketch.select("#asciiBox2").value(gridToString(generateGrid(numCols, numRows)));
    reparseGrid();
  }
  
  function reparseGrid() {
    currentGrid = stringToGrid(sketch.select("#asciiBox2").value());
  }
  
  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }
  
  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }
  
  function placeTile(i, j, ti, tj) {
    sketch.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }
  
  function generateGrid(numCols, numRows) { // Done with the help of ChatGPT
    let grid = [];
  
    // Helper function to randomly generate rooms
    function generateRoom() {
      const minRoomSize = 3;
      const maxRoomSize = 6;
      const roomWidth = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
      const roomHeight = Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
      const startX = Math.floor(Math.random() * (numCols - roomWidth));
      const startY = Math.floor(Math.random() * (numRows - roomHeight));
      for (let y = startY; y < startY + roomHeight; y++) {
        for (let x = startX; x < startX + roomWidth; x++) {
          if (Math.random() < 0.04) {
            grid[y][x] = "c";
          } else {
            grid[y][x] = ".";
          }
        }
      }
      return { startX, startY, roomWidth, roomHeight };
    }
  
    // Helper function to connect rooms with hallways
    function connectRooms(room1, room2) {
      const center1X = Math.floor(room1.startX + room1.roomWidth / 2);
      const center1Y = Math.floor(room1.startY + room1.roomHeight / 2);
      const center2X = Math.floor(room2.startX + room2.roomWidth / 2);
      const center2Y = Math.floor(room2.startY + room2.roomHeight / 2);
      for (let x = Math.min(center1X, center2X); x <= Math.max(center1X, center2X); x++) {
        grid[center1Y][x] = ".";
      }
      for (let y = Math.min(center1Y, center2Y); y <= Math.max(center1Y, center2Y); y++) {
        grid[y][center2X] = ".";
      }
    }
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("#");
      }
      grid.push(row);
    }
  
    // Generate a fixed number of rooms
    const numRooms = Math.floor(Math.random() * 5) + 3; // Random number between 3 and 7 rooms
    const rooms = [];
    for (let i = 0; i < numRooms; i++) {
      rooms.push(generateRoom());
    }
  
    // Connect rooms with hallways
    for (let i = 0; i < rooms.length - 1; i++) {
      connectRooms(rooms[i], rooms[i + 1]);
    }
  
    return grid;
  }
  
  function drawGrid(grid) {
    sketch.background(128);
  
    const time = sketch.millis() / 750;

    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (gridCheck(grid, i, j, "#")){
          placeTile(i, j, (4 * sketch.pow(sketch.noise(time / 15, i, j / 4 + time), 5)), 9);
        }
        if (gridCheck(grid, i, j, ".")) {
          placeTile(i, j, sketch.floor(sketch.random(0, 4)), 10);
        }else{
          drawContext(grid, i, j, ".", 4, 3);
        }
        if (gridCheck(grid, i, j, "c")) {
          placeTile(i, j, sketch.floor(sketch.random(0, 6)), 28);
        }
      }
    }
  }
  
  function gridCheck(grid, i, j, target) {
    if(i >= 0 && i < grid.length && j >= 0 && j < grid[i].length){
      if(grid[i][j] == target){
        return true;
      }
    }
    return false;
  }
  
  function gridCode(grid, i, j, target) {
    let north = gridCheck(grid, i - 1, j, target);
    let south = gridCheck(grid, i + 1, j, target);
    let east = gridCheck(grid, i, j + 1, target);
    let west = gridCheck(grid, i, j - 1, target);
    
    let bitMask = (north << 0) + (west << 1) + (east << 2) + (south << 3);
    return bitMask;
  }
  
  function drawContext(grid, i, j, target, dti, dtj) {
    let code = gridCode(grid, i, j, target);
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, dti + tiOffset, dtj + tjOffset);
  }
}

let world2 = new p5(w2, 'w2');