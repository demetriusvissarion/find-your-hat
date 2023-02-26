const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

const arr = [
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, fieldCharacter, hole],
  [fieldCharacter, hat, fieldCharacter],
];

class Field {
  constructor(field, x = 0) {
    this.rowLength = field[0].length + 1;
    this.field = field.map((line) => line.join("")).join("\n");
    this.userPosition = x;
  }

  static generateField(x, y) {
    let arr = [];
    let options = [fieldCharacter, hole, fieldCharacter];
    let randomHatIndexX = Math.ceil(Math.random() * x - 1);
    let randomHatIndexY = Math.ceil(Math.random() * y - 1);
    for (let i = 0; i < y; i++) {
      let yArr = [];
      for (let j = 0; j < x; j++) {
        let randomIndex = Math.floor(Math.random() * 3);
        yArr.push(options[randomIndex]);
      }
      arr.push(yArr);
    }
    arr[0][0] = pathCharacter;
    arr[randomHatIndexY][randomHatIndexX] = hat;
    return arr;
  }

  replaceAt(position, newCharacter) {
    this.field =
      this.field.substring(0, position) +
      newCharacter +
      this.field.substring(position + 1);
  }

  print() {
    process.stdout.write(this.field);
  }

  checkWin(userPosition) {
    let symbol = this.field[userPosition];
    if (symbol == hat) {
      process.stdout.write(`\n Congrats! You found your hat ! \n`);
      process.exit();
    } else if (symbol == hole) {
      process.stdout.write(`\n You fell into a whole\n`);
      process.exit();
    } else if (symbol !== fieldCharacter) {
      process.stdout.write(`\n You are out of bounds \n`);
      process.exit();
    } else {
      this.replaceAt(this.userPosition, pathCharacter);
      this.print();
      process.stdout.write("\n Which way?  ");
      console.log(this.rowLength);
    }
  }

  handleInput(userInput) {
    const char = userInput.toString().trim();
    if (char === "U" || char === "u") {
      this.userPosition = this.userPosition - this.rowLength;
      this.checkWin(this.userPosition);
    } else if (char === "D" || char === "d") {
      this.userPosition = this.userPosition + this.rowLength;
      console.log(this.userPosition);
      this.checkWin(this.userPosition);
    } else if (char === "R" || char === "r") {
      this.userPosition = this.userPosition + 1;
      console.log(this.userPosition);
      this.checkWin(this.userPosition);
    } else if (char === "L" || char === "l") {
      this.userPosition = this.userPosition - 1;
      this.checkWin(this.userPosition);
    } else {
      process.stdout.write("U is up, D is down, R is right, L is left \n");
    }
  }

  play() {
    this.print();
    process.stdout.write("\n Which way?  ");
    process.stdin.on("data", (e) => this.handleInput(e));
  }
}

let arr2 = Field.generateField(3, 4);

const gameFiled = new Field(arr2);

gameFiled.play();
