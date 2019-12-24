import { DrawConst } from '../const/drawingConst.js'
import Shape from '../base/shape.js'
/**
 * 赤枠の四角を表すクラス
 * 位置・大きさ・色を状態として持ち、伸縮を可能とする
 * 
 * @property {string} color 枠の色
 */
export default class PointRectangle extends Shape{

    constructor(context, startX, startY) {

        super(context, startX, startY)
        this.defineAttribute()

        this._color = '#FF0000'
    }

    /**
     * キャンバス上のオブジェクト全体を描画
     * drawBaseではスタック内の全てのオブジェクトをdrawメソッドで描画しているので、
     * メソッドを分離
     */
    fullDraw() {
        super.drawBase()
        this.draw()
    }

    /**
     * 四角の枠をキャンバス上に描画
     */
    draw() {
        this._context.canvasContext.strokeStyle = this._color
        this._context.canvasContext.strokeRect(this.x, this.y, this.width, this.height)
    }

    /**
     * 属性を定義 四角で、領域を持たないものとする
     */
    defineAttribute() {
        this._shapeType = DrawConst.shape.ShapeType.RECT
        this._hasArea = false
    }

}