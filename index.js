const prompt = require("prompt-sync")();
const _ = require("lodash");
const { movement, aliasFunction } = require("./utils");

let welcome = prompt(
  "Welcome to the Dungeon! Would you like to ENTER? "
).toUpperCase();

while (welcome !== "ENTER") {
  welcome = prompt(
    "You are floating in limbo. Would you like to ENTER? "
  ).toUpperCase();
}

const dungeon = [[], [], [], [], []].map((a) => ["x", "x", "x", "x", "x"]);
let playerLocation = [0, 0], monster = [4, 0];

while (
  (playerLocation[0] !== monster[0] || playerLocation[1] !== monster[1]) &&
  (playerLocation[0] !== 4 || playerLocation[1] !== 4)
) {
  const map = _.cloneDeep(dungeon);
  map[playerLocation[0]][playerLocation[1]] = "o";
  map[monster[0]][monster[1]] = "m";
  console.log(map);
  let playerDirection = prompt("LEFT, RIGHT, DOWN, OR UP? ");
  playerDirection = aliasFunction(playerDirection);
  playerLocation = movement(playerDirection, playerLocation);
  let monsterDirection = _.sample(["LEFT", "RIGHT", "DOWN", "UP"]);
  monster = movement(monsterDirection, monster);
}

const map = _.cloneDeep(dungeon);
map[playerLocation[0]][playerLocation[1]] = "o";
map[monster[0]][monster[1]] = "m";
console.log(map);

if (JSON.stringify(monster) === JSON.stringify(playerLocation)) {
  console.log("You have been eaten!");
} else console.log("You have reached the end of the dungeon!");
