# Generalized-Dice-Game
This project implements a generalized dice game where both the user and the computer compete by selecting dice, rolling them, and determining a winner based on the highest result. The game incorporates cryptographic proof to ensure fairness and provides a user-friendly CLI interface for seamless gameplay.
## Features
  1. Fair Randomness: Cryptographically secure random number generation using HMAC (SHA3-256) ensures that neither the user nor the computer can cheat.
  2. Dynamic Dice Selection: Users can select from multiple dice configurations passed as command-line arguments.
  3. Interactive Gameplay: Includes CLI options for selecting dice, adding numbers modulo 6, and viewing a help table of probabilities.
  4. Validation of Inputs: Ensures that the dice configurations provided are valid, and guides users when invalid inputs are entered.
  5. Help Table: Displays a probability table for winning based on the dice configurations.
## How to Run the Game
### Prerequisites
1. Node.js version 14 or later installed.
2. TypeScript installed globally (npm install -g typescript).
### Setup
1. Clone the repository:
```bash
  git clone https://github.com/<your-username>/generalized-dice-game.git
  cd generalized-dice-game
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Compile the TypeScript code:
  ```bash
  npx tsc
 ```
## Usage
Run the game using node and provide dice configurations as arguments:
 ```bash
node dist/index.js <dice1> <dice2> <dice3> ...
  ```
### Examples
1. 
 ```bash
node dist/index.js 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6
  ```
2.
```bash
node dist/index.js 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6
  ```
## Gameplay Instructions
1. The game begins by determining who selects dice first:
     1. The computer generates a random value (0 or 1) and displays its HMAC.
     2. The user guesses the value, and the key is revealed for verification.
     3. If the user guesses correctly, they choose dice first; otherwise, the computer starts.
2. Each player selects a dice configuration from the available options.
3. Players add a value modulo 6 to the random number generated by the computer.
4. The result determines the dice face to roll, and the highest roll wins.
## Help Table
To display the help table with probabilities:
1. Run the game with a valid configuration.
2. Use the ? option during gameplay to view the probabilities.
## Validation
The following cases are handled:
1. At least three dice configurations are required.
2. Each dice must have exactly six integer values.
3. Non-integer or malformed configurations result in a clear error message.
