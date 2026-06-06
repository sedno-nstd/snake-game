export const getRandomFreeCell = (grid, snakeBody, extraObstacles = []) => {
  let x, y;
  let isValid = false;

  while (!isValid) {
    x = Math.floor(Math.random() * grid.totalCells);
    y = Math.floor(Math.random() * grid.totalCells);

    const hitBorder = grid.isCellBorder(x, y);

    const hitSnake = snakeBody.some((s) => s.x === x && s.y === y);

    const hitWall = extraObstacles.some((w) => w.x === x && w.y === y);

    if (!hitBorder && !hitSnake && !hitWall) {
      isValid = true;
    }
  }
  return { x, y };
};
