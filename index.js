const turtle = new Turtle(400, 400, 1000, 1000);

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

function coolDesign() {
    for (let i = 0; i < 120; i++) {
        turtle.forward(200);
        turtle.rotate(61);
        turtle.forward(200);
        turtle.rotate(61);
        turtle.forward(200);
        turtle.rotate(61);
        turtle.forward(200);
        turtle.rotate(61);
        turtle.forward(200);
        turtle.rotate(61);
        turtle.forward(200);
        turtle.rotate(61);
        turtle.rotate(11.1111);
    }
}

function test() {
    turtle.moveTo(100, 100);
    turtle.backward(100);
    turtle.moveTo(200, 200);
    turtle.forward(100);
    turtle.rotate(-120);
    turtle.forward(100);
    turtle.setSpeed(1);
    turtle.moveTo(300, 300);
    turtle.forward(100);
    turtle.home();
    turtle.rotate(120);
    turtle.forward(200);
}

// fractal(1000, 5);
// coolDesign();
test();
turtle.done();