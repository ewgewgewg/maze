const prompt = require("prompt-sync")();
const _ = require("lodash");

const movement = (direction, unit) => {
  switch (direction) {
    case "RIGHT":
      unit[1] = Math.min(unit[1] + 1, 4);
      break;
    case "LEFT":
      unit[1] = Math.max(unit[1] - 1, 0);
      break;
    case "DOWN":
      unit[0] = Math.min(unit[0] + 1, 4);
      break;
    case "UP":
      unit[0] = Math.max(unit[0] - 1, 0);
      break;
    case "QUIT":
      location = [4, 4];
    default:
  }
};

let welcome = prompt(
  "Welcome to the Dungeon! Would you like to ENTER? "
).toUpperCase();

while (welcome !== "ENTER") {
  welcome = prompt(
    "You are floating in limbo. Would you like to ENTER? "
  ).toUpperCase();
}

const dungeon = [[], [], [], [], []].map((a) => ["x", "x", "x", "x", "x"]);
let location = [0, 0];
let monster = [4, 0];

while (
  (location[0] !== monster[0] || location[1] !== monster[1]) &&
  (location[0] !== 4 || location[1] !== 4)
) {
  const map = _.cloneDeep(dungeon);
  map[location[0]][location[1]] = "o";
  map[monster[0]][monster[1]] = "m";
  console.log(map);
  let direction = prompt("LEFT, RIGHT, DOWN, OR UP? ").toUpperCase();
  movement(direction, location);
}

if (JSON.stringify(monster) === JSON.stringify(location))
  console.log("You have been eaten!");
else console.log("You have reached the end of the dungeon!");
