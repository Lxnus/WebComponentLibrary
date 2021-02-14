class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.random = false;
        this.lifeTime = undefined;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    }

    calcDistance(x1, y1, x2, y2) {
        let diffX = x2 - x1;
        let diffY = y2 - y1;
        return Math.sqrt(diffX * diffX + diffY * diffY);
    }

    update() {
        if(this.x > canvas.width ||  this.x < 0) {
            this.directionX = -this.directionX;
            this.random = false;
            this.lifeTime = undefined;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
            this.random = false;
            this.lifeTime = undefined;
        }
        let distance = this.calcDistance(mouse.x, mouse.y, this.x, this.y);
        let centerDistance = this.calcDistance(this.x, this.y, center.x, center.y);
        if(this.random) {
            if(distance < mouse.radius + this.size && centerDistance < center.radius / 2) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x -= 5;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x += 5;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y -= 5;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y += 5;
                }
            }
            if (centerDistance < center.radius && centerDistance > center.radius / 2) {
                if (center.x < this.x && this.x < canvas.width) {
                    this.x -= 10;
                }
                if (center.x > this.x) {
                    this.x += 10;
                }
                if (center.y < this.y && this.y < canvas.height) {
                    this.y -= 10;
                }
                if (center.y > this.y) {
                    this.y += 10;
                }
            } else if (centerDistance < center.radius && centerDistance < center.radius / 2) {
                if (center.x < this.x && this.x < canvas.width) {
                    this.x += 10;
                }
                if (center.x > this.x) {
                    this.x -= 10;
                }
                if (center.y < this.y && this.y < canvas.height) {
                    this.y += 10;
                }
                if (center.y > this.y) {
                    this.y -= 10;
                }
            }
        }
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x -= 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x += 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y -= 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y += 2;
            }
        }
        if(Math.random() < 0.005 && !this.random) {
            this.random = true;
            this.lifeTime = performance.now();
        }
        if(this.lifeTime && this.random) {
            if(performance.now() - this.lifeTime > 10000 * Math.random()) {
                this.random = false;
                this.lifeTime = undefined;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}
