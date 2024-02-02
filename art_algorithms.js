// art_algorithms.js

class BasicAlgorithm {
  constructor(paintingArea, colorPalette) {
    this.paintingArea = paintingArea;
    this.colorPalette = colorPalette;
  }

  generateStrokes(numStrokes, sizeRange, bendinessRange) {
    let strokes = [];
    for (let i = 0; i < numStrokes; i++) {
      let position = createVector(
        random(this.paintingArea.width),
        random(this.paintingArea.height)
      );
      let color = this.colorPalette.getRandomColor();
      let size = random(sizeRange[0], sizeRange[1]);
      let direction = random(TWO_PI);
      let bendiness = int(random(bendinessRange[0], bendinessRange[1]));

      let stroke = new BrushStroke(position, color, size, direction, bendiness); // BrushStroke defined in brushes.js
      stroke.create();
      strokes.push(stroke);
    }
    return strokes;
  }
}

// More algorithms can be added here following a similar pattern
