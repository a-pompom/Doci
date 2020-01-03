import { DrawConst } from '../const/drawingConst.js'

/**
 * フォーカス機能を管理するためのハンドラ
 * @property {number} focusedIndex 現在フォーカスしている対象のスタック上のインデックス -1→フォーカスなし
 * @property {Array} focusAngle フォーカスしている図形の方向 上・下・右下・左上などがある
 * @property {FocusMode} focusMode 図形のフォーカス領域を表す リサイズ・移動などフォーカス時の操作を切り替えるために利用
 */
export default class FocusHandler {
    
    constructor() {
        this._focusedIndex = -1
        this._focusedAngle = []

        this._focusMode = DrawConst.focus.FocusMode.NONE
    }

    /**
     * 
     * @param {Array<Shape>} shapeList フォーカス対象になり得る描画中の図形のリスト
     * @param {number} posX キャンバス中のカーソルX座標
     * @param {number} posY キャンバス中のカーソルY座標
     */
    inspectShapeFocus(shapeList, posX, posY) {

        this.outFocus()

        // 図形の線の幅のみをフォーカス範囲にすると、フォーカスしづらくなってしまうので、図形の線±10pxを対象範囲とする
        const range = 10
        const pos = {x: posX, y: posY}

        // 各図形の位置・現在のカーソル座標から、フォーカス対象が存在するか判定
        for (let i = shapeList.length-1; i >= 0; i--) {

            let shape = shapeList[i]

            // 先に枠部分のフォーカスを判定することで、枠と領域内で重複する部分のうち、枠内を優先できるようにする
            this.inspectBorderFocus(shape, pos, i, range)
            if (this.isFocused()) {
                break
            }

            if (!shape.hasArea) {
                continue
            }

            // 領域内フォーカス
            this.inspectInsideFocus(shape, pos, i)

            if (this.isFocused()) {
                break
            }
        }
    }

    /**
     * 
     * @param {Shape} shape フォーカスが発生しているかを判定する対象の図形
     * @param {object} pos マウスの座標
     * @param {number} index 現在参照中の図形のスタック上のインデックス
     * @param {number} range 枠線の領域の範囲 線のみを対象とすると、フォーカスが困難となってしまうので、ある程度幅をもたせる
     */
    inspectBorderFocus(shape, pos, index, range) {

        const height = shape.height
        const width = shape.width

        // マウスの座標が枠に相当する領域上に存在することをフォーカス中と判定

        // 上横 
        if ((pos.x >= shape.x - range && pos.x <= shape.x + range + width)    && (pos.y >= shape.y-range && pos.y <= shape.y + range))  {
            this.setFocusTarget(index, DrawConst.focus.FocusAngle.TOP)
        }
        // 左縦
        if ((pos.y >= shape.y - range && pos.y  <= shape.y + range + height)  && (pos.x >= shape.x-range && pos.x <= shape.x+range)) {
            this.setFocusTarget(index, DrawConst.focus.FocusAngle.LEFT)
        }
        // 右縦
        if ((pos.y >= shape.y - range && pos.y  <= shape.y + range + height)  && (pos.x >= shape.x-range + width && pos.x <= shape.x+range + width)) {
            this.setFocusTarget(index, DrawConst.focus.FocusAngle.RIGHT)
        }
        // 下横
        if ((pos.x >= shape.x - range && pos.x <= shape.x + range + width )   && (pos.y >= shape.y-range + height && pos.y <= shape.y + range + height))  {
            this.setFocusTarget(index, DrawConst.focus.FocusAngle.BOTTOM)
        }
    }

    /**
     * 図形の領域の内側にフォーカスしているかを判定
     * 
     * @param {Shape} shape フォーカスが発生しているか判定する対象の図形
     * @param {object} pos マウスの座標
     * @param {number} index 現在参照中の図形のスタック上のインデックス
     */
    inspectInsideFocus(shape, pos, index) {

        const height = shape.height
        const width = shape.width

        // 現在のマウスの位置(x, y)が(図形の描画開始x座標, 図形の描画開始y座標)と(図形の描画開始x座標 + 図形の幅, 図形の描画開始y座標 + 図形の高さ)
        // の2点がつくり出す四角の領域上に存在する場合、内側にフォーカスしているとみなす
        const isInsideX = shape.x < pos.x && pos.x < shape.x + width
        const isInsideY = shape.y < pos.y && pos.y < shape.y + height

        if (isInsideX && isInsideY) {
            this.setInsideFocusTarget(index)
        }
    }

    /**
     * 現在フォーカス中の対象を更新
     * @param {number} index 描画された図形の内、対象を識別するためのインデックス
     * @param {FocusAngle} angle 図形の上下左右どの部分へフォーカスしたか リサイズ時に利用
     */
    setFocusTarget(index, angle) {

        this._focusedIndex = index
        this._focusedAngle.push(angle)

        this._focusMode = DrawConst.focus.FocusMode.BORDER
    }

    /**
     * 現在内側にフォーカス中の対象を更新
     * 
     * @param {number} index 描画された図形の内、対象を識別するためのインデックス
     */
    setInsideFocusTarget(index) {

        this._focusedIndex = index
        this._focusMode = DrawConst.focus.FocusMode.INSIDE
    }

    /**
     * フォーカス対象から外れたと判定し、状態を初期化
     */
    outFocus() {
        this._focusedIndex = -1
        this._focusedAngle = []
        this._focusMode = DrawConst.focus.FocusMode.NONE
    }

    /**
     * 何らかの対象にフォーカスをしているか判定
     * @return {boolean} フォーカス中か否か
     */
    isFocused() {
        return this._focusedIndex !== -1
    }

    get focusMode() {
        return this._focusMode
    }

    get focusedIndex() {
        return this._focusedIndex
    }
    get focusedAngle() {
        return this.isFocused() ? this._focusedAngle : [DrawConst.focus.FocusAngle.NONE]
    }
}