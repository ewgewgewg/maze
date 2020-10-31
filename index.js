const prompt = require("prompt-sync")();
const _ = require("lodash");
const { movement, aliasFunction, goCondition } = require("./utils");

let play = true;

const game = () => {
  const endCriteria = [false, false];

  let welcome = prompt(
    "Welcome to the Dungeon! Would you like to ENTER? "
  ).toUpperCase();

  while (welcome !== "ENTER") {
    welcome = prompt(
      "You are floating in limbo. Would you like to ENTER? "
    ).toUpperCase();
  }

  const dungeon = [[], [], [], [], []].map((a) => ["x", "x", "x", "x", "x"]);
  let playerLocation = [0, 0, 0, 0],
    monsterLocation = [4, 0, 4, 0];

  while (goCondition(playerLocation, [monsterLocation])) {
    const map = _.cloneDeep(dungeon);
    map[playerLocation[0]][playerLocation[1]] = "o";
    map[monsterLocation[0]][monsterLocation[1]] = "m";
    console.log(map);
    let playerDirection = prompt("LEFT, RIGHT, DOWN, OR UP? ");
    if (playerDirection.toUpperCase() === "QUIT") {
      endCriteria[1] = true;
    }
    playerDirection = aliasFunction(playerDirection);
    playerLocation = movement(playerDirection, playerLocation);
    monsterLocation = movement("RANDOM", monsterLocation);
  }

  const map = _.cloneDeep(dungeon);
  map[playerLocation[0]][playerLocation[1]] = "o";
  map[monsterLocation[0]][monsterLocation[1]] = "m";
  console.log(map);

  if (
    monsterLocation[0] === playerLocation[0] &&
    monsterLocation[1] === playerLocation[1]
  ) {
    endCriteria[0] = true;
  }

  return endCriteria;
};

while (play) {
  let [eaten, quit] = game();
  if (eaten) {
    console.log("You have been eaten!");
  } else console.log("You have reached the end of the dungeon!");

  if (quit) {
    break;
  }

  let restart = prompt(
    "Would you like to RESTART your journey? "
  ).toUpperCase();
  if (restart !== "RESTART") {
    play = false;
  }
}
