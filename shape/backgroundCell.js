import { DrawConst } from '../const/drawingConst.js'
import Shape from '../base/shape.js'
/**
 * 
 * @property {string} color 枠の色
 */
export default class BackgroundCell extends Shape{

    constructor(context) {

        super(context, 0, 0)
        this.defineAttribute()

    }

    /**
     * 背景をキャンバスに描画
     */
    draw() {
        this._context.canvasContext.fillStyle = '#FF0000'
        this._context.canvasContext.fillRect(this.x, this.y, this._context.canvas.width, this._context.canvas.height)


        this._context.canvasContext.fillStyle = '#000000'
    }

    /**
     * 属性を定義 四角で、領域を持たないものとする
     */
    defineAttribute() {
        this._resizable = false
        this._hasArea = false
    }

}