import PointRectangle from './pointRectangle.js'
import WordBalloon from './WordBalloon.js'

import ResizeHandler from './resizeHandler.js'

/**
 * 四角の描画を管理
 * @property {Object} context 描画コンテキスト
 * @property {boolean} isMousedown マウスが押下されているか リサイズイベントの有無を判断
 * @property {ResizeHandler} resizeHandler リサイズを扱うハンドラ
 */
export default class RetangleDrawing {
    constructor(context) {
        this._context = context
        this._isMousedown = false

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

        // フォーカス中の場合、画面上の図形をリサイズ可能とする
        if (this._context.focus.isFocused()) {
            this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)

            const focusedRectangle = this._context.drawStack.getCurrent()
            focusedRectangle.setOriginPos()

            return
        }

        // 新規描画
        const rectangle = this.getRectangle(this.getCanvasX(event.clientX), this.getCanvasY(event.clientY))

        this._context.drawStack.append(rectangle)

    }

    /**
     * マウスを動かしたときの処理 マウス押下中は描画中の図形のリサイズイベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousemoveEvent(event) {

        if (!this.isRectangleActive() || !this._context.isMousedown) {
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
        return this._context.menu.isRectangleActive() || this._context.menu.isWordBalloonActive()
    }


    /**
     * 図形のリサイズを実行
     * 
     * @param {PointRectangle} pointRectangle リサイズ対象の図形
     * @param {Event} event  イベントオブジェクト
     */
    resize(pointRectangle, event) {

        this._resizeHandler.shape = pointRectangle

        const x = this.getCanvasX(event.clientX)
        const y = this.getCanvasY(event.clientY)

        // キャンバスではx,yは左上が指定されるので、上向き/左向きにリサイズする場合、
        // 描画開始位置をカーソルに合わせる
        let posX = x >= pointRectangle.originX ? pointRectangle.originX : x
        let posY = y >= pointRectangle.originY ? pointRectangle.originY : y

        this._resizeHandler.updatePos(posX, posY, this._context.focus.focusedAngle)

        // 元の位置と現在の位置の差分から、リサイズの変動分を導出し、描画位置・スケールに反映
        const scaleX = Math.abs(pointRectangle.originX - x)
        const scaleY = Math.abs(pointRectangle.originY - y)

        this._resizeHandler.modifyScale(scaleX, scaleY, this._context.focus.focusedAngle)

    }

    /**
     * 描画対象となる四角を取得
     * 
     * @param {number} x 描画開始x座標
     * @param {number} y 描画開始y座標
     */
    getRectangle(x, y) {
        if (this._context.menu.isRectangleActive()) {
            return new PointRectangle(this._context, x, y)
        }

        if (this._context.menu.isWordBalloonActive()) {
            return new WordBalloon(this._context, x, y)
        }

        return
    }


    /**
     * マウスの画面上のx座標をキャンバスでのx座標に変換
     * @param {number} mouseX マウスの画面上のx座標
     */
    getCanvasX(mouseX) {
        return mouseX - this._context.canvas.getBoundingClientRect().left
    }

    /**
     * マウスの画面上のy座標をキャンバスでのy座標に変換
     * @param {number} mouseY マウスの画面上のy座標
     */
    getCanvasY(mouseY) {
        return mouseY - this._context.canvas.getBoundingClientRect().top
    }
}