let nx, ny, dx, dy, duration, startTime; // variables used in animating turtle

class Turtle {
    constructor(x=0, y=0, windowWidth=100, windowHeight=100) {
       console.log("%cTurtle born!", "color: green; font-size: 2rem; font-weight: bold;");

       this.x = x;
       this.y = y;
       this.windowWidth = windowWidth;
       this.windowHeight = windowHeight;
       this.heading = 0;
       this.path = `M ${x} ${y}`;
       this.speed = 0.2;
       this.isAnim = true;

       // creating the canvas on which the turtle will move 
       this.canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
       this.canvas.setAttributeNS(null, 'width', `${this.windowWidth}px`);
       this.canvas.setAttributeNS(null, 'height', `${this.windowHeight}px`);

       // setting up the turtle
       // TODO: add ability to configure turtle
       this.turtle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
       this.turtle.setAttributeNS(null, 'd', this.path);
       this.turtle.setAttributeNS(null, 'stroke', 'black');
       this.turtle.setAttributeNS(null, 'stroke-width', '5px');
       this.turtle.setAttributeNS(null, 'fill', 'none');

       // appending to DOM
       this.canvas.appendChild(this.turtle);
       document.body.appendChild(this.canvas);
    }

    animate() {
        let time = Date.now();
        this.x += dx;
        this.y += dy;
        const path = `${this.turtle.getAttributeNS(null, 'd')} L ${this.x} ${this.y}`;
        this.turtle.setAttributeNS(null, 'd', path); 
        if (time - startTime > duration) {
            this.x = this.x2;
            this.y = this.y2;
            this.turtle.setAttributeNS(null, 'd', this.path); 
        } else {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    /*
    forward(distance) {
        this.x2 = this.x + distance * Math.cos(this.heading);
        this.y2 = this.y + distance * Math.sin(this.heading);

        this.path = `${this.turtle.getAttributeNS(null, 'd')} L ${this.x2} ${this.y2}`;


        duration = Math.sqrt(Math.pow(this.x2 - this.x, 2), Math.pow(this.y2 - this.y, 2)) / this.speed;
        dx = (this.x2 - this.x) * 16 / duration;
        dy = (this.y2 - this.y) * 16 / duration;
        
        if (this.isAnim) {
            startTime = Date.now();
            this.animate();
        } else {
            this.x = this.toX;
            this.y = this.toY;
            this.turtle.setAttributeNS(null, 'd', this.path);
        }
    }
    */

    rotate(degrees) {
        this.heading += this.degToRad(degrees);
    }

    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    done() {
        this.animate();
    }
}