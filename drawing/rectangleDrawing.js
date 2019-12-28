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
        this._focusedRect = null

        this._resizeHandler = new ResizeHandler()
    }

    /**
     * イベントの前処理を実行 主に描画モードの判定で利用
     * 
     * @param {string} eventType 実行されるイベントの種類
     * @param {Event} event イベントオブジェクト
     */
    setupEvent(eventType, event) {

        if (!this.isRectangleActive()) {
            return
        }
        
        this[`${eventType}Event`].call(this,event)
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousedownEvent(event) {

        this._context.isMousedown = true

        // 新規描画
        if (!this._context.focus.isFocused()) {

            const rectangle = this.getRectangle(this.getCanvasX(event.clientX), this.getCanvasY(event.clientY))

            this._context.drawStack.append(rectangle)
            this._focusedRect = rectangle

            return
        }

        const focusedShape = this._context.drawStack.getByIndex(this._context.focus.focusedIndex)

        if (!focusedShape.resizable) {
            return
        }

        focusedShape.setOriginPos()
        focusedShape.setOriginScale()
    }

    /**
     * マウスを動かしたときの処理 マウス押下中は描画中の図形のリサイズイベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousemoveEvent(event) {

        if (!this._context.isMousedown) {
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

    /**
     * 図形のリサイズを実行
     * 
     * @param {Shape} resizeShape リサイズ対象の図形
     * @param {Event} event  イベントオブジェクト
     */
    resize(resizeShape, event) {

        const x = this.getCanvasX(event.clientX)
        const y = this.getCanvasY(event.clientY)

        this._resizeHandler.shape = resizeShape
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