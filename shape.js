export default class Shape {

    constructor(context) {
        this._context = context
    }

    drawBase() {
        this.clear()
        this.drawStack()
    }

    drawStack() {
        this._context.drawStack.drawStack()
    }

    clear() {
        const canvasWidth = this._context.canvas.width
        const canvasHeight = this._context.canvas.height
        this._context.canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
    }
}