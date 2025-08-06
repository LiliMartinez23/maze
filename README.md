<img width="300" height="147" alt="image" src="https://github.com/user-attachments/assets/86bf5d66-afa2-4501-a4ce-c05c2137cbbf" /> <img width="300" height="147" alt="image" src="https://github.com/user-attachments/assets/341e89b3-099d-4f88-bda5-63838836455a" /> <img width="300" height="147" alt="image" src="https://github.com/user-attachments/assets/e1515e76-37c8-4b55-a9b9-3f33e75dff9e" />



# Maze

A procedurally generated maze game built with [Matter.js](https://brm.io/matter-js/), a 2D physics engine for the web. Navigate a ball through the maze using your keyboard to reach the goal.

## Demo

Open `index.html` in your browser to run the game locally.

## Features

- Procedural maze generation using recursive backtracking
- Interactive physics-based movement using Matter.js
- Real-time rendering and collision detection
- Keyboard controls (W/A/S/D) to move the ball
- Victory detection when the ball reaches the goal (foundation in place)

## Controls

- `W` - Move Up
- `A` - Move Left
- `S` - Move Down
- `D` - Move Right

## Technologies Used

- **JavaScript**
- **HTML**
- **[Matter.js](https://brm.io/matter-js/)** - physics engine

## Project Structure

- maze/
  - index.html # Loads Matter.js and the game script
  - main.js # Contains maze generation and gameplay logic

## How It Works

1. A grid is created and randomized using a recursive algorithm to carve out a solvable maze.
2. Walls and passages are rendered using Matter.js bodies.
3. A goal is placed in the bottom-right corner of the maze.
4. A movable ball is placed in the top-left corner.
5. Player can control the ball with the keyboard.
6. A collision detection handler is set up to detect when the ball reaches the goal.

## Future Enhancements

- Visual win message and animation when goal is reached
- Responsive layout for different screen sizes
- Maze regeneration button
- Levels with increasing difficulty
- Timer and scoring system

## Installation & Usage

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

No dependencies or server setup required.
