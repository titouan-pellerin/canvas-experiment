import "./style.scss";

import { Point } from "./utils/Point";
import SimplexNoise from "simplex-noise";

const canvas = document.querySelector(".main-canvas");
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

const ctx = canvas.getContext("2d");

const noise = new SimplexNoise();

let time = 0;
let colors = [
  "#DC1C13",
  "#EA4C46",
  "#F07470",
  "#F1959B",
  "#F6BDC0",
  "#F6BDC0",
  "#F1959B",
  "#F07470",
  "#EA4C46",
  "#DC1C13",
];

const points = [];
const steps = 400;
const count = 10;

const frequency = 6;

for (let i = 0; i <= steps * count; i++) {
  points.push(
    new Point(canvas.width / 2, canvas.height / 2, 1, "#DC1C13", ctx)
  );
}

const update = () => {
  requestAnimationFrame(update);

  let t = Math.sin(time);

  let radius = 200;

  ctx.fillStyle = "#131313";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  ctx.translate(canvas.width / 2, canvas.height / 2);

  let angle = 0;
  for (let y = 0; y <= count; y++) {
    for (let i = 0; i <= steps; i++) {
      let progress = i / steps;
      angle = Math.PI * 2 * progress;

      let n = noise.noise2D(t, Math.cos(angle * frequency) * 0.1);
      radius = 400 * n;

      points[y * i].x =
        Math.cos(angle + noise.noise2D(t, t * noise.noise2D(t, t * n))) *
        (radius + y * count) *
        (1 / t);
      points[y * i].y =
        (Math.sin(angle + noise.noise2D(t, t * noise.noise2D(t, t * n))) *
          (radius + y * count)) /
        t;
      points[y * i].color = colors[y];
      points[y * i].draw();
    }
  }

  ctx.restore();

  time += 0.01;
};

requestAnimationFrame(update);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
});
