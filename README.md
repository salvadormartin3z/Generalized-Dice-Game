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


