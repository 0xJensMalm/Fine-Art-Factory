class HommageADurer {
  constructor(paintingArea) {
    this.paintingArea = paintingArea;
    this.cols = 3; // Columns in each "sculpture"
    this.rows = 3; // Rows in each "sculpture"
    this.countX = 3; // Number of sculptures horizontally
    this.countY = 6; // Number of sculptures vertically
    this.backgroundColors = [
      "#F2EFE5",
      "#FFF6E9",
      "#FFF3CF",
      "#EEEDEB",
      "#F5EEE6",
    ];
    this.lineColors = ["#FF6868", "#3652AD", "#80BCBD", "#43766C", "#B80000"];

    // Adjust margins to ensure grid is centralized
    this.adjustMargins();
  }

  adjustMargins() {
    // Calculate the size of each grid cell to fit all within the paintingArea
    let cellWidth = this.paintingArea.width / (this.countX + 1); // +1 for margins on both sides
    let cellHeight = this.paintingArea.height / (this.countY + 1); // +1 for margins on top and bottom

    // Use the smaller of the two to ensure the entire grid fits within the paintingArea
    this.cellSize = Math.min(cellWidth, cellHeight) * 0.7; // 0.7 for some padding within each cell

    // Calculate margins based on the total size of the grid
    this.marginX = (this.paintingArea.width - this.cellSize * this.countX) / 2;
    this.marginY = (this.paintingArea.height - this.cellSize * this.countY) / 2;
  }

  generateArt() {
    let bgIndex = Math.floor(Math.random() * this.backgroundColors.length);
    this.paintingArea.background(this.backgroundColors[bgIndex]);
    this.tile();
  }

  tile() {
    for (let i = 0; i < this.countX; i++) {
      for (let j = 0; j < this.countY; j++) {
        let x = this.marginX + i * this.cellSize;
        let y = this.marginY + j * this.cellSize;
        this.lines(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  lines(x, y, w, h) {
    this.paintingArea.push();
    this.paintingArea.blendMode(this.paintingArea.MULTIPLY);
    this.paintingArea.translate(x + w / 2, y + h / 2); // Center lines within each cell

    let lineIndex = Math.floor(Math.random() * this.lineColors.length);
    this.paintingArea.stroke(this.lineColors[lineIndex]);
    this.paintingArea.strokeWeight(w * 0.03);

    let points = [];
    for (let i = 0; i < this.cols + 1; i++) {
      for (let j = 0; j < this.rows + 1; j++) {
        let nx = i * (w / this.cols) - w / 2; // Adjust for centered translation
        let ny = j * (h / this.rows) - h / 2; // Adjust for centered translation
        points.push(this.paintingArea.createVector(nx, ny));
      }
    }

    points.forEach((point, index) => {
      let otherIndex = index;
      while (otherIndex === index) {
        otherIndex = Math.floor(this.paintingArea.random(points.length));
      }
      let otherPoint = points[otherIndex];
      this.paintingArea.line(point.x, point.y, otherPoint.x, otherPoint.y);
    });

    this.paintingArea.pop();
  }
}

class RisouGrid {
  constructor(paintingArea) {
    this.paintingArea = paintingArea;
    this.n = 20; // Rows in the grid
    this.m = 12; // Columns in the grid
    this.mult = 1; // Size multiplier for each grid cell
    this.grids = [];
    // Define a palette with a variety of colors plus black
    this.palette = [
      "#EAECCC",
      "#FDE767",
      "#DBE7C9",
      "#A94438",
      "#DCF2F1",
      "#FBF6EE",
    ]; // Last color is black
    this.backgroundColor = this.getRandomPaletteColor(true); // Exclude black for background

    this.initializeGrid();
  }

  getRandomPaletteColor(excludeBlack = false) {
    let palette = this.palette;
    if (excludeBlack) {
      palette = this.palette.slice(0, -1); // Exclude the last color (black) for the background
    }
    return palette[Math.floor(Math.random() * palette.length)];
  }

  initializeGrid() {
    let gridWidth = this.paintingArea.width * 0.8; // Use 80% of paintingArea width for grid
    let gridHeight = this.paintingArea.height * 0.8; // Use 80% of paintingArea height for grid
    let s = Math.min(gridWidth / this.m, gridHeight / this.n); // Size of each grid cell, keeping aspect ratio

    // Calculate margins to center the grid
    this.lX = (this.paintingArea.width - s * this.m) / 2;
    this.lY = (this.paintingArea.height - s * this.n) / 2;

    for (let i = 0; i < this.n; i++) {
      this.grids[i] = [];
      for (let j = 0; j < this.m; j++) {
        this.grids[i][j] = new Grid(
          this.lX + j * s,
          this.lY + i * s,
          s * this.mult
        );
      }
    }
  }

  generateArt() {
    // Pick a random background color excluding black
    this.backgroundColor = this.getRandomPaletteColor(true);
    this.paintingArea.background(this.backgroundColor);
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        this.grids[i][j].display(this.paintingArea, i, j);
      }
    }
  }
}

class Grid {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.r = d / 2;
  }

  display(pg, p, q) {
    pg.push();
    pg.translate(this.x + this.d / 2, this.y + this.d / 2);
    pg.stroke(0); // Use black for the shapes
    pg.noFill();
    pg.beginShape();
    for (let i = 0; i < (p + 1) * (q + 1); i++) {
      let t = PI * pg.random(2);
      pg.vertex(this.r * cos(t), this.r * sin(t));
    }
    pg.endShape(CLOSE);
    pg.pop();
  }
}

class PaleOrb {
  constructor(paintingArea) {
    this.paintingArea = paintingArea;
    this.colors1 = ["#40A2E3", "#FFF6E9", "#BBE2EC", "#0D9276", "#37B5B6"];
    this.colors2 = ["#7d483e", "#b87644", "#e6d2c9", "#e45e00", "#905c40"];
  }

  generateArt() {
    this.seed = Math.random() * 2000; // Update the seed for new random variations
    this.paintingArea.clear(); // Clear the previous artwork
    this.paintingArea.pixelDensity(5);
    this.paintingArea.randomSeed(this.seed);
    this.paintingArea.noStroke();
    this.paintingArea.background(5);

    // Create background gradient
    let col1 = this.paintingArea.random(this.colors1);
    let col2 = this.paintingArea.random(this.colors1);
    let gradbg = this.paintingArea.drawingContext.createLinearGradient(
      0,
      0,
      this.paintingArea.width,
      0
    );
    gradbg.addColorStop(0, col1);
    gradbg.addColorStop(1, col2);
    this.paintingArea.drawingContext.fillStyle = gradbg;
    this.paintingArea.rect(
      0,
      0,
      this.paintingArea.width,
      this.paintingArea.height
    );

    // Create orb with gradient
    this.paintingArea.push();
    this.paintingArea.translate(
      this.paintingArea.width / 2,
      this.paintingArea.height / 2
    );
    let col3 = this.paintingArea.random(this.colors1);
    let col4 = this.paintingArea.random(this.colors1);
    let circleR = this.paintingArea.width / 1.5;
    let grad = this.paintingArea.drawingContext.createLinearGradient(
      0,
      0,
      -circleR / 2,
      -circleR / 2
    );
    grad.addColorStop(0, col3);
    grad.addColorStop(1, col4);
    this.paintingArea.drawingContext.fillStyle = grad;
    this.paintingArea.drawingContext.shadowColor = this.paintingArea.color(
      0,
      0,
      0,
      20
    );
    this.paintingArea.drawingContext.shadowOffsetX = 20;
    this.paintingArea.drawingContext.shadowOffsetY = 20;
    this.paintingArea.drawingContext.shadowBlur = 100;
    this.paintingArea.circle(0, 0, circleR);
    this.paintingArea.pop();
  }
}

class Bleed {
  constructor(paintingArea) {
    this.paintingArea = paintingArea;
    this.rows = 7;
    this.cols = 4;
    this.margin = this.paintingArea.width * 0.1;
    this.radius = (this.paintingArea.width - 2 * this.margin) / this.cols / 2;
    this.colors = ["#3EC1D3", "#FF9A00", "#FF165D", "#FFD400", "#D90368"];
  } // OG ["#F1E9DA", "#2E294E", "#541388", "#FFD400", "#D90368"];

  createRaster() {
    let raster = new Array(this.rows)
      .fill(0)
      .map(() => new Array(this.cols).fill(0));

    for (let i = 0; i < (this.rows * this.cols) / 4; i++) {
      let row = Math.floor(Math.random() * this.rows);
      let col = Math.floor(Math.random() * this.cols);
      raster[row][col] = 1;
    }

    return raster;
  }

  drawRaster(raster) {
    this.paintingArea.rectMode(this.paintingArea.RADIUS);
    this.paintingArea.angleMode(this.paintingArea.DEGREES);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let x = this.margin + this.radius + col * 2 * this.radius;
        let y = this.margin + this.radius + row * 2 * this.radius;

        if (raster[row][col] == 1) {
          this.paintingArea.circle(x, y, 2 * this.radius);

          // Draw rectangles between adjacent circles horizontally
          if (col + 1 < this.cols && raster[row][col + 1] == 1) {
            this.paintingArea.rect(
              x + this.radius,
              y,
              this.radius,
              this.radius
            );
          }

          // Draw rectangles between adjacent circles vertically
          if (row + 1 < this.rows && raster[row + 1][col] == 1) {
            this.paintingArea.rect(
              x,
              y + this.radius,
              this.radius,
              this.radius
            );
          }

          // Draw complex shapes for diagonal connections
          if (
            row + 1 < this.rows &&
            col + 1 < this.cols &&
            raster[row + 1][col + 1] == 1
          ) {
            this.paintingArea.push();
            this.paintingArea.translate(x, y);
            this.paintingArea.beginShape();
            this.paintingArea.vertex(0, this.radius);
            for (let angle = -90; angle <= 0; angle++) {
              this.paintingArea.vertex(
                this.radius * Math.cos(this.paintingArea.radians(angle)),
                this.radius * (2 + Math.sin(this.paintingArea.radians(angle)))
              );
            }
            this.paintingArea.vertex(this.radius, 2 * this.radius);
            this.paintingArea.vertex(2 * this.radius, this.radius);
            for (let angle = 90; angle <= 180; angle++) {
              this.paintingArea.vertex(
                this.radius * (2 + Math.cos(this.paintingArea.radians(angle))),
                this.radius * Math.sin(this.paintingArea.radians(angle))
              );
            }
            this.paintingArea.vertex(this.radius, 0);
            this.paintingArea.endShape(this.paintingArea.CLOSE);
            this.paintingArea.pop();
          }
        }
      }
    }
  }

  generateArt() {
    this.paintingArea.colorMode(this.paintingArea.HSL);
    this.paintingArea.noStroke();
    this.paintingArea.background(39, 45, 90); // Set a background color

    for (let c of this.colors) {
      this.paintingArea.fill(this.paintingArea.color(c));
      let raster = this.createRaster();
      this.drawRaster(raster);
    }
  }
}
