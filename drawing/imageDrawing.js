

import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

/**
 * 画像の描画を管理
 * 
 */
export default class ImageDrawing extends BaseDrawing{

    constructor(context) {
        super(context)

        this._posX = 0
        this._posY = 0

        this.init()
    }

    init() {
        document.addEventListener('paste', (event) => {

            this.pasteEvent(event)

        })
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

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

            this._context.canvasContext.drawImage(pastedImage, this._posX, this._posY)
        }

        pastedImage.src = source
    }


    mousemoveEvent(event) {
        
        if (!this.isTheModeActive(DrawConst.menu.DrawMode.IMAGE)) {
            return
        }

        this._posX = this.getCanvasX(event.clientX)
        this._posY = this.getCanvasY(event.clientY)
    }
}