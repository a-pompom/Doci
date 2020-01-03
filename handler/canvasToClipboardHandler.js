import DrawingUtil from '../drawingUtil.js'
/**
 * キャンバスをクリップボードにコピーするためのハンドラ
 */
export default class CanvasToClipboardHandler {

    constructor(context) {

        this._context = context
        this._KeyCode = 67

        this.init()
    }

    /**
     * 初期処理 クリックでクリップボードに追加するイベントを登録
     */
    init() {
        
        const canvasToClipboardButton = document.getElementById('canvasToClipboardButton')

        canvasToClipboardButton.addEventListener('click', (event) => {

            this.setClipBoard()

        })

        document.addEventListener('keydown', (event) => {
            if (DrawingUtil.isTextInputMode() || event.keyCode !== this._KeyCode) {
                return
            }

            this.setClipBoard()
        })
    }

    /**
     * キャンバスをクリップボードにコピー
     */
    setClipBoard() {
        const canvasForClip = this.getClipCanvas()

        console.log(this._context.canvas.width)
        canvasForClip.toBlob((blob) => { 

            const clipboardItem =  new ClipboardItem({ [blob.type]: blob})

            navigator.clipboard.write([clipboardItem])

            this.showCopiedMessage()
        }, 'image/png', 1)

    }

    showCopiedMessage() {

        const copiedMessage = document.getElementById('copiedMessage')
        copiedMessage.classList.remove('invisible')

        setTimeout(()=> {

            copiedMessage.classList.add('invisible')

        }, 500)
    }

    getClipCanvas() {
        const canvasForClip = document.createElement('canvas')

        const ctx = canvasForClip.getContext('2d')
        canvasForClip.width = this._context.canvas.width / (window.devicePixelRatio +0.4)
        canvasForClip.height = this._context.canvas.height / (window.devicePixelRatio +0.4)

        ctx.drawImage(this._context.canvas, 0,0, canvasForClip.width, canvasForClip.height)
        console.log(canvasForClip.width)

        return canvasForClip
    }
}