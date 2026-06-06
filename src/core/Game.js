import { Application } from "pixi.js";
import { Grid } from "./Grid.js";
import { UiManager } from "../ui/UIManager";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { getRandomFreeCell } from "../hooks/spawnUtils";
import { Walls } from "./Walls.js";

export class Game {
  constructor() {
    this.app = new Application();
    this.ui = new UiManager((newMode) => this.setMode(newMode));
    this.grid = new Grid();
    this.snake = new Snake();
    this.food = new Food(this.grid);

    this.portalExit = new Food(this.grid);

    this.walls = new Walls();
    this.score = 0;
    this.isPlaying = false;
    this.speedThreshold = 0;
    this.maxSpeed = 8;

    this.scoreElement = document.querySelector(".current-score__value");
    this.bestScoreElement = document.querySelector(".best-score__value");

    this.currentMode = "Classic";
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
    this.app.stage.addChild(this.snake.container);
    this.app.stage.addChild(this.food.container);
    this.app.stage.addChild(this.portalExit.container);
    this.app.stage.addChild(this.walls.container);

    this.restart();

    this.food.spawn(this.snake.body);
    this.updateScore(0);
    this.ui.updateNavigation(this.isPlaying);

    const btnPlay = document.getElementById("btn-play");

    if (btnPlay) {
      btnPlay.addEventListener("click", () => {
        this.startGame();
      });
    }

    const btnMenu = document.getElementById("btn-menu");

    if (btnMenu) {
      btnMenu.addEventListener("click", () => {
        this.stopGame();
      });
    }

    const btnExit = document.getElementById("btn-exit");

    if (btnExit) {
      btnExit.addEventListener("click", () => {
        window.close();
      });
    }
  }

  updateScore(newScore) {
    this.score = newScore;

    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
    const storedBest = localStorage.getItem("snakeBestScore") || 0;

    let bestScore = parseInt(storedBest);

    if (this.score > bestScore) {
      bestScore = this.score;
      localStorage.setItem("snakeBestScore", bestScore);
    }

    if (this.bestScoreElement) {
      this.bestScoreElement.textContent = bestScore;
    }
  }

  startGame() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.ui.updateNavigation(this.isPlaying);

    this.app.ticker.add(this.update, this);

    this.speedThreshold = 0;
  }

  stopGame() {
    this.isPlaying = false;
    this.ui.updateNavigation(this.isPlaying);

    this.app.ticker.remove(this.update, this);
  }

  restart() {
    this.stopGame();
    this.snake.reset();

    this.score = 0;
    this.speedThreshold = 0;
    this.maxSpeed = 8;
    this.walls.reset();

    this.food.spawn(this.snake.body);

    if (this.currentMode === "Portal") {
      this.portalExit.spawn(this.snake.body);
    } else {
      this.portalExit.graphics.clear();
      this.portalExit.x = -100;
      this.portalExit.y = -100;
    }
  }

  setMode(mode) {
    this.currentMode = mode;
    this.restart();
  }

  update(ticker) {
    if (!this.isPlaying) return;
    this.speedThreshold += ticker.deltaTime;

    if (this.speedThreshold >= this.maxSpeed) {
      this.snake.move();
      this.speedThreshold = 0;

      const head = this.snake.body[0];

      const isHitWallObject = this.walls.list.some(
        (wall) => wall.x === head.x && wall.y === head.y,
      );

      const isHitSelf = this.snake.body
        .slice(1)
        .some((part) => part.x === head.x && part.y === head.y);

      if (
        (this.grid.isCellBorder(head.x, head.y) ||
          isHitWallObject ||
          isHitSelf) &&
        this.currentMode !== "GodMode"
      ) {
        this.restart();
        return;
      }

      const ateFood = head.x === this.food.x && head.y === this.food.y;
      const atePortal =
        this.currentMode === "Portal" &&
        head.x === this.portalExit.x &&
        head.y === this.portalExit.y;

      if (ateFood || atePortal) {
        const eatenColor = atePortal ? this.portalExit.color : this.food.color;

        if (this.currentMode === "Portal") {
          head.x = ateFood ? this.portalExit.x : this.food.x;
          head.y = ateFood ? this.portalExit.y : this.food.y;
        }

        this.updateScore(this.score + this.food.fruitValue);

        const tail = this.snake.body[this.snake.body.length - 1];
        this.snake.body.push({ x: tail.x, y: tail.y, color: eatenColor });

        this.food.spawn(this.snake.body);
        if (this.currentMode === "Portal") {
          this.portalExit.spawn(this.snake.body);
        }
        this.snake.draw();

        if (this.currentMode === "Speed") {
          this.maxSpeed = Math.max(2.5, this.maxSpeed * 0.95);
        }

        if (this.currentMode === "Walls") {
          const pos = getRandomFreeCell(
            this.grid,
            this.snake.body,
            this.walls.list,
          );
          this.walls.addWall(pos.x, pos.y);
        }
      }
    }
  }
}
