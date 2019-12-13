import {FocusAngle} from './mode.js'
import BaseHandler from './baseHandler.js'

/**
 * フォーカス機能を管理するためのハンドラ
 */
export default class FocusHandler extends BaseHandler {
    
    constructor() {
        super()

        this._focusedIndex = -1
        this._focusedAngle = FocusAngle.NONE
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

            // 図形の線の幅のみをフォーカス範囲にすると、フォーカスしづらくなってしまうので、図形の線±10pxを対象範囲とする
            const range = 10

            // 上横 
            if ((posX >= shape.x - range && posX <= shape.x + range + width)    && (posY >= shape.y-range && posY <= shape.y + range))  {
                console.log('上横')
                this.setFocusTarget(i, FocusAngle.TOP)
                break
            }
            // 左縦
            if ((posY >= shape.y - range && posY  <= shape.y + range + height)  && (posX >= shape.x-range && posX <= shape.x+range)) {
                console.log('左縦')
                this.setFocusTarget(i, FocusAngle.LEFT)
                break
            }
            // 右縦
            if ((posY >= shape.y - range && posY  <= shape.y + range + height)  && (posX >= shape.x-range + width && posX <= shape.x+range + width)) {
                console.log('右縦')
                this.setFocusTarget(i, FocusAngle.RIGHT)
                break
            }
            // 下横
            if ((posX >= shape.x - range && posX <= shape.x + range + width )   && (posY >= shape.y-range + height && posY <= shape.y + range + height))  {
                console.log('下横')
                this.setFocusTarget(i, FocusAngle.BOTTOM)
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
        this._focusedAngle = angle
    }

    /**
     * フォーカス対象から外れたと判定し、状態を初期化
     */
    outFocus() {
        this._focusedIndex = -1
        this._focusedAngle = FocusAngle.NONE
    }

    /**
     * 何らかの対象にフォーカスをしているか判定
     * @return {boolean} フォーカス中か否か
     */
    isFocused() {
        return this._focusedIndex !== -1
    }


    get focusedIndex() {
        return this._focusedIndex
    }
    get focusedAngle() {
        return this._focusedAngle
    }
}