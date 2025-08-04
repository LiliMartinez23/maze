const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const engine = Engine.create();
const { world } = engine;

// Width & height
const width = 800;
const height = 600;

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

// Mouse Constraint
World.add( world, MouseConstraint.create( engine, {
    mouse: Mouse.create( render.canvas )
}));

// Walls
const walls = [
    // Top
    Bodies.rectangle( 400, 0, 800, 40, {
        isStatic: true
    }),
    // Bottom
    Bodies.rectangle( 400, 600, 800, 40, {
        isStatic: true
    }),
    // Left
    Bodies.rectangle( 0, 300, 40, 600, {
        isStatic: true
    }),
    // Right
    Bodies.rectangle( 800, 300, 40, 600, {
        isStatic: true
    })
];

// Elements added to world
World.add( world, walls );
// Random shape positions
for ( let i = 0; i < 35; i++ ) {
    if ( Math.random() > 0.5 ) {
        // Square
        World.add( world, Bodies.rectangle(
            Math.random() * width,
            Math.random() * height,
            50,
            50,
            { // Style
                render: {
                    fillStyle: '#3d3d3dff',
                    strokeStyle: '#8b8b8bff',
                    lineWidth: 2
                }
            }
        ));
    } else {
        // Circle
        World.add( world, Bodies.circle(
            Math.random() * width,
            Math.random() * height,
            35,
            { // Style
                render: {
                    fillStyle: '#ea8b38ff'
                }
            }
        ));
    }
}