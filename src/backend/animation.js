class ParticleBackground {
    constructor() {}

    init() {
        particles = [];
        let numParticles = (canvas.height * canvas.width) / 4500;
        for(let i = 0; i < numParticles * 2; i++) {
            let size = 0;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.5) - 0.25;
            let directionY = (Math.random() * 0.5) - 0.25;

            particles.push(new Particle(x, y, directionX, directionY, size));
        }
    }
    
    distance(x1, y1, x2, y2) {
        let diffX = x1 - x2;
        let diffY = y1 - y2;
        return Math.sqrt(diffX * diffX + diffY * diffY);
    }

    connect() {
        for(let i = 0; i < particles.length; i++) {
            for(let j = i; j < particles.length; j++) {
                let distance = this.distance(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                if(distance < 60) {
                    context.strokeStyle = "#ffffff";
                    context.lineWidth = 1;
                    context.beginPath();
                    context.moveTo(particles[i].x, particles[i].y);
                    context.lineTo((particles)[j].x, particles[j].y);
                    context.stroke();
                    context.closePath();
                }
            }
        }
    }

    rotate(cx, cy, x, y, angle) {
        const radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
    }

    check(lastCheck, delay) {
        if(performance.now() - lastCheck > delay) {
            for(let p = 0; p < particles.length; p++) {
                let coords = this.rotate(
                    center.x,
                    center.y,
                    particles[p].x,
                    particles[p].y,
                    8);
                particles[p].x = coords[0];
                particles[p].y = coords[1];
            }
            return true;
        }
        return false;
    }
}


