class Button {
    constructor(x, y, width, height, color, text, center) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.text = text;
        this.center = center;

        this.visible = true;
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

        if(this.center) this.x = x + (width / 2) - this.width / 2;
    }

    draw() {
        if(!this.visible) return;
        context.beginPath();
        context.roundRect(this.x, this.y, this.width, this.height, 8);
        if(this.check()) {
            context.fillStyle = "#000000"
        } else {
            context.fillStyle = this.color;
        }
        context.fill();
        context.fillStyle = "#ffffff";
        context.font = "30px Arial";
        context.fillText(
            this.text,
            this.x + (this.width / 2) - (this.getTextWidth(this.text) / 2),
            this.y + (this.height / 2) + (this.getTextHeight(this.text) / 2));
        context.closePath();
    }

    update() {
        this.draw();
    }

    check() {
        if(mouse.x > this.x && mouse.x < this.x + this.width) {
            if(mouse.y > this.y && mouse.y < this.y + this.height) {
                return true;
            }
        }
        return false;
    }

    getTextWidth(text) {
        return context.measureText(text).width;
    }

    getTextHeight(text) {
        let metrics = context.measureText(text);
        return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    }

    setText(text) {
        this.text = text;
    }

    setVisible(visible) {
        this.visible = visible;
    }
}