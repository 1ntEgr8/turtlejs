const turtle = new Turtle(0, 0, 1000, 1000);

function fractal(length, depth) {
    if (depth == 0) {
        turtle.forward(length);
    } else {
        fractal(length/3, depth-1);
        turtle.rotate(60);
        fractal(length/3, depth-1);
        turtle.rotate(-120);
        fractal(length/3, depth-1);
        turtle.rotate(60);
        fractal(length/3, depth-1);
    }
}

fractal(1000, 5);
turtle.done();
