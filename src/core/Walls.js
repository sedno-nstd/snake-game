import { Graphics, Container } from "pixi.js";
import { CONFIG } from "../config";

export class Walls {
  constructor() {
    this.list = [];
    this.container = new Container();
  }

  addWall(x, y) {
    this.list.push({ x, y });
    this.draw();
  }

  reset() {
    this.list = [];
    this.container.removeChildren();
  }

  draw() {
    this.container.removeChildren();
    this.list.forEach((wall) => {
      const g = new Graphics();
      g.rect(
        wall.x * CONFIG.CELL_SIZE,
        wall.y * CONFIG.CELL_SIZE,
        CONFIG.CELL_SIZE,
        CONFIG.CELL_SIZE,
      );
      g.fill(CONFIG.COLORS.WALL_COLOR);
      this.container.addChild(g);
    });
  }
}
