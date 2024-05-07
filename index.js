// deposit the amount to play
// input number of lines to bet
// collect the bet amount
// spin the slot machine
// check if the user won
// give the user their winning
// play again

import PromptSync from "prompt-sync";
const prompt = PromptSync();

const ROWS = 3;
const COLS = 3;

//number of symbols in each row
const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

// values of each symbol
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDespostAmount = parseFloat(depositAmount);
    if (isNaN(numberDespostAmount) || numberDespostAmount < 0) {
      console.log("Enter a valid amount");
    } else {
      return numberDespostAmount;
    }
  }
};

const lines = () => {
  while (true) {
    const enteredlines = prompt("Enter number lines to bet(1-3): ");
    const numberEnteredLines = parseFloat(enteredlines);
    if (
      isNaN(numberEnteredLines) ||
      numberEnteredLines <= 0 ||
      numberEnteredLines > 3
    ) {
      console.log("Enter a valid number of lines");
    } else {
      return numberEnteredLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the total bet: ");
    const numberBet = parseFloat(bet);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Enter valid bet, try again");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    const reelsSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelsSymbols.length);
      const selectedSymbol = reelsSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelsSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  let rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines ) => {
  let winning = 0;
  for(let row = 0; row < lines; row++){
    const symbols = rows[row];
    let allSame = true;
    for(const symbol of symbols){
      if( symbol != symbols[0]){
        allSame = false;
        break;
      }
    }
    if(allSame){
      winning += bet * SYMBOL_VALUES[symbols[0]]
    }
  }
  return winning;
}


const game = () => {
  let balance = deposit();
  while(true){
    console.log("You have a balance of $" + balance)
    const numberOfLines = lines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winning = getWinnings(rows, bet, numberOfLines);
    balance += winning;
    console.log(`You have won $${winning.toString()}`)
    
    if(balance <= 0){
      console.log("You ran out of money!")
      break;
    }
    const playAgain = prompt("Do you want to play again (y/n)? ")
    if(playAgain != "y") break;
      
  }
}

game()