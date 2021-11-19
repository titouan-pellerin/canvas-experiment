export class Point {
  constructor(x, y, size = 5, color, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.direction = Math.random() * Math.PI * 2;
    // this.direction = Math.PI * -1.5;

    this.lifespan = Math.random() * 2;
    this.originalLifespan = this.lifespan;

    this.color = color;
    this.opacity = 1;
  }

  draw() {
    // this.update();
    // this.ctx.globalAlpha = 1;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    // this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.arc(0, 0, this.size, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  // update() {
  //   if (this.lifespan < 0.01) this.lifespan = 0;
  //   else this.lifespan -= 0.01;

  //   this.opacity = this.lifespan / this.originalLifespan;

  //   this.x += Math.cos(this.direction);
  //   this.y += Math.sin(this.direction) + Math.PI * 1.5;
  // }

  randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
