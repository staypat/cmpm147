// sketch.js - purpose and description here
// Author: Patrick Hu
// Date: 4/23/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
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

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    randomSeed(seed);
    drawGrid(currentGrid);
}

function preload() {
  tilesetImage = loadImage("./img/tilesetP8.png");
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
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
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      let river = noise(i / 30, j / 30);
      if (abs(river - 0.5) < 0.04) {
        row.push("w");
      } else {
        let environment = noise(i / 0.001, j / 0.001);
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
  background(128);
  
  const time = millis() / 750;

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      placeTile(i, j, floor(4 * random()), 13);
      if (gridCheck(grid, i, j, "w")) {
        placeTile(i, j, (4 * pow(noise(time / 15, i, j / 4 + time), 5)), 14);
      } else {
        drawContext(grid, i, j, "w", 12, 18);
      }
      if (gridCheck(grid, i, j, ":")) {
        placeTile(i, j, floor(random(14, 19)), 14);
      }
      if (gridCheck(grid, i, j, "h")) {
        placeTile(i, j, 27, floor(random(0, 4)));
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

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
  regenerateGrid();
}