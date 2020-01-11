import {DrawConst} from '../const/drawingConst.js'
import DrawingUtil from '../drawingUtil.js'
import MetaShape from '../shape/metaShape.js'

/**
 * 描画スタックを扱うためのハンドラ 主に初期描画・アクティブなスタックの切り替え機能を持つ
 * 
 * @property {Object} context 描画コンテキスト
 * @property {Number} currentStack 現在描画対象のスタックのインデックス
 * @property {Number} stackScale 一つのスタックの画面上の大きさ 解像度をもとに動的に算出
 * @property {MetaShape} metaShape 描画スタックの切り替わりを描画するためのメタ図形
 */
export default class StackHandler {

    constructor(context) {

        this._context = context

        this._currentStack = 0
        this._stackScale = 0

        this._metaShape = new MetaShape(this._context)

        this.init()
    }

    /**
     * 初期処理 以下を行う
     * ・画面に表示するスタックの大きさを規定
     * ・クリック・ショートカットキーイベントの登録
     */
    init() {

        this.initDOMScale()

        for (let i=0; i < DrawConst.stack.StackLength; i++) {

            const stackDOM = document.getElementById(`stackButton-${i}`)

            stackDOM.addEventListener('click', () => {

                this.registerHandleEvent(i)

            })

            // 各数字キーでもスタックを切り替え可能とする
            document.addEventListener('keydown', (event) => {

                // 対応した数字が押されたときのみ切り替え
                if (DrawingUtil.isTextInputMode() || event.keyCode !== DrawConst.stack.StackKeyCode[`Key_${i+1}`]) {

                    return
                }

                this.registerHandleEvent(i)

            })
        }
    }

    /**
     * 画面上に表示されるスタックの大きさを設定
     */
    initDOMScale() {

        const screenHeight = document.body.clientHeight

        // 解像度によって描画スタックの大きさは異なるが、SPAっぽくしたいので、以下の方式で算出
        // (ウィンドウの高さ) / (ベースの係数(10等分) +(画面サイズに応じた係数))
        // 上記の式により、ある程度画面内にバランスよく収まる形となる
        const baseCoefficient = DrawConst.stack.StackScaleCoefficient.base
        const ratioCoefficient = DrawConst.stack.StackScaleCoefficient.ratio
        this._stackScale = screenHeight / (baseCoefficient + (ratioCoefficient / DrawingUtil.getPixelRatio()))

        for (let i=0; i < DrawConst.stack.StackLength; i++) {

            // 描画スタック + スタック番号のブロック
            const stackDOM = document.getElementById(`stackButton-${i}`)

            stackDOM.style.width = `${DrawConst.stack.StackWidth}px`
            stackDOM.style.height = `${this._stackScale + DrawConst.stack.StackHeightCoefficient}px`

            // 描画スタック単体
            const imageDOM = document.getElementById(`image-${i}`)

            imageDOM.width = DrawConst.stack.StackWidth
            imageDOM.height = this._stackScale
        }
    }

    /**
     * クリック/ショートカットキークリックで発火するイベントを処理
     * サムネイルを生成し、アクティブな描画スタックを切り替え
     * 
     * @param {Number} index イベント発生元の描画スタックのインデックス
     */
    registerHandleEvent(index) {

        // キャンバスが空でない場合はサムネイルを生成
        if (this._context.drawStackList[this._currentStack].length !== 0) {

            this.createThumbNail(this._currentStack)
        }

        // 描画スタックの切り替え
        DrawingUtil.deactivateClass(`image-${this._currentStack}`, 'active-stack')
        this._context.drawStack = this._context.drawStackList[index]
        this._currentStack = index
        DrawingUtil.activateClass(`image-${this._currentStack}`, 'active-stack')

        // 切り替わった後のキャンバスを再描画
        this._context.focus.outFocus()
        this._metaShape.draw(this._metaShape.drawBase, this._metaShape)

        if (this._context.drawStack.stack.length !== 0) {

            this._context.drawStack.draw()
        }
    }

    /**
     * 各描画スタックを識別できるようキャンバスをもとにサムネイルを生成
     * 
     * @param {Number} index サムネイルを生成する描画スタックのインデックス
     */
    createThumbNail(index) {

        const theURI = this._context.canvas.toDataURL()
        const theImage = document.getElementById(`image-${index}`)
        theImage.src = theURI
    }

    /**
     * スタックを描画中としてアクティブにする
     * 
     * @param {Number} index アクティブにするスタックのインデックス
     */
    activate(index) {
        document.getElementById(`image-${index}`).classList.add(DrawConst.cssClass.CSS_Class.ACTIVE_STACK)
    }

    /**
     * スタックのアクティブを解除
     * 
     * @param {Number} index アクティブを解除するスタックのインデックス
     */
    deactivate(index) {
        document.getElementById(`image-${index}`).classList.remove(DrawConst.cssClass.CSS_Class.ACTIVE_STACK)
    }
}