const turtle = new Turtle(0, 0, 1000, 1000);
turtle.setSpeed(1);

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
    turtle.moveTo(300, 250);
    for (let i = 0; i < 120; i++) {
        turtle.setStyles({
            "fill": `hsla(${(2*i) % 360}, 100%, 50%, 1)`
        });
        turtle.forward(100);
        turtle.rotate(61);
        turtle.forward(100);
        turtle.rotate(61);
        turtle.forward(100);
        turtle.rotate(61);
        turtle.forward(100);
        turtle.rotate(61);
        turtle.forward(100);
        turtle.rotate(61);
        turtle.forward(100);
        turtle.rotate(61);
        turtle.rotate(11.1111);
    }
}

const gosper_map = {
    "A": (o, size) => gosperCurve(o, size, true),
    "B": (o, size) => gosperCurve(o, size, false),
    "-": (o, size) => turtle.rotate(60),
    "+": (o, size) => turtle.rotate(-60)
}

// algorithm from https://en.wikipedia.org/wiki/Gosper_curve
function gosperCurve(order, size, isA) {
    if (order == 0) {
        turtle.forward(size);
    } else {
        let opString = isA ? "A-B--B+A++AA+B-" : "+A-BB--B-A++A+B";
        for (let op of opString) {
            gosper_map[op](order - 1, size);
        }
    }
}

function test() {
    turtle.setStyles({
        "stroke": "red",
        "stroke-width": "3px",
        "fill": "blue"
    });
    turtle.moveTo(100, 100);
    turtle.backward(100);
    turtle.moveTo(200, 200);
    turtle.forward(100);
    turtle.rotate(-120);
    turtle.forward(100);
    turtle.setSpeed(1);
    turtle.moveTo(300, 300);
    turtle.forward(100);
    turtle.setHeading(270);
    turtle.home();
    turtle.rotate(120);
    turtle.forward(200);
}

// fractal(1000, 5);
// coolDesign();
turtle.moveTo(200, 200);
gosperCurve(4, 10);
turtle.done();