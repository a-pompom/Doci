import {FocusAngle} from './mode.js'
import BaseHandler from './baseHandler.js'

/**
 * フォーカス機能を管理するためのハンドラ
 */
export default class FocusHandler extends BaseHandler {
    
    constructor() {
        super()

        this._focusedIndex = -1
        this._focusedAngle = []

        this.FocusMode = {
            NONE: Symbol('focus-none'),
            BORDER: Symbol('border'),
            INSIDE: Symbol('inside')
        }

        this._focusMode = this.FocusMode.NONE
    }

    /**
     * 
     * @param {Array<Shape>} shapeList フォーカス対象になり得る描画中の図形のリスト
     * @param {number} posX キャンバス中のカーソルX座標
     * @param {number} posY キャンバス中のカーソルY座標
     */
    inspectShapeFocus(shapeList, posX, posY) {

        // 各図形の位置・現在のカーソル座標から、フォーカス対象が存在するか判定
        for (let i = shapeList.length-1; i >= 0; i--) {
            let shape = shapeList[i]

            const height = shape.height
            const width = shape.width
            const isInsideX = shape.x < posX && posX < shape.x + width
            const isInsideY = shape.y < posY && posY < shape.y + height

            // 図形の線の幅のみをフォーカス範囲にすると、フォーカスしづらくなってしまうので、図形の線±5pxを対象範囲とする
            const range = 10

            this.outFocus()


            // 上横 
            if ((posX >= shape.x - range && posX <= shape.x + range + width)    && (posY >= shape.y-range && posY <= shape.y + range))  {
                console.log('border')
                this.setFocusTarget(i, FocusAngle.TOP)
            }
            // 左縦
            if ((posY >= shape.y - range && posY  <= shape.y + range + height)  && (posX >= shape.x-range && posX <= shape.x+range)) {
                console.log('border')
                this.setFocusTarget(i, FocusAngle.LEFT)
            }
            // 右縦
            if ((posY >= shape.y - range && posY  <= shape.y + range + height)  && (posX >= shape.x-range + width && posX <= shape.x+range + width)) {
                console.log('border')
                this.setFocusTarget(i, FocusAngle.RIGHT)
            }
            // 下横
            if ((posX >= shape.x - range && posX <= shape.x + range + width )   && (posY >= shape.y-range + height && posY <= shape.y + range + height))  {
                console.log('border')
                this.setFocusTarget(i, FocusAngle.BOTTOM)
            }

            if (isInsideX && isInsideY) {
                console.log('inside')
                this.setInsideFocusTarget(i)
                break
            }

            if (this.isFocused()) {
                break
            }
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

        this._focusMode = this.FocusMode.BORDER
    }

    setInsideFocusTarget(index) {
        this._focusedIndex = index
        this._focusMode = this.FocusMode.INSIDE
    }

    /**
     * フォーカス対象から外れたと判定し、状態を初期化
     */
    outFocus() {
        this._focusedIndex = -1
        this._focusedAngle = []
        this._focusMode = this.FocusMode.NONE
    }

    /**
     * 何らかの対象にフォーカスをしているか判定
     * @return {boolean} フォーカス中か否か
     */
    isFocused() {
        return this._focusedIndex !== -1
    }

    isBorderFocused() {
        return this._focusMode === this.FocusMode.BORDER
    }

    isInsideFocused() {
        return this._focusMode === this.FocusMode.INSIDE
    }

    get focusedIndex() {
        return this._focusedIndex
    }
    get focusedAngle() {
        return this.isFocused() ? this._focusedAngle : [FocusAngle.NONE]
    }
}