class ImageComponent {
    constructor(x, y, image, center) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.center = center;

        this.visible = true;

        this.width = this.image.width;
        this.height = this.image.height;
    }

    refactor(x, y, width, height) {
        if(this.x < x) this.x = x;
        if(this.y < y) this.y = y;
        if(this.x + this.width > x + width) {
            this.x -= Math.abs((this.x + this.width) - (x + width));
        }
        if(this.y + this.height > y + height) {
            this.y -= Math.abs((this.y + this.height) - (y + height));
        }

        if(this.width > width) {
            this.width = width;
        }
        if(this.height > height) {
            this.height = height;
        }

        if(this.center) this.x = x + (width / 2) - (this.width / 2);
    }

    draw() {
        if(!this.visible) return;
        context.beginPath();
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.closePath();
    }

    update() {
        this.draw();
    }

    setMaxSize(width, height) {
        this.width = width;
        this.height = height;
    }

    setVisible(visible) {
        this.visible = visible;
    }
}