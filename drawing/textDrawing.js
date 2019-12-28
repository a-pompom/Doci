import BoxText from '../shape/boxText.js'
import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

import TextService from '../service/textService.js'

/**
 * テキストの描画を管理
 * @property {DOM} originTextDOM 入力テキストを保持するためのテキストエリアのDOM
 */
export default class TextDrawing extends BaseDrawing{

    constructor(context) {
        super(context)
        this._originTextDOM = document.getElementById('inputText')

        this._service = new TextService(this._context, this)

        this.init()
    }

    /**
     * 初期処理
     * キャンバスに文字を描画する際、透明なテキストエリアを利用しており、当該要素はキャンバスの外に存在するので、
     * 別途イベントを登録
     */
    init() {

        this._originTextDOM.addEventListener('keydown', (event) => {
            this.setupEvent('keydown', event)
        })

        this._originTextDOM.addEventListener('blur', (event) => {
            this.blurEvent(event)
        })

    }

    /**
     * イベントの前処理を実行 主に描画モードの判定で利用
     * 
     * @param {string} eventType 実行されるイベントの種類
     * @param {Event} event イベントオブジェクト
     */
    setupEvent(eventType, event) {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.TEXT)) {
            return
        }
        
        this[`${eventType}Event`].call(this,event)
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * キャンバス内クリックイベント テキストの入力を開始
     * 
     * @param {Event} event 
     */
    clickEvent(event) {

        // 新規描画
        if (!this._context.focus.isFocused()) {

            const text = new BoxText(this._context, this.getCanvasX(event.clientX), this.getCanvasY(event.clientY)) 

            this._service.handleClickEvent(text)

            this._context.drawStack.append(boxText)

            return
        }

        // 編集
        const shape = this._context.drawStack.getByIndex(this._context.focus.focusedIndex)

        // テキスト編集
        if (shape.shapeType === DrawConst.shape.ShapeType.TEXT) {

            this._service.handleClickEvent(shape)

            return
        }

        // 図形内に描画
        if (shape.canIncludeText && 
                this._context.focus.focusMode === DrawConst.focus.FocusMode.INSIDE) {
                    
            // 図形内に新規描画
            if (shape.boxText === null) {
                shape.boxText = new BoxText(this._context, shape.x +15, shape.y + 20, shape.width)
            }

            this._service.handleBoxClickEvent(shape)
        }
    }

    /**
     * キー入力イベント 入力文字列をキャンバス上に描画
     * 
     * @param {Event} event 
     */
    keydownEvent(event) {

        // Escキー押下でも終了可能とする
        if (event.keyCode === 27) {
            this._originTextDOM.blur()

        }

        const shape = this.getFocusedShape()

        this._service.handleKeyEvent(shape)
    }

    /**
     * フォーカスが外れたときに実行されるイベント テキスト入力エリアを初期化
     * 
     * @param {Event} event 
     */
    blurEvent(event) {

        this._service.handleBlurEvent()
    }

}