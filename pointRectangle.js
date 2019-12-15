import Shape from './shape.js'
/**
 * 赤枠の四角を表すクラス
 * 位置・大きさ・色を状態として持ち、伸縮を可能とする
 */
export default class PointRectangle extends Shape{

    constructor(context, startX, startY) {

        super(context, startX, startY)

        this._color = '#FF0000'

    }
    fullDraw() {
        super.drawBase()
        this.draw()
    }

    draw() {
        this._context.canvasContext.strokeStyle = this._color
        this._context.canvasContext.strokeRect(this.x, this.y, this.width, this.height)
    }

}