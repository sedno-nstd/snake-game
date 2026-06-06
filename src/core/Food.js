import { Container, Graphics } from "pixi.js";
import { Grid } from "./Grid";
import { CONFIG } from "../config";
import { RandomColor } from "../hooks/randomColor";

export class Food {
  constructor(grid) {
    this.fruitValue = 1;
    this.grid = grid;

    this.x = 0;
    this.y = 0;
    this.color = RandomColor();

    this.container = new Container();
    this.graphics = new Graphics();
    this.container.addChild(this.graphics);
  }

  spawn(snakeBody) {
    let isValidSpawn = false;
    while (!isValidSpawn) {
      this.x = Math.floor(Math.random() * this.grid.totalCells);
      this.y = Math.floor(Math.random() * this.grid.totalCells);

      const hitBorder = this.grid.isCellBorder(this.x, this.y);

      const hitSnake = snakeBody.some(
        (segment) => segment.x === this.x && segment.y === this.y,
      );

      if (!hitBorder && !hitSnake) {
        isValidSpawn = true;
      }
    }
    this.color = RandomColor();
    this.draw();
  }

  draw() {
    this.graphics.clear();

    const pixelX = this.x * CONFIG.CELL_SIZE;
    const pixelY = this.y * CONFIG.CELL_SIZE;

    this.graphics.rect(pixelX, pixelY, CONFIG.CELL_SIZE, CONFIG.CELL_SIZE);
    this.graphics.fill(this.color);
  }
}
