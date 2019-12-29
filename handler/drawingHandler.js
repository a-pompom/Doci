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
        this._context = {
            canvas: document.getElementById('myCanvas'),
            canvasContext: document.getElementById('myCanvas').getContext('2d'),
            isMousedown: false,

            drawStack: new DrawStack(),
            menu: new MenuHandler(),
            focus: new FocusHandler(),
        }

        this.init()
    }

    init() {

        const canvasToClipboard = new CanvasToClipboardHandler(this._context)

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

}