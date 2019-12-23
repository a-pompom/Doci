import { DrawConst } from './drawingConst.js'

/**
 * 図形の移動を描画
 * 
 * @property {number} moveStartX 移動開始地点のx座標
 * @property {number} moveStartY 移動開始地点のy座標
 */
export default class MoveDrawing{

    constructor(context) {
        this._context = context

        this._moveStartX = 0
        this._moveStartY = 0
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousedownEvent(event) {

        if (this._context.menu.activeMode !== DrawConst.menu.DrawMode.MOVE) {
            return
        }

        if (!this._context.focus.isFocused()) {
            return
        }

        this._context.isMousedown = true

        // フォーカス中の場合、画面上の図形を移動可能とする
        this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)

        this._moveStartX = this.getCanvasX(event.clientX)
        this._moveStartY = this.getCanvasY(event.clientY)
    }

    /**
     * マウスを動かしたときの処理 マウス押下中は描画中の図形の移動処理を発火
     * @param {Event} event イベントオブジェクト
     */
    mousemoveEvent(event) {

        if (this._context.menu.activeMode !== DrawConst.menu.DrawMode.MOVE) {
            return
        }

        if (!this._context.isMousedown) {
            return
        }

        const shape = this._context.drawStack.getCurrent()

        const canvasX = this.getCanvasX(event.clientX)
        const canvasY = this.getCanvasY(event.clientY)

        this.move(shape, canvasX, canvasY)

    }
    
    /**
     * マウスを離したときの処理 フォーカス終了イベントを発火 
     */
    mouseupEvent() {

        if (this._context.menu.activeMode !== DrawConst.menu.DrawMode.MOVE) {
            return
        }

        this._context.focus.outFocus()

        this._context.isMousedown = false

        // 基準位置をリセット
        this._moveStartX = 0
        this._moveStartY = 0
    }

    // ----------------------------------------------- メソッド ----------------------------------------------- 

    /**
     * フォーカス中の図形を移動
     * 
     * @param {Shape} shape 移動対象の図形
     * @param {number} canvasX クリックしているキャンバスのX座標
     * @param {number} canvasY クリックしているキャンバスのy座標
     */
    move(shape, canvasX, canvasY) {

        // 移動を自然な動きとするため、クリックした箇所と現在のキャンバス上のマウスの座標の差分を移動距離とする
        const deltaX = canvasX - this._moveStartX
        const deltaY = canvasY - this._moveStartY

        // 左/上向きの場合は負・右/下向きの場合は正の移動距離となるので、そのまま図形の描画開始位置に加算
        shape.x += deltaX
        shape.y += deltaY

        shape.fullDraw()

        // 移動距離が過剰に大きくならないよう、次の描画での基準位置を更新
        this._moveStartX = canvasX
        this._moveStartY = canvasY
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