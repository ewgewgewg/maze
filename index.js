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
let playerLocation = [0, 0],
  monsterLocation = [4, 0];

while (
  (playerLocation[0] !== monsterLocation[0] ||
    playerLocation[1] !== monsterLocation[1]) &&
  (playerLocation[0] !== 4 || playerLocation[1] !== 4)
) {
  const map = _.cloneDeep(dungeon);
  map[playerLocation[0]][playerLocation[1]] = "o";
  map[monsterLocation[0]][monsterLocation[1]] = "m";
  console.log(map);
  let playerDirection = prompt("LEFT, RIGHT, DOWN, OR UP? ");
  playerDirection = aliasFunction(playerDirection);
  playerLocation = movement(playerDirection, playerLocation);
  monsterLocation = movement("RANDOM", monsterLocation);
}

const map = _.cloneDeep(dungeon);
map[playerLocation[0]][playerLocation[1]] = "o";
map[monsterLocation[0]][monsterLocation[1]] = "m";
console.log(map);

if (JSON.stringify(monsterLocation) === JSON.stringify(playerLocation)) {
  console.log("You have been eaten!");
} else console.log("You have reached the end of the dungeon!");
