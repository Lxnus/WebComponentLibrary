class Label {
    constructor(x, y, color, fontSize, text, center, background, bgc, alpha) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.fontSize = fontSize;
        this.text = text;
        this.center = center;
        this.background = background;
        this.bgc = bgc;
        this.alpha = alpha;

        this.visible = true;
    }

    refactor(x, y, width, height) {
        if(this.x < x) this.x = x;
        if(this.y < y) this.y = y + this.getTextHeight(this.text) * (this.fontSize / 10);

        if(this.center) this.x = x + this.getTextWidth(this.text) / 2;
    }

    draw() {
        if(!this.visible) return;
        if(this.background) {
            context.beginPath();
            context.font = this.fontSize + "px Arial";
            context.roundRect(this.x - 10, this.y - this.getTextHeight(this.text) + 20, this.getTextWidth(this.text) + 20, this.getTextHeight(this.text) + 10, 8);
            context.fillStyle = hexToRgbA(this.bgc, this.alpha);
            context.fill();
            context.closePath();
        }
        context.beginPath();
        context.font = this.fontSize + "px Arial";
        context.fillStyle = this.color;
        context.fillText(
            this.text,
            this.x,
            this.y);
        context.font = "8px Arial";
        context.closePath();
    }

    update() {
        this.draw();
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