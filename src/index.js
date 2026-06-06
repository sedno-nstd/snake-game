import "./style.css";
import { GAME_MODES } from "./constants/gameModes";
import { Game } from "./core/Game";

const modeContainer = document.querySelector(".game-mode");

const modesHtml = GAME_MODES.map(
  (mode, index) => `
  <label class="mode-label">
    <input type="radio" name="snake-mode" value="${mode.id}" ${index === 0 ? "checked" : ""}>
    <span class="mode-text">${mode.label}</span>
  </label>
`,
).join("");

if (modeContainer) {
  modeContainer.innerHTML = modesHtml;
} else {
  console.log("Failed to compare game mode");
}

const game = new Game();

game.init().catch((err) => {
  console.error("Error to run game", err);
});
