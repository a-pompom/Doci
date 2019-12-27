import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

import PointRectangle from '../shape/pointRectangle.js'
import WordBalloon from '../shape/WordBalloon.js'

import ResizeHandler from '../handler/resizeHandler.js'

/**
 * 四角の描画を管理
 * @property {Object} context 描画コンテキスト
 * @property {boolean} isMousedown マウスが押下されているか リサイズイベントの有無を判断
 * @property {ResizeHandler} resizeHandler リサイズを扱うハンドラ
 */
export default class RetangleDrawing extends BaseDrawing{
    constructor(context) {
        super(context)
        this._isMousedown = false
        this._rect = null

        this._resizeHandler = new ResizeHandler()
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousedownEvent(event) {

        if (!this.isRectangleActive()) {
            return
        }
        this._context.isMousedown = true

        // 新規描画
        if (!this._context.focus.isFocused()) {

            const rectangle = this.getRectangle(this.getCanvasX(event.clientX), this.getCanvasY(event.clientY))

            this._context.drawStack.append(rectangle)
            return
        }

        if (!this.isRectFocused()) {
            return
        }

        // フォーカス中の場合、画面上の図形をリサイズ可能とする
        this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)
        this._rect = this._context.drawStack.getCurrent()

        this._rect.setOriginPos()
    }

    /**
     * マウスを動かしたときの処理 マウス押下中は描画中の図形のリサイズイベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousemoveEvent(event) {

        if (!this.isRectangleActive() || !this._context.isMousedown) {
            return
        }

        if (this._rect === null) {
            return
        }

        // リサイズした後、画面上に図形を描画
        const rectangle = this._context.drawStack.getCurrent()
        this.resize(rectangle, event)

        rectangle.fullDraw()
    }
    
    /**
     * マウスを離したときの処理 フォーカス終了イベントを発火 
     */
    mouseupEvent() {

        if (!this.isRectangleActive()) {
            return
        }

        // 別の図形へフォーカスを可能とするため、フォーカスを解放
        const currentRectangle = this._context.drawStack.getCurrent()
        currentRectangle.originY = currentRectangle.y
        currentRectangle.originX = currentRectangle.x

        this._context.focus.outFocus()

        this._context.isMousedown = false
    }

    // ----------------------------------------------- メソッド ----------------------------------------------- 

    /**
     * 描画モードで四角が選択されているか判定
     */
    isRectangleActive() {
        return this._context.menu.activeType === DrawConst.menu.DrawType.RECTANGLE
    }

    isRectFocused() {
        if (this._context.focus.focusedIndex === -1) {
            return false
        }
        
        const focusedShape = this._context.drawStack.getByIndex(this._context.focus.focusedIndex)
        console.log(focusedShape)

        return focusedShape.shapeType === DrawConst.shape.ShapeType.RECT || focusedShape.shapeType === DrawConst.shape.ShapeType.BOX
    }
    /**
     * 図形のリサイズを実行
     * 
     * @param {PointRectangle} pointRectangle リサイズ対象の図形
     * @param {Event} event  イベントオブジェクト
     */
    resize(pointRectangle, event) {

        const x = this.getCanvasX(event.clientX)
        const y = this.getCanvasY(event.clientY)

        this._resizeHandler.shape = pointRectangle
        this._resizeHandler.resize(x, y, this._context.focus.focusedAngle)
    }

    /**
     * 描画対象となる四角を取得
     * 
     * @param {number} x 描画開始x座標
     * @param {number} y 描画開始y座標
     */
    getRectangle(x, y) {
        if (this._context.menu.activeMode === DrawConst.menu.DrawMode.RECTANGLE) {
            return new PointRectangle(this._context, x, y)
        }

        if (this._context.menu.activeMode === DrawConst.menu.DrawMode.WORD_BALLOON) {
            return new WordBalloon(this._context, x, y)
        }

        return
    }

}