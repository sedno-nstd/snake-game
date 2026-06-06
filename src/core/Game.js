import { Application } from "pixi.js";
import { Grid } from "./Grid";
import { UiManager } from "../ui/UIManager";

export class Game {
  constructor() {
    this.app = new Application();
    this.ui = new UiManager();
    this.grid = new Grid();
    this.isPlaying = false;
  }

  async init() {
    await this.app.init({
      width: this.grid.canvasSize,
      height: this.grid.canvasSize,
      backgroundColor: 0x1a1a1a,
    });

    const gameWrapper = document.querySelector(".game-wrapper");
    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.appendChild(this.app.canvas);

    gameWrapper.insertBefore(canvasContainer, gameWrapper.firstChild);

    this.app.stage.addChild(this.grid.container);

    this.ui.updateNavigation(this.isPlaying);
  }

  startGame() {
    this.isPlaying = true;
    this.ui.updateNavigation(this.isPlaying);
  }

  stopGame() {
    this.isPlaying = false;
    this.ui.updateNavigation(this.isPlaying);
  }
}
