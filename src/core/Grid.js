import { Container, Graphics } from "pixi.js";
import { CONFIG } from "../config";

export class Grid {
  constructor() {
    this.totalCells = CONFIG.GRID_COUNT + CONFIG.BORDER_TILES * 2;
    this.canvasSize = this.totalCells * CONFIG.CELL_SIZE;
    this.container = new Container();
    this.drawStage();
  }

  drawStage() {
    const graphics = new Graphics();

    for (let row = 0; row < this.totalCells; row++) {
      for (let col = 0; col < this.totalCells; col++) {
        const x = col * CONFIG.CELL_SIZE;
        const y = row * CONFIG.CELL_SIZE;

        const isBorder =
          row < CONFIG.BORDER_TILES ||
          row >= this.totalCells - CONFIG.BORDER_TILES ||
          col < CONFIG.BORDER_TILES ||
          col >= this.totalCells - CONFIG.BORDER_TILES;

        graphics.rect(x, y, CONFIG.CELL_SIZE, CONFIG.CELL_SIZE);

        if (isBorder) {
          graphics.fill(CONFIG.COLORS.BORDER);
          graphics.stroke({ color: CONFIG.COLORS.BORDER_STROKE, width: 1 });
        } else {
          graphics.fill(CONFIG.COLORS.FIELD_BG);
          graphics.stroke({ color: CONFIG.COLORS.GRID_LINE, width: 1 });
        }
      }
    }
    this.container.addChild(graphics);
  }
}
