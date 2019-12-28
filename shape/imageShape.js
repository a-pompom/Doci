import { DrawConst } from '../const/drawingConst.js'
import Shape from '../base/shape.js'

/**
 * キャンバス内の画像を扱うためのクラス 
 */
export default class ImageShape extends Shape {

    constructor(context, startX, startY, imageSource) {

        super(context, startX, startY)
        this._imageSource = imageSource

        this.defineAttribute()
    }

    fullDraw() {

        this.drawBase()
        this.draw()
    }

    /**
     * キャンバス上に画像を描画
     */
    draw() {
        
        this._context.canvasContext.drawImage(this._imageSource, this.x, this.y, this.width, this.height)
    }

    /**
     * 属性値を設定 領域を持つ画像として定義
     */
    defineAttribute() {
        this._shapeType = DrawConst.shape.ShapeType.IMAGE
        this._hasArea = true
    }


}