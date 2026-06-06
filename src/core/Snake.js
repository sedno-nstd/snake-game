import { Container, Graphics } from "pixi.js";
import { CONFIG } from "../config";
import { RandomColor } from "../hooks/randomColor";
import { snakeBody } from "../constants/snakeBody.js";

export class Snake {
  constructor() {
    this.body = snakeBody();

    this.direction = "RIGHT";
    this.container = new Container();

    this.color = RandomColor();

    this.initInput();
    this.draw();
  }

  initInput() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" && this.direction !== "DOWN")
        this.direction = "UP";
      if (e.key === "ArrowDown" && this.direction !== "UP")
        this.direction = "DOWN";
      if (e.key === "ArrowLeft" && this.direction !== "RIGHT")
        this.direction = "LEFT";
      if (e.key === "ArrowRight" && this.direction !== "LEFT")
        this.direction = "RIGHT";
    });
  }

  draw() {
    this.container.removeChildren();

    const graphics = new Graphics();

    this.body.forEach((segment) => {
      const pixelX = segment.x * CONFIG.CELL_SIZE;
      const pixelY = segment.y * CONFIG.CELL_SIZE;

      graphics.rect(pixelX, pixelY, CONFIG.CELL_SIZE, CONFIG.CELL_SIZE);

      graphics.fill(segment.color);
    });

    this.container.addChild(graphics);
  }

  move() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    if (this.direction === "UP") this.body[0].y -= 1;
    if (this.direction === "DOWN") this.body[0].y += 1;
    if (this.direction === "LEFT") this.body[0].x -= 1;
    if (this.direction === "RIGHT") this.body[0].x += 1;

    this.draw();
  }

  reset() {
    this.body = snakeBody();
    this.direction = "RIGHT";
    this.draw();
  }
}
