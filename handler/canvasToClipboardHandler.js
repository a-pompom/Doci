/**
 * キャンバスをクリップボードにコピーするためのハンドラ
 */
export default class CanvasToClipboardHandler {

    constructor(context) {

        this._context = context

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
    }

    /**
     * キャンバスをクリップボードにコピー
     */
    setClipBoard() {

        this._context.canvas.toBlob((blob) => {

            const clipboardItem =  new ClipboardItem({ [blob.type]: blob})

            navigator.clipboard.write([clipboardItem])
        })
    }
}