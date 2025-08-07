<img width="250" height="112" alt="image" src="https://github.com/user-attachments/assets/86bf5d66-afa2-4501-a4ce-c05c2137cbbf" /> <img width="250" height="112" alt="image" src="https://github.com/user-attachments/assets/341e89b3-099d-4f88-bda5-63838836455a" /> <img width="250" height="112" alt="image" src="https://github.com/user-attachments/assets/6e55900c-9f1f-48cb-bf9e-44d135ba4d59" />




# Maze

A procedurally generated maze game built with [Matter.js](https://brm.io/matter-js/), a 2D physics engine for the web. Navigate a ball through the maze using keyboard controls to reach the goal.

## Demo

https://lilimartinez23.github.io/maze/

## Features

- Procedural maze generation using recursive backtracking  
- Interactive physics-based movement with Matter.js  
- Real-time rendering and collision detection  
- Keyboard controls (W/A/S/D) to move the ball  
- Visual victory screen and gravity effect upon winning  
- "Play Again" button to restart the game instantly  
- Dynamic, responsive canvas size based on window size  

## Controls

- `W` - Move Up  
- `A` - Move Left  
- `S` - Move Down  
- `D` - Move Right  

## Technologies Used

- JavaScript  
- HTML  
- CSS  
- [Matter.js](https://brm.io/matter-js/) - 2D physics engine  

## Project Structure

- maze/
  - index.html # Loads Matter.js and the game script
  - main.js # Contains maze generation and gameplay logic
  - app.css # Styles for victory message and restart button

## How It Works

- A grid is randomly generated using recursive backtracking.  
- Walls and passages are rendered as Matter.js static bodies.  
- The player controls a ball starting in the top-left corner.  
- The goal is placed in the bottom-right corner.  
- When the ball collides with the goal, a "YOU WIN!" message appears, gravity turns on, and walls collapse.  
- A restart button reloads the page to start a new game.  

## Future Enhancements

- Responsive design for smaller screens and devices  
- Difficulty levels or larger mazes  
- Maze regeneration without page reload  
- Timer and scoring mechanics  
- Sound effects and animations  

## Installation & Usage

1. Clone or download this repository.  
2. Open `index.html` in any modern browser.  

No dependencies or server setup required.
