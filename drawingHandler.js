export default class DrawingHandler {

    constructor(context) {

        this.context = context

    }

    drawRectangle(rectangle) {

        this.context.strokeStyle = rectangle.color
        this.context.strokeRect(rectangle.x, rectangle.y - 30, rectangle.width, rectangle.height)
        

    }
    
}