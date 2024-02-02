// Constants for canvas and painting dimensions
const CANVAS_WIDTH = 794;
const CANVAS_HEIGHT = 1123;
const PAINTING_WIDTH = 566;
const PAINTING_HEIGHT = 880;

// Art properties
let numStrokes = 150;
let sizeRange = [50, 80];
let bendinessRange = [2, 1000];

// Core objects
let frameSVG;
let paintingArea;
let colorPalette;
let brushStrokes = [];

function preload() {
  frameSVG = loadImage("frame.svg"); // Make sure this path is correct
}

window.generateArt = generateArt;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  imageMode(CENTER);
  rectMode(CENTER);
  paintingArea = createGraphics(PAINTING_WIDTH, PAINTING_HEIGHT);

  colorPalette = new ColorPalette(); // Initialize here, after class definition
  colorPalette.setup();
  drawBackground();
}

function draw() {
  clearPaintingArea();
  displayBrushStrokes();
  drawPaintingArea();
}

function drawBackground() {
  clear();
  image(frameSVG, width / 2, height / 2, width, height);
}

function clearPaintingArea() {
  paintingArea.clear();
}

function displayBrushStrokes() {
  brushStrokes.forEach((stroke) => stroke.display(paintingArea));
}

function drawPaintingArea() {
  image(paintingArea, width / 2, height / 2);
}

function generateArt() {
  brushStrokes = []; // Clear existing strokes
  for (let i = 0; i < numStrokes; i++) {
    brushStrokes.push(generateBrushStroke());
  }
}

function generateBrushStroke() {
  let position = createVector(random(width), random(height));
  let color = colorPalette.getRandomColor();
  let size = random(sizeRange[0], sizeRange[1]);
  let direction = random(TWO_PI);
  let bendiness = int(random(bendinessRange[0], bendinessRange[1]));

  return new BrushStroke(position, color, size, direction, bendiness);
}

function keyReleased() {
  if (key === "s" || key === "S") {
    saveCanvas("FineArtFactory", "png");
  }
}

class ColorPalette {
  constructor() {
    this.colors = [];
  }

  setup() {
    this.colors = [
      "#3a3736",
      "#a24925",
      "#678ca2",
      "#cca83f",
      "#680E0A",
      "#D5F1EA",
      "#F7C519",
      // Add more colors as needed
    ];
  }

  getRandomColor() {
    return color(random(this.colors));
  }
}

class BrushStroke {
  constructor(position, color, size, direction, bendiness) {
    this.position = position;
    this.color = color;
    this.size = size;
    this.bendiness = bendiness;
    this.controlPoints = this.generateControlPoints(direction);
  }

  generateControlPoints(direction) {
    let points = [this.position];
    let currentPoint = this.position.copy();

    for (let i = 0; i < this.bendiness; i++) {
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

  display(pGraphics) {
    pGraphics.push();
    pGraphics.stroke(this.color);
    pGraphics.strokeWeight(this.size);

    for (let i = 1; i < this.controlPoints.length; i++) {
      let startPoint = this.controlPoints[i - 1];
      let endPoint = this.controlPoints[i];
      pGraphics.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    }

    pGraphics.pop();
  }
}
