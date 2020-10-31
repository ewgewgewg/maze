const movement = (direction, unit) => {
  switch (direction) {
    case "RIGHT":
      return [unit[0], Math.min(unit[1] + 1, 4)];
    case "LEFT":
      return [unit[0], Math.max(unit[1] - 1, 0)];
    case "DOWN":
      return [Math.min(unit[0] + 1, 4), unit[1]];
    case "UP":
      return [Math.max(unit[0] - 1, 0), unit[1]];
    case "QUIT":
      return [4, 4];
    default:
      return unit;
  }
};

const aliasFunction = (input) => {
  input = input.toUpperCase();
  if (input === "R") return "RIGHT";
  if (input === "L") return "LEFT";
  if (input === "U") return "UP";
  if (input === "D") return "DOWN";
  return input;
};

module.exports = { movement, aliasFunction };
