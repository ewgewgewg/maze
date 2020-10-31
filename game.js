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
let playerLocation = [0, 0];
let monster = [4, 0];

while (
  (playerLocation[0] !== monster[0] || playerLocation[1] !== monster[1]) &&
  (playerLocation[0] !== 4 || playerLocation[1] !== 4)
) {
  const map = _.cloneDeep(dungeon);
  map[playerLocation[0]][playerLocation[1]] = "o";
  map[monster[0]][monster[1]] = "m";
  console.log(map);
  let playerDirection = prompt("LEFT, RIGHT, DOWN, OR UP? ").toUpperCase();
  movement(playerDirection, playerLocation);
  let monsterDirection = _.sample(["LEFT", "RIGHT", "DOWN", "UP"]);
  movement(monsterDirection, monster);
}

if (JSON.stringify(monster) === JSON.stringify(playerLocation)) {
  const map = _.cloneDeep(dungeon);
  map[monster[0]][monster[1]] = "m";
  console.log(map);
  console.log("You have been eaten!");
} else console.log("You have reached the end of the dungeon!");
