/**
 * Define which canvas is used for the webpage.
 * @type {HTMLElement}
 */
let canvas = undefined;
if(window.location.href.endsWith("index.html")) {
    canvas = document.getElementById("canvas1");
} else if(window.location.href.endsWith("demo.html")) {
    canvas = document.getElementById("canvas2");
}
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//*******************************************


/**
 * Define canvas methods.
 */
CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
    if(width < 2 * radius) radius = width / 2;
    if(height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
};
//*******************************************


/**
 * Define panel. Setup components to panel.
 * @type {Panel}
 */
const panel = new Panel(canvas.width / 2, canvas.height / 2, 200, 200, "#000000", 0.75);
const panelTitle = new Label(0, 438, "#ffffff", 30, "Demo-Panel", true, false, undefined, undefined);

let btnTheme = window.location.href.endsWith("index.html") ? "Dunkel" : "Hell";

const button = new Button(0, 460, 100, 30, "#446060", btnTheme, true);
const demoViewLeft = new Button(0, 500, 100, 30, "#446060", "< DV", true)
const demoViewRight = new Button(0, 540, 100, 30, "#446060", "DV >", true);

panel.addComponent(panelTitle);
panel.addComponent(button);
panel.addComponent(demoViewLeft);
panel.addComponent(demoViewRight);
//*******************************************


/**
 * Demo-View-Left
 */
const dvlPanel = new Panel(canvas.width / 4, canvas.height / 1.8, 400, 600, "#000000", 0.75);
const lImage = document.getElementById("dvlImage");
const dvlImage = new ImageComponent(0, 0, lImage, true);
const dvlTitle = new Label(0, 330, "#ffffff", 40, "Demo-Panel-Left", true, undefined, undefined);

dvlPanel.addComponent(dvlTitle);
dvlPanel.addComponent(dvlImage);
//*******************************************


/**
 * Demo-View-Right
 */
const dvrPanel = new Panel(canvas.width / 2 + canvas.width / 4, canvas.height / 1.8, 400, 600, "#000000", 0.75);
const rImage = document.getElementById("dvlImage");
const dvrImage = new ImageComponent(0, 0, rImage, true);
const dvrTitle = new Label(0, 330, "#ffffff", 40, "Demo-Panel-Right", true, undefined, undefined);

dvrPanel.addComponent(dvrTitle);
dvrPanel.addComponent(dvrImage);
//*******************************************


/**
 * Web-Stuff
 */
const title = new Label(canvas.width / 4, canvas.height / 6, "#ffffff", 125, "Informatik Projekt", true, true, "#000000", 0.75
);
//*******************************************


/**
 * Utils...
 */
function hexToRgbA(hex, alpha) {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c= hex.substring(1).split('');
        if(c.length === 3) {
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ', ' + alpha + ')';
    }
    throw new Error('Bad Hex');
}
//*******************************************


/**
 * Some global variable stuff.
 */
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 200) * (canvas.width / 200)
}

let center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: (canvas.height / 75) * (canvas.width / 75)
}
//*******************************************


/**
 * Add event listeners.
 * Mostly are used for the animated background!
 */
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 125) * (canvas.width / 125));
    center.radius = ((canvas.height / 75) * (canvas.width / 75));
    animatedBackground.init();
});

window.addEventListener("mouseout", function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener("click", function() {
    if(button.check()) {
        if(window.location.href.endsWith("index.html")) {
            window.location.href = "demo.html";
        } else if(window.location.href.endsWith("demo.html")) {
            window.location.href = "index.html";
        }
    }

    if(demoViewLeft.check()) {
        demoViewLeft.setText(dvlPanel.isVisible() ? "<< DV" : "< DV");
        dvlPanel.setVisible(!dvlPanel.isVisible());
    }
    if(demoViewRight.check()) {
        demoViewRight.setText(dvrPanel.isVisible() ? "DV >>" : "DV >");
        dvrPanel.setVisible(!dvrPanel.isVisible());
    }
});
//*******************************************


/**
 * Animation stuff
 * Define the background => Setup the animated background. -> particles.
 * @type {ParticleBackground}
 */
const animatedBackground = new ParticleBackground();

let index = 0;
let rotate = false;
let lastReInit = performance.now();
let particles;

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    if(rotate && index >= 45) {
        animatedBackground.init();
        rotate = false;
        index = 0;
    }
    if(rotate) {
        if(animatedBackground.check(lastReInit, 0)) {
            lastReInit = performance.now();
            index++;
        }
    } else {
        if(animatedBackground.check(lastReInit, 20000)) {
            lastReInit = performance.now();
            rotate = true;
        }
    }

    for(let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    animatedBackground.connect();

    // Panel stuff etc.:
    panel.update();
    title.update();
    dvlPanel.update();
    dvrPanel.update();
}

animatedBackground.init();
animate();
//*******************************************