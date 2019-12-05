export default class PointRectangle {

    constructor(startX, startY) {
        this.x = startX
        this.y = startY
        this.width = 50
        this.height = 50

        this.color = '#FF0000'
    }

    modifyScale(scaledX, scaledY) {
        this.width = scaledX
        this.height = scaledY 
    }
    
}