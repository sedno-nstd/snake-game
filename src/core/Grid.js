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

        graphics.rect(x, y, CONFIG.CELL_SIZE, CONFIG.CELL_SIZE);

        const isBorder = this.isCellBorder(col, row);

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

  isCellBorder(x, y) {
    return (
      y < CONFIG.BORDER_TILES ||
      y >= this.totalCells - CONFIG.BORDER_TILES ||
      x < CONFIG.BORDER_TILES ||
      x >= this.totalCells - CONFIG.BORDER_TILES
    );
  }
}
