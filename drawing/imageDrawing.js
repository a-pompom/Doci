

import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

import ImageShape from '../shape/imageShape.js'
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
            console.log(pastedImage)
            console.log(pastedImage.width)

            const imageShape = new ImageShape(this._context, this._posX, this._posY, pastedImage)
            imageShape.width = pastedImage.width
            imageShape.height = pastedImage.height

            imageShape.fullDraw()

            this._context.drawStack.append(imageShape)
        }

        pastedImage.src = source
    }


    /**
     * マウス移動イベント 画像を配置するキャンバス上の座標を監視
     * 
     * @param {Event} event 
     */
    mousemoveEvent(event) {
        
        if (!this.isTheModeActive(DrawConst.menu.DrawMode.IMAGE)) {
            return
        }

        this._posX = this.getCanvasX(event.clientX)
        this._posY = this.getCanvasY(event.clientY)
    }
}