let nx, ny, dx, dy, duration, startTime; // variables used in animating turtle

function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}

class Turtle {
    constructor(x = 0, y = 0, windowWidth = 100, windowHeight = 100) {
        console.log(
            "%c🐢 Turtle born!",
            "color: green; font-size: 2rem; font-weight: bold;"
        );

        this.init_x = x;
        this.init_y = y;
        this.x = x;
        this.y = y;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.heading = 0;
        this.isAnim = false;

        this.speed = 1;

        this.dParts = [
            {
                type: "M",
                values: [x, y]
            }
        ];
        this.path = "";

        // creating the canvas on which the turtle will move
        this.canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.canvas.setAttributeNS(null, "width", `${this.windowWidth}px`);
        this.canvas.setAttributeNS(null, "height", `${this.windowHeight}px`);

        // setting up the turtle
        // TODO: add ability to configure turtle
        this.turtle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        this.turtle.setAttributeNS(null, "stroke", "black");
        this.turtle.setAttributeNS(null, "stroke-width", "1px");
        this.turtle.setAttributeNS(null, "fill", "none");

        // appending to DOM
        this.canvas.appendChild(this.turtle);
        document.body.appendChild(this.canvas);

        // bookkeeping for animation
        this.currentProcessIndex = 0;
    }

    forward(distance) {
        this.x = this.x + distance * Math.cos(this.heading);
        this.y = this.y + distance * Math.sin(this.heading);
        this.dParts.push({
            type: "L",
            values: [this.x, this.y]
        });
    }

    rotate(degrees) {
        this.heading += degToRad(degrees);
    }

    done() {
        this._dispatch();
    }

    _dispatch() {
        this.x = this.init_x;
        this.y = this.init_y;
        if (this.dParts.length > 0) {
            if (this.isAnim) {
                this._animate(this.dParts[0]);
            } else {
                this._display();
            }
        }
    }

    _animate(el) {
        switch (el.type) {
            case "M": {
                this.path += ` M ${el.values[0]} ${el.values[1]}`;
                this.turtle.setAttributeNS(
                    null,
                    "d",
                    this.path
                );
                this._animateNext();
                break;
            }
            case "L": {
                nx = el.values[0];
                ny = el.values[1];
                duration =
                    Math.sqrt(Math.pow(nx - this.x, 2) + Math.pow(ny - this.y, 2)) / this.speed;
                dx = ((nx - this.x) * 16) / duration;
                dy = ((ny - this.y) * 16) / duration;
                startTime = Date.now();

                this._linearAnimate();
                break;
            }
            default:
                console.error("Invalid command, or not supported yet");
        }
    }

    _linearAnimate() {
        const time = Date.now();
        this.x += dx;
        this.y += dy;
        if (time - startTime > duration) {
            this.x = nx;
            this.y = ny;
            this.path += ` L ${this.x} ${this.y}`; 
            this.turtle.setAttributeNS(null, "d", this.path);
            this._animateNext();
        } else {
            const path = `${this.turtle.getAttributeNS(null, "d")} L ${this.x} ${this.y}`;
            this.turtle.setAttributeNS(null, "d", path);
            requestAnimationFrame(this._linearAnimate.bind(this));
        }
    }

    _animateNext() {
        this.currentProcessIndex++;
        if (this.currentProcessIndex >= this.dParts.length) {
            // stop animating
        } else {
            this._animate(this.dParts[this.currentProcessIndex]);
        }
    }

    _display() {
        this.dParts.forEach(part => {
            let s = `${part.type} `;
            part.values.forEach(val => {
                s += `${val} `;
            });
            this.path += s;
        });
        this.turtle.setAttributeNS(null, 'd', this.path);
    }
}
