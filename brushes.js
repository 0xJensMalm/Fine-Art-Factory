// brushes.js

class BrushStroke {
  constructor(position, color, size, direction, bendiness) {
    this.position = position;
    this.color = color;
    this.size = size;
    this.direction = direction;
    this.bendiness = bendiness;
    this.path = [];
  }

  create() {
    let currentPoint = this.position.copy();
    for (let i = 0; i < this.size; i++) {
      this.path.push(currentPoint.copy());
      let step = p5.Vector.fromAngle(
        this.direction + random(-this.bendiness, this.bendiness)
      );
      step.setMag(1);
      currentPoint.add(step);
    }
  }

  display(pGraphics) {
    pGraphics.push();
    pGraphics.stroke(this.color);
    pGraphics.noFill();
    pGraphics.beginShape();
    this.path.forEach((p) => pGraphics.vertex(p.x, p.y));
    pGraphics.endShape();
    pGraphics.pop();
  }
}

// Additional brush styles can be added here
