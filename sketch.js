let frameSVG;
let paintingArea;

let paintingWidth = 566; // Width of the painting area
let paintingHeight = 880; // Height of the painting area

let colorPalette = [];
let brushStrokes = []; // Array to hold brush strokes

let numStrokes = 150; // Total number of brush strokes
let randomSizeRange = [50, 80]; // Range of brush stroke sizes
let randomBendinessRange = [2, 1000]; // Range of bendiness for strokes

function setupColorPalette() {
  // Define some paint-like colors
  colorPalette = [
    color("#3a3736"), // Dark Gray
    color("#a24925"), // Rust
    color("#678ca2"), // Gun Metal
    color("#cca83f"), // Gold
    color("#680E0A"), // Blood Red
    color("#D5F1EA"), // Mint Green
    color("#F7C519"), // Jongquil
    // Add more colors as needed
  ];
}

function preload() {
  frameSVG = loadImage("frame.svg"); // Update this path
}

function setup() {
  createCanvas(794, 1123);
  imageMode(CENTER);
  rectMode(CENTER);
  setupColorPalette();

  // Initialize the painting area as a graphics buffer
  paintingArea = createGraphics(paintingWidth, paintingHeight);

  // Initial draw background and frame
  drawBackground();
}

function drawBackground() {
  clear(); // Clear the main canvas
  // Draw the SVG frame onto the main canvas
  image(frameSVG, width / 2, height / 2, width, height);
}

function draw() {
  // Clear the painting area buffer for fresh drawing
  paintingArea.clear();

  // Iterate over the brush strokes and display each one onto the paintingArea buffer
  brushStrokes.forEach((stroke) => stroke.display());

  // Draw the paintingArea buffer onto the main canvas within the designated area
  image(paintingArea, width / 2, height / 2);
}

class BrushStroke {
  constructor(position, color, size, direction, bendiness) {
    this.color = color;
    this.size = size;
    this.controlPoints = this.generateControlPoints(
      position,
      direction,
      bendiness
    );
  }

  generateControlPoints(position, direction, bendiness) {
    let points = [];
    let currentPoint = position.copy();
    points.push(currentPoint);

    for (let i = 0; i < bendiness; i++) {
      let angleVariation = random(-PI / 6, PI / 6);
      let angle = direction + angleVariation;
      let distance = random(50, 150);
      let nextPoint = p5.Vector.fromAngle(angle)
        .mult(distance)
        .add(currentPoint);
      points.push(nextPoint);
      currentPoint = nextPoint;
    }

    return points;
  }

  display() {
    paintingArea.push();
    paintingArea.stroke(this.color);
    paintingArea.strokeWeight(this.size);

    for (let i = 1; i < this.controlPoints.length; i++) {
      let startPoint = this.controlPoints[i - 1];
      let endPoint = this.controlPoints[i];
      paintingArea.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    }
    paintingArea.pop();
  }
}

function generateArt() {
  brushStrokes = []; // Clear existing strokes

  for (let i = 0; i < numStrokes; i++) {
    let position = createVector(random(width), random(height));
    let color = random(colorPalette);
    let size = random(randomSizeRange[0], randomSizeRange[1]);
    let direction = random(TWO_PI);
    let bendiness = int(
      random(randomBendinessRange[0], randomBendinessRange[1])
    );

    brushStrokes.push(
      new BrushStroke(position, color, size, direction, bendiness)
    );
  }
}

function keyReleased() {
  if (key == "s" || key == "S") {
    saveCanvas("FineArtFactory", "png");
  }
}
