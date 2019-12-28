

import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

import ImageShape from '../shape/imageShape.js'

import ResizeHandler from '../handler/resizeHandler.js'

/**
 * 画像の描画を管理
 * 
 */
export default class ImageDrawing extends BaseDrawing{

    constructor(context) {
        super(context)

        this._posX = 0
        this._posY = 0

        this._focusedImage = null
        this._resizeHandler = new ResizeHandler()

        this.init()
    }

    init() {
        document.addEventListener('paste', (event) => {

            this.pasteEvent(event)
        })
    }

    setupEvent(eventType, event) {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.IMAGE)) {
            return
        }

        if (!this._context.focus.isFocused()) {
            return
        }
        
        this[`${eventType}Event`].call(this,event)
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * 貼り付け時に実行されるイベント
     * 
     * @param {Event} event 
     */
    pasteEvent(event) {
        console.log('paste event called')

        const pastedImage = new Image()
        const clipboardItem = event.clipboardData.items[0]
        const blob = clipboardItem.getAsFile()
        const urlObj = window.URL

        const source = urlObj.createObjectURL(blob)

        pastedImage.onload = () => {

            const imageShape = new ImageShape(this._context, this._posX, this._posY, pastedImage)
            imageShape.width = pastedImage.width
            imageShape.height = pastedImage.height

            imageShape.fullDraw()

            this._context.drawStack.append(imageShape)

        }

        pastedImage.src = source
    }

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousedownEvent(event) {

        this._context.isMousedown = true

        this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)
        const focusedShape = this._context.drawStack.getCurrent()

        if (!focusedShape.resizable) {
            return
        }

        focusedShape.setOriginPos()
        focusedShape.setOriginScale()
    }

    /**
     * マウスを動かしたときの処理 マウス押下中は描画中の図形のリサイズイベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousemoveEvent(event) {

        if (!this._context.isMousedown) {
            return
        }

        this._posX = this.getCanvasX(event.clientX)
        this._posY = this.getCanvasY(event.clientY)

        // リサイズした後、画面上に図形を描画
        const imageShape = this._context.drawStack.getCurrent()
        this.resize(imageShape, event)

        imageShape.fullDraw()
    }
    
    /**
     * マウスを離したときの処理 フォーカス終了イベントを発火 
     */
    mouseupEvent() {

        this._context.isMousedown = false

        this._context.focus.outFocus()
    }

    // ----------------------------------------------- メソッド ----------------------------------------------- 


    /**
     * 図形のリサイズを実行
     * 
     * @param {Shape} resizeShape リサイズ対象の図形
     * @param {Event} event  イベントオブジェクト
     */
    resize(resizeShape, event) {

        const x = this.getCanvasX(event.clientX)
        const y = this.getCanvasY(event.clientY)

        this._resizeHandler.shape = resizeShape
        this._resizeHandler.resize(x, y, this._context.focus.focusedAngle)
    }

}