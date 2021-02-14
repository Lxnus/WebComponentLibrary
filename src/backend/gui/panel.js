class Panel {
    constructor(x, y, width, height, color, alpha) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alpha = alpha;

        this.visible = true;
        this.components = [];

        //recalc to center (w, h)
        this.x -= this.width / 2;
        this.y -= this.height / 2;
    }

    refactorComponents() {
        if(this.components.length > 0) {
            for(let i = 0; i < this.components.length; i++) {
                this.components[i].refactor(this.x, this.y, this.width, this.height);
            }
        }
    }

    draw() {
        if(!this.visible) return;
        context.beginPath();
        context.roundRect(this.x, this.y, this.width, this.height, 8);
        context.fillStyle = hexToRgbA(this.color, this.alpha);
        context.fill();
    }

    update() {
        this.refactorComponents();
        this.draw();
        for(let i = 0; i < this.components.length; i++) {
            this.components[i].setVisible(this.isVisible());
            this.components[i].update();
        }
    }

    addComponent(component) {
        this.components.push(component);
    }

    setVisible(visible) {
        this.visible = visible;
    }

    isVisible() {
        return this.visible;
    }
}
