const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Events
} = Matter;

const cellsHorizontal = 4;
const cellsVertical = 3;
const width = window.innerWidth;
const height = window.innerHeight;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

// -----------------------------
//            Engine
// -----------------------------
const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});
Render.run( render );
Runner.run( Runner.create(), engine );

// -----------------------------
//             Walls
// -----------------------------
const walls = [
    // Top
    Bodies.rectangle( width/2, 0, width, 2, { isStatic: true } ),
    // Bottom
    Bodies.rectangle( width/2, height, width, 2, { isStatic: true } ),
    // Left
    Bodies.rectangle( 0, height/2, 2, height, { isStatic: true } ),
    // Right
    Bodies.rectangle( width, height/2, 2, height, { isStatic: true } )
];
World.add( world, walls );

// -----------------------------
//      Maze generation I
// -----------------------------
// Randomize neighbors
const shuffle = ( arr ) => {
    let counter = arr.length;

    while ( counter > 0 ) {
        const index = Math.floor( Math.random() * counter );

        counter--;

        const temp = arr[ counter ];
        arr[ counter ] = arr[ index ];
        arr[ index ] = temp;
    }

    return arr;
};

// 3x3 grid
const grid = Array( cellsVertical )
    .fill( null )
    .map(() => Array( cellsHorizontal ).fill( false ));

// 3x2 vertical
const verticals = Array( cellsVertical )
    .fill( null )
    .map(() => Array( cellsHorizontal - 1 ).fill( false ));

// 2x3 horizontal
const horizontals = Array( cellsVertical - 1 )
    .fill( null )
    .map(() => Array( cellsHorizontal ).fill( false ));

const startRow = Math.floor( Math.random() * cellsVertical );
const startCol = Math.floor( Math.random() * cellsHorizontal );

// -----------------------------
//     Next Cell Algorithm
// -----------------------------
const nextCell = ( row, col ) => {
    // If cell visited at [row, col], then return
    if ( grid[ row ][ col ] ) {
        return;
    }

    // Mark as 'cell visted'
    grid[ row ][ col ] = true;

    // Assemble random list of neighbors
    const neighbors = shuffle([
        // Up
        [ row - 1, col, 'up' ],
        // Right
        [ row, col + 1, 'right' ],
        // Down
        [ row + 1, col, 'down' ],
        // Left
        [ row, col - 1, 'left' ]
    ]);

    // For each neighbor
    for ( let neighbor of neighbors ) {
        const [ nextRow, nextCol, direction ] = neighbor;
    
        // Check if neighbor is out-of0bounds
        if ( nextRow < 0 || nextRow >= cellsVertical || nextCol < 0 || nextCol >= cellsHorizontal ) {
            continue;
        }

        // If cell visited, continue to next neighbor
        if ( grid[ nextRow ][ nextCol ] ) {
            continue;
        }

        // Remove wall from
        if ( direction === 'left' ) { // verticals
            verticals[ row ][ col - 1 ] = true;
        } else if ( direction === 'right' ) {
            verticals[ row ][ col ] = true;
        } else if ( direction === 'up' ) { // horizontals
            horizontals[ row - 1 ][ col ] = true;
        } else if ( direction === 'down' ) {
            horizontals[ row ][ col ] = true;
        }

        // Visit next cell
        nextCell( nextRow, nextCol );
    }
};
nextCell( startRow, startCol );

// -----------------------------
//      Horizontal Walls
// -----------------------------
horizontals.forEach( ( row, rowIndex ) => {
    row.forEach( ( open, columnIndex ) => {
        if ( open ) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            5,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: '#B6D6CC'
                }
            }
        );
        World.add( world, wall );
    });
});

// -----------------------------
//        Vertical Walls
// -----------------------------
verticals.forEach( ( row, rowIndex ) => {
    row.forEach( ( open, columnIndex ) => {
        if ( open ) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            5,
            unitLengthY,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: '#B6D6CC'
                }
            }
        );
        World.add( world, wall );
    });
});

// -----------------------------
//            Goal
// -----------------------------
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
        label: 'goal',
        isStatic: true,
        render: {
            fillStyle: 'black',
            strokeStyle: '#D9FFF5',
            lineWidth: 3
        }
    }
);
World.add( world, goal );

// -----------------------------
//            Ball
// -----------------------------
const ballRadius = Math.min( unitLengthX, unitLengthY ) / 4;
const ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    ballRadius,
    {
        label: 'ball',
        render: {
            fillStyle: '#6B8F71'
        }
    }
);
World.add( world, ball );

// 
document.addEventListener( 'keydown', event => {
    const { x, y } = ball.velocity;

    // w - up
    if ( event.keyCode ===  87 ) {
        Body.setVelocity(
            ball, 
            {
                x,
                y: y - 5
            }
        );
    }
    
    // a - left
    if ( event.keyCode === 65 ) {
        Body.setVelocity(
            ball, 
            {
                x: x - 5,
                y
            }
        );
    }
    
    // s - down
    if ( event.keyCode === 83 ) {
        Body.setVelocity(
            ball, 
            {
                x,
                y: y + 5
            }
        );
    }
    
    // d - right
    if ( event.keyCode === 68 ) {
        Body.setVelocity(
            ball, 
            {
                x: x + 5,
                y
            }
        );
    }
});

// Winner
Events.on( engine, 'collisionStart', event => {
    event.pairs.forEach( ( collision ) => {
        const labels = [ 'ball', 'goal' ];

        if ( labels.includes( collision.bodyA.label ) && labels.includes(  collision.bodyB.label )) {
            document.querySelector( '.winner' ).classList.remove( 'hidden' );
            document.querySelector('#restart').addEventListener('click', () => {
                location.reload(); // Simple full page reload to restart everything
            });
        
            world.gravity.y = 1;

            world.bodies.forEach( body => {
                if ( body.label === 'wall' ) {
                    Body.setStatic( body, false );
                }
            });
        }
    });
});