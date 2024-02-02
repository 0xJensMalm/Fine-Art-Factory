// brushes.js

class BrushStroke {
  constructor(position, color, size, direction, bendiness, length) {
    this.position = position;
    this.color = color;
    this.size = size;
    this.direction = direction;
    this.bendiness = bendiness;
    this.length = length; // Added length parameter
    this.path = [];
  }

  create() {
    let currentPoint = this.position.copy();
    for (let i = 0; i < this.length; i++) {
      // Use length for path generation
      this.path.push(currentPoint.copy());
      let step = p5.Vector.fromAngle(
        this.direction + random(-this.bendiness, this.bendiness)
      );
      step.setMag(1);
      currentPoint.add(step);
    }
  }

  display(pGraphics) {
    //console.log("Displaying BrushStroke with path length:", this.path.length);
    pGraphics.push();
    pGraphics.stroke(this.color);
    pGraphics.noFill();
    pGraphics.beginShape();
    for (let i = 0; i < this.path.length; i++) {
      let p = this.path[i];
      pGraphics.vertex(p.x, p.y);
    }
    pGraphics.endShape();
    pGraphics.pop();
  }
}
