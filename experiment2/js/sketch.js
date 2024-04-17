// sketch.js - purpose and description here
// Author: Patrick Hu
// Date: 4/15/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let seed = 0;

const flowerColors = ["#D1ABF7", "#9D65AE", "#AC7DB0"];
const treeColor = "#021F08";
const grassColor = "#6CA031";
const skyColor = "#82cff5";
const mountainColor = "#2A7449";

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

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

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// event listener for button
$("#reimagine").click(function() {
  seed++;
});

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  background(100);
  noStroke();
  
  // Sky layer
  fill(skyColor);
  rect(0, 0, width, height);
  
  // Mountain layer by Prof. Adam Smith (https://glitch.com/edit/#!/living-impression-example)
  fill(mountainColor);
  beginShape();
  vertex(0, height / 2.5);
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    let x = (width * i) / steps;
    let y = height / 2 - (random() * height) / 8 - height / 5;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  
  // Grass layer
  fill(grassColor);
  rect(0, height/2.5, width, height);
  
  // Tree layer by Prof. Adam Smith (https://glitch.com/edit/#!/living-impression-example)
  fill(treeColor);
  const trees = 20*random(1, 2);
  for (let i = 0; i < trees; i++){
    let x = randomGaussian(width / 1.5, width * 0.25);
    let y = height / 2.5;
    let s = random(width / 10, width / 20);
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  }
  
  // Flower design by Katie Liu (https://editor.p5js.org/katiejliu/sketches/Je9G3c5z9)
  for (var i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height / 2.5, height);
    let scaleFactor = map(y, height / 2, height, 0.5, 1); // scaleFactor content by ChatGPT
    let flowerSize = 20 * scaleFactor;
    
    // Wind animation
    let windAnim = sin(millis() / 1000) * 10;
    x += windAnim;

    // Draw stem
    fill("#63E655");
    let stemHeight = 33 * scaleFactor;
    let stemWidth = 5 * scaleFactor;
    let stemX = x - stemWidth / 2 - 11 * scaleFactor;
    let stemTopY = y - 7 * scaleFactor;
    rect(stemX, stemTopY, stemWidth, stemHeight);
    
    // Draw petals
    fill(random(flowerColors));
    let petalSpacing = 5 * scaleFactor;
    ellipse(x, y, flowerSize, flowerSize);
    ellipse(x - 15 * scaleFactor, y + petalSpacing, flowerSize, flowerSize);
    ellipse(x - 25 * scaleFactor, y - petalSpacing, flowerSize, flowerSize);
    ellipse(x - 17 * scaleFactor, y - 20 * scaleFactor, flowerSize, flowerSize);
    ellipse(x, y - 15 * scaleFactor, flowerSize, flowerSize);
    
    // Draw pistil
    fill(255, 230, 51);
    fill("#F2E85C");
    ellipse(x - 12 * scaleFactor, y - 7 * scaleFactor, (flowerSize + 2) * scaleFactor);
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}