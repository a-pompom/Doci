import MenuHandler from './menuHandler.js'

import FocusHandler from './focusHandler.js'
import DrawStack from '../drawStack.js'

import MetaDrawing from '../drawing/metaDrawing.js'
import MoveDrawing from '../drawing/moveDrawing.js'
import DeleteDrawing from '../drawing/deleteDrawing.js'
import TextDrawing from '../drawing/textDrawing.js'
import RectangleDrawing from '../drawing/rectangleDrawing.js'
import ImageDrawing from '../drawing/imageDrawing.js'
import CursorDrawing from '../drawing/cursorDrawing.js'

import CanvasToClipboardHandler from './canvasToClipboardHandler.js'
import StackHandler from './stackHandler.js'
/**
 * 描画機能を扱うハンドラ
 * 
 * @property {Object} context 描画コンテキスト
 *     ・canvas: キャンバス
 *     ・canvasContext: キャンバスのコンテキスト
 *     ・isMousedown: マウスが押下されているか
 *     ・drawStack: 描画スタック
 *     ・menu: メニューを管理
 *     ・focus: フォーカス機能を管理
 */
export default class DrawingHandler{

    constructor() {
        this._context = this.getContext()

        this.init()
    }

    getContext() {

        const canvas = document.getElementById('myCanvas')
        const canvasContext = canvas.getContext('2d')
        const drawStackList = this.getDrawStackList(9)
        const currentStack = 0

        return {
            canvas: canvas,
            canvasContext: canvasContext,
            isMousedown: false,
            currentStack: currentStack,

            drawStackList: drawStackList,
            drawStack: drawStackList[currentStack],
            menu: new MenuHandler(),
            focus: new FocusHandler(),
        }

    }

    init() {

        const canvasToClipboard = new CanvasToClipboardHandler(this._context)
        const stackHandler = new StackHandler(this._context)

        this.setCanvasScale()

        // アプリで実行され得るイベントの種類
        const occurEvents = ['mousedown', 'mousemove', 'mouseup', 'click']
        // アプリで描画されるオブジェクト
        const drawingList = [
            new MetaDrawing(this._context),
            new RectangleDrawing(this._context), new TextDrawing(this._context), new ImageDrawing(this._context),
            new MoveDrawing(this._context), new DeleteDrawing(this._context), new CursorDrawing(this._context)
        ]

        occurEvents.forEach((event) => {
            const targetEvents = []

            // 各描画機能で扱うイベントを取得
            drawingList.forEach((drawing, index) => {

                if (typeof drawing[`${event}Event`] === 'function') {
                    targetEvents.push(index)
                }
            })

            // イベントリスナーで発火させるべきイベントを設定
            this._context.canvas.addEventListener(event, (eventArg) => {

                targetEvents.forEach((targetIndex) => {

                    // インターセプターで前処理を実行した後、イベント処理を発火
                    drawingList[targetIndex]['setupEvent'].call(drawingList[targetIndex],event, eventArg)
                })

            })

        })

    }

    getDrawStackList(stackLength) {
        let drawStackList = []

        for (let i=0; i<stackLength; i++) {
            drawStackList.push(new DrawStack())
        }

        return drawStackList
    }

    setCanvasScale() {
        const ratio = window.devicePixelRatio + 0.4

        this._context.canvas.width = (document.body.clientWidth - 160) *ratio
        this._context.canvas.height = document.body.clientHeight *ratio

        this._context.canvas.style.width = `${(document.body.clientWidth -160)}px`
        this._context.canvas.style.height = `${(document.body.clientHeight)}px`

        this._context.canvasContext.setTransform(ratio,0,0,ratio,0,0)
    }

}