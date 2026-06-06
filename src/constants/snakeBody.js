import { RandomColor } from "../hooks/randomColor";

export const snakeBody = () => [
  { x: 10, y: 10, color: RandomColor() },
  { x: 9, y: 10, color: RandomColor() },
];
