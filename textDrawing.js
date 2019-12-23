import BoxText from './boxText.js'
import { DrawConst } from './drawingConst.js'
import BaseDrawing from './baseDrawing.js'

/**
 * テキストの描画を管理
 * @property {DOM} originTextDOM 入力テキストを保持するためのテキストエリアのDOM
 */
export default class TextDrawing extends BaseDrawing{

    constructor(context) {
        super(context)
        this._originTextDOM = document.getElementById('inputText')

        this.init()
    }

    /**
     * 初期処理
     * キャンバスに文字を描画する際、透明なテキストエリアを利用しており、当該要素はキャンバスの外に存在するので、
     * 別途イベントを登録
     */
    init() {

        this._originTextDOM.addEventListener('keydown', (event) => {
            this.keydownEvent(event)
        })

        this._originTextDOM.addEventListener('blur', (event) => {
            this.blurEvent(event)
        })

    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * キャンバス内クリックイベント テキストの入力を開始
     * 
     * @param {Event} event 
     */
    clickEvent(event) {

        if (!this.isActiveMode(DrawConst.menu.DrawMode.TEXT)) {
            return 
        }

        // 新規描画
        if (!this._context.focus.isFocused()) {

            const boxText = new BoxText(this._context, this.getCanvasX(event.clientX), this.getCanvasY(event.clientY)) 
            this.setTextDOMPos(boxText.x, boxText.y)

            this._context.drawStack.append(boxText)

            return
        }

        // 編集
        this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)

        const shape = this._context.drawStack.getCurrent()

        // テキスト編集
        if (shape.shapeType === DrawConst.shape.ShapeType.TEXT) {

            this.setTextDOMPos(shape.x, shape.y)
            this.setTextDOMScale(shape.width, shape.height)

            this._originTextDOM.value = shape.originText

            this._originTextDOM.focus()
        }

        // 図形内に描画
        if (shape.shapeType === DrawConst.shape.ShapeType.BOX && 
                this._context.focus.focusMode === DrawConst.focus.FocusMode.INSIDE) {
                    
            // 図形内に新規描画
            if (shape.boxText === null) {
                shape.boxText = new BoxText(this._context, shape.x +15, shape.y + 20, shape.width)
            }

            this.setTextDOMPos(shape.x + 15, shape.y + 20)
            this.setTextDOMScale(shape.width, shape.height)

            this._originTextDOM.value = shape.boxText.originText
            this._originTextDOM.focus()
        }
    }

    /**
     * キー入力イベント 入力文字列をキャンバス上に描画
     * 
     * @param {Event} event 
     */
    keydownEvent(event) {

        if (!this.isActiveMode(DrawConst.menu.DrawMode.TEXT)) {
            return 
        }

        // Escキー押下でも終了可能とする
        if (event.keyCode === 27) {
            this._originTextDOM.blur()

        }

        const shape = this._context.drawStack.getCurrent()

        // 図形領域内に文字列を描画する場合、テキスト描画開始位置を図形の左上に設定
        if (shape.shapeType === DrawConst.shape.ShapeType.BOX) {

            this.setTextDOMPos(shape.x + 15, shape.y + 20)

            shape.updateText()
            shape.fullDraw()
            return
        }

        shape.update()
        shape.fullDraw()

    }

    /**
     * フォーカスが外れたときに実行されるイベント テキスト入力エリアを初期化
     * 
     * @param {Event} event 
     */
    blurEvent(event) {
        this._originTextDOM.style.top = 0
        this._originTextDOM.style.left = 0
        this._originTextDOM.style.width = 0
        this._originTextDOM.style.height = 0

    }
    // ----------------------------------------------- メソッド ----------------------------------------------- 

    /**
     * 
     * @param {number} posX テキスト入力エリアのx座標
     * @param {number} posY テキスト入力エリアのy座標
     */
    setTextDOMPos(posX, posY) {
        this._originTextDOM.style.top = posY + 60 + 'px'
        this._originTextDOM.style.left = posX + 'px'
    }

    /**
     * 
     * @param {number} scaleX テキスト入力エリアの幅
     * @param {number} scaleY テキスト入力エリアの高さ
     */
    setTextDOMScale(scaleX, scaleY) {
        this._originTextDOM.style.width = scaleX + 'px'
        this._originTextDOM.style.height = scaleY + 50 + 'px'

    }

}