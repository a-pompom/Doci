import MenuHandler from './menuHandler.js'

import FocusHandler from './focusHandler.js'
import DrawStack from '../drawStack.js'

import MetaDrawing from '../drawing/metaDrawing.js'
import MoveDrawing from '../drawing/moveDrawing.js'
import DeleteDrawing from '../drawing/deleteDrawing.js'
import TextDrawing from '../drawing/textDrawing.js'
import RectangleDrawing from '../drawing/rectangleDrawing.js'
import ImageDrawing from '../drawing/imageDrawing.js'

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

        // アプリで実行され得るイベントの種類
        const occurEvents = ['mousedown', 'mousemove', 'mouseup', 'click']
        // アプリで描画されるオブジェクト
        const drawingList = [
            new RectangleDrawing(this._context), new TextDrawing(this._context), new ImageDrawing(this._context),
            new MetaDrawing(this._context),
            new MoveDrawing(this._context), new DeleteDrawing(this._context)
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
                    drawingList[targetIndex][`${event}Event`].call(drawingList[targetIndex],eventArg)
                })

            })

        })

    }

}