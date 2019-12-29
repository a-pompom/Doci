import ResizeHandler from '../handler/resizeHandler.js'

/**
 * リサイズ機能を扱うためのサービス
 * 
 * @property {Object} context 描画コンテキスト
 * @property {ResizeHandler} resizeHandler リサイズハンドラ 実際に図形の属性値にリサイズの処理結果を反映させるためのハンドラ
 */
export default class ResizeService {

    constructor(context) {
        this._context = context
        this._resizeHandler = new ResizeHandler()
    }

    /**
     * リサイズの起点を設定
     * 
     * @param {Shape} shape リサイズ対象の図形
     */
    initResizeEvent(shape) {

        shape.setOriginPos()
        shape.setOriginScale()
    }

    /**
     * 
     * @param {SHape} shape リサイズ対象の図形
     * @param {number} x リサイズ後の到達点となるx座標
     * @param {number} y リサイズ後の到達点となるy座標
     */
    resize(shape, x, y) {

        this._resizeHandler.shape = shape
        // キャンバスではx,yは左上が指定されるので、上向き/左向きにリサイズする場合、
        // 描画開始位置をカーソルに合わせる
        const posX = x >= shape.originX ? shape.originX : x
        const posY = y >= shape.originY ? shape.originY : y

        this._resizeHandler.updatePos(posX, posY, this._context.focus.focusedAngle)

        // 元の位置と現在の位置の差分から、リサイズの変動分を導出し、描画位置・スケールに反映
        const scaleX = Math.abs(shape.originX - x)
        const scaleY = Math.abs(shape.originY - y)

        this._resizeHandler.modifyScale(scaleX, scaleY, this._context.focus.focusedAngle)
    }
}