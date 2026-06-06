import { GAME_MODES } from "../constants/gameModes";

export class UiManager {
  constructor(onModeChange) {
    this.modeContainer = document.querySelector(".game-mode");
    this.onModeChange = onModeChange;
    this.initModeListeners();
    this.renderModes();
  }

  renderModes() {
    const modesHtml = GAME_MODES.map(
      (mode, index) => `
   <label class="mode-label">
     <input type="radio" name="snake-mode" value="${mode.id}" ${index === 0 ? "checked" : ""}>
     <span class="mode-text">${mode.label}</span>
   </label>
 `,
    ).join("");

    if (this.modeContainer) {
      this.modeContainer.innerHTML = modesHtml;
    } else {
      console.log("Failed to compare game mode");
    }
  }

  updateNavigation(isPlaying) {
    const btnPlay = document.getElementById("btn-play");
    const btnExit = document.getElementById("btn-exit");
    const btnMenu = document.getElementById("btn-menu");
    const btnPause = document.getElementById("pause");

    if (!btnPlay || !btnExit || !btnMenu) return;

    if (isPlaying) {
      btnPlay.classList.add("hidden");
      btnExit.classList.add("hidden");
      btnMenu.classList.remove("hidden");
      btnPause.classList.add("hidden");
    } else {
      btnPlay.classList.remove("hidden");
      btnExit.classList.remove("hidden");
      btnMenu.classList.add("hidden");
      btnPause.classList.remove("hidden");
    }
  }

  initModeListeners() {
    this.modeContainer.addEventListener("change", (e) => {
      if (e.target.name === "snake-mode") {
        this.onModeChange(e.target.value);
        console.log("currentMode:", e.target.name);
      }
    });
  }
}
