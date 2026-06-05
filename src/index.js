import "./style.css";
import { GAME_MODES } from "./constants/gameModes";

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
