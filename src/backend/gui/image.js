class ImageComponent {
    constructor(x, y, imageSrc, center) {
        this.x = x;
        this.y = y;
        this.imageSrc = imageSrc;
        this.center = center;

        this.visible = true;

        this.width = undefined;
        this.height = undefined;

        this.image = new Image();
    }

    refactor(x, y, width, height) {
        if(this.x < x) this.x = x;
        if(this.y < y) this.y = y;
        if(this.x + this.image.width > x + width) {
            this.x -= Math.abs((this.x + this.image.width) - (x + width));
        }
        if(this.y + this.image.height > y + height) {
            this.y -= Math.abs((this.y + this.image.height) - (y + height));
        }
        if(this.center) this.x = x + (width / 2) - this.width / 2;
    }

    draw() {
        if(!this.visible) return;
        this.image.onload = function () {
            context.beginPath();
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.closePath();
        }
        this.image.src = this.imageSrc;
    }

    update() {
        this.draw();
    }

    setVisible(visible) {
        this.visible = visible;
    }
}