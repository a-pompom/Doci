
import { DrawConst } from './drawingConst.js'
import BaseDrawing from './baseDrawing.js'

/**
 * 図形の移動を描画
 * 
 * @property {number} moveStartX 移動開始地点のx座標
 * @property {number} moveStartY 移動開始地点のy座標
 */
export default class MoveDrawing extends BaseDrawing{

    constructor(context) {
        super(context)
    }
    

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
    clickEvent(event) {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.DELETE)) {
            return
        }

        if (!this._context.focus.isFocused()) {
            return
        }

        this.delete()

        this._context.focus.outFocus()

        this._context.drawStack.draw()

    }

    /**
     * 現在フォーカスしている図形をキャンバスから削除
     */
    delete() {

        const deleteTargetIndex = this._context.focus.focusedIndex
        console.log(deleteTargetIndex)

        this._context.drawStack.delete(deleteTargetIndex)
    }


}