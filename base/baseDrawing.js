/**
 * 描画機能の基底クラス
 * 
 * @property {Object} context 描画コンテキスト
 */
export default class BaseDrawing {

    constructor(context) {

        this._context = context
    }

    /**
     * 描画モードが描画管理クラスで扱う対象かを判定
     * 
     * @param {MenuMode} mode 描画モード
     */
    isTheModeActive(mode) {

        if (this._context.menu.activeMode === mode) {
            return true
        }

        return false
    }

    /**
     * イベントの前処理を定義
     * 
     * @param {string} eventType イベントの種類(click, mousedownなど)
     * @param {Event} event 
     */
    setupEvent(eventType, event) {
    }

    /**
     * 描画対象の図形を取得
     */
    getDrawingShape() {
        if (this._context.focus.isFocused()) {
            return this.getFocusedShape()
        }

        return this._context.drawStack.getCurrent()
    }

    /**
     * フォーカス中の図形を取得
     */
    getFocusedShape() {
        return this._context.drawStack.getByIndex(this._context.focus.focusedIndex)
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