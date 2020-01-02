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

        this._context.canvas.toBlob((blob) => {

            const clipboardItem =  new ClipboardItem({ [blob.type]: blob})

            navigator.clipboard.write([clipboardItem])

            this.showCopiedMessage()
        }, 'image/png', 1.00)
    }

    showCopiedMessage() {

        const copiedMessage = document.getElementById('copiedMessage')
        copiedMessage.classList.remove('invisible')

        setTimeout(()=> {

            copiedMessage.classList.add('invisible')

        }, 500)
    }
}