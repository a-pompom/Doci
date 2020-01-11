import DrawingUtil from '../drawingUtil.js'
import {DrawConst} from '../const/drawingConst.js'
/**
 * キャンバスをクリップボードにコピーするためのハンドラ
 * 
 * @property {Object} context 描画コンテキスト
 * @property {Number} KeyCode コピーのショートカットキー
 */
export default class CanvasToClipboardHandler {

    constructor(context) {

        this._context = context
        this._KeyCode = DrawConst.menu.KeyCode.Key_C

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

        // Cキーでもコピー可能とする
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

        // toBlobでは、blobとなったキャンバス情報を指定した形式(png)に設定し、クリップボードに書き込む
        canvasForClip.toBlob((blob) => { 

            const clipboardItem =  new ClipboardItem({ [blob.type]: blob})

            navigator.clipboard.write([clipboardItem])

            this.showCopiedMessage()

        }, 'image/png', 1)
    }

    /**
     * キャンバスをクリップボードにコピー完了した際のメッセジー時を表示
     */
    showCopiedMessage() {

        // クリップボードへのコピーは内部的に行われるので、成功したことをユーザに表示
        // 表示時間があまりにも長いとUXを欠いてしまうので、0.5秒ほど表示
        const messageShowMs = 500
        const copiedMessage = document.getElementById('copiedMessage')

        copiedMessage.classList.remove(DrawConst.cssClass.CSS_Class.INVISIBLE)

        setTimeout(()=> {

            copiedMessage.classList.add(DrawConst.cssClass.CSS_Class.INVISIBLE)

        }, messageShowMs)
    }

    /**
     * クリップボードにコピーするキャンバスを取得
     * 線がぼやけるのを防ぐため、解像度を上げていたので、そのままコピーすると巨大な画像となってしまう
     * よって、コピーする際には原寸大となるよう一時キャンバスで縮小して描画し、戻り値として返す
     */
    getClipCanvas() {

        const canvasForClip = document.createElement('canvas')
        const ctx = canvasForClip.getContext('2d')

        // 原寸大の大きさに
        canvasForClip.width = this._context.canvas.width / DrawingUtil.getPixelRatio()
        canvasForClip.height = this._context.canvas.height / DrawingUtil.getPixelRatio()

        ctx.drawImage(this._context.canvas, 0,0, canvasForClip.width, canvasForClip.height)

        return canvasForClip
    }
}