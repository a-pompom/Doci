export default class BaseDrawing {

    constructor(context) {

        this._context = context
    }

    isTheModeActive(mode) {

        if (this._context.menu.activeMode === mode) {
            return true
        }

        return false
    }

    setupEvent(eventType, event) {
    }

    getFocusedShape() {
        return this._context.drawStack.getByIndex(this._context.focus.focusedIndex)
    }

    getDrawingShape() {
        if (this._context.focus.isFocused()) {
            return this.getFocusedShape()
        }

        return this._context.drawStack.getCurrent()
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