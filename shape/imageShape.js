import DrawingUtil from '../drawingUtil.js'
import Shape from '../base/shape.js'

/**
 * キャンバス内の画像を扱うためのクラス 
 * 
 * @property {Object} context 描画コンテキスト
 * @property {Image} imageSource 描画するイメージを格納したオブジェクト HTMLのimgに相当
 */
export default class ImageShape extends Shape {

    constructor(context, startX, startY, imageSource) {

        super(context, startX, startY)
        this._ratio = 1.0

        // キャンバスより大きな画像は縮小
        if (imageSource.width > (context.canvas.width / DrawingUtil.getPixelRatio())) {

            this._ratio = (context.canvas.width / DrawingUtil.getPixelRatio()) / imageSource.width
        }

        if (imageSource.height > (context.canvas.height / DrawingUtil.getPixelRatio())) {

            this._ratio = (context.canvas.height / DrawingUtil.getPixelRatio()) / imageSource.height
        }

        this.width = imageSource.width * this._ratio
        this.height = imageSource.height * this._ratio

        this._imageSource = imageSource

        this.defineAttribute()
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
        this._hasArea = false
    }
}