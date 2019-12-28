

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

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * 貼り付け時に実行されるイベント
     * 
     * @param {Event} event 
     */
    pasteEvent(event) {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.IMAGE)) {
            return
        }

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

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.IMAGE)) {
            return
        }

        this._context.isMousedown = true

        if (!this.isImageFocused()) {
            return
        }

        // フォーカス中の場合、画面上の図形をリサイズ可能とする
        this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)
        const focusedImage = this._context.drawStack.getCurrent()

        focusedImage.setOriginPos()
    }

    /**
     * マウスを動かしたときの処理 マウス押下中は描画中の図形のリサイズイベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousemoveEvent(event) {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.IMAGE) || !this._context.isMousedown) {
            return
        }

        this._posX = this.getCanvasX(event.clientX)
        this._posY = this.getCanvasY(event.clientY)

        if (!this.isImageFocused()) {
            return
        }

        // リサイズした後、画面上に図形を描画
        const imageShape = this._context.drawStack.getCurrent()
        console.log(imageShape)
        this.resize(imageShape, event)

        imageShape.fullDraw()
    }
    
    /**
     * マウスを離したときの処理 フォーカス終了イベントを発火 
     */
    mouseupEvent() {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.IMAGE)) {
            return
        }

        this._context.isMousedown = false

        if (!this.isImageFocused()) {
            return
        }

        // 別の図形へフォーカスを可能とするため、フォーカスを解放
        const currentImage = this._context.drawStack.getCurrent()
        currentImage.originY = currentImage.y
        currentImage.originX = currentImage.x

        this._context.focus.outFocus()

    }

    isImageFocused() {

        if (this._context.focus.focusedIndex === -1) {
            return false
        }
        
        const focusedShape = this._context.drawStack.getByIndex(this._context.focus.focusedIndex)

        return focusedShape.shapeType === DrawConst.shape.ShapeType.IMAGE
    }

    /**
     * 図形のリサイズを実行
     * 
     * @param {PointRectangle} pointRectangle リサイズ対象の図形
     * @param {Event} event  イベントオブジェクト
     */
    resize(imageShape, event) {

        const x = this.getCanvasX(event.clientX)
        const y = this.getCanvasY(event.clientY)

        this._resizeHandler.shape = imageShape
        this._resizeHandler.resize(x, y, this._context.focus.focusedAngle)
    }
}