import {DrawConst} from '../const/drawingConst.js'
import DrawingUtil from '../drawingUtil.js'
import DrawStack from '../drawStack.js'

import MetaDrawing from '../drawing/metaDrawing.js'
import MoveDrawing from '../drawing/moveDrawing.js'
import DeleteDrawing from '../drawing/deleteDrawing.js'
import TextDrawing from '../drawing/textDrawing.js'
import RectangleDrawing from '../drawing/rectangleDrawing.js'
import ImageDrawing from '../drawing/imageDrawing.js'
import CursorDrawing from '../drawing/cursorDrawing.js'
import CellDrawing from '../drawing/cellDrawing.js'

import CanvasToClipboardHandler from './canvasToClipboardHandler.js'
import StackHandler from './stackHandler.js'
import MenuHandler from './menuHandler.js'
import FocusHandler from './focusHandler.js'
/**
 * 描画機能を扱うハンドラ
 * 
 * @property {Object} context 描画コンテキスト
 *     ・canvas: キャンバス
 *     ・canvasContext: キャンバスのコンテキスト
 *     ・isMousedown: マウスが押下されているか
 *     ・currentStack: 現在描画中のスタックのインデックス
 * 
 *     ・drawStackList: 描画スタック
 *     ・drawStack: 現在描画中の描画スタック
 *     ・menu: メニューを管理
 *     ・focus: フォーカス機能を管理
 */
export default class DrawingHandler{

    constructor() {

        this._context = this.getContext()

        this.init()
    }

    /**
     * コンテキストを取得
     */
    getContext() {

        const canvas = document.getElementById('myCanvas')
        const canvasContext = canvas.getContext('2d')
        const drawStackList = this.getDrawStackList(DrawConst.stack.StackLength)
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

    /**
     * 初期処理
     * ハンドラ・描画オブジェクトの初期化を行う
     */
    init() {

        this.inistHandler()

        this.setCanvasScale()

        // アプリで実行され得るイベントの種類
        const occurEvents = ['mousedown', 'mousemove', 'mouseup', 'click']
        // アプリで描画されるオブジェクト
        const drawingList = [
            new MetaDrawing(this._context), new CellDrawing(this._context),
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

    /**
     * 描画機能で利用するハンドラを初期化
     */
    inistHandler() {

        const handlerList = [CanvasToClipboardHandler, StackHandler]

        handlerList.forEach((handler) => {

            new handler(this._context)

        })
    }

    /**
     * 描画スタックのリストを生成
     * 
     * @param {Number} stackLength スタックの大きさ
     */
    getDrawStackList(stackLength) {
        let drawStackList = []

        for (let i=0; i<stackLength; i++) {
            drawStackList.push(new DrawStack())
        }

        return drawStackList
    }

    /**
     * キャンバスの大きさを以下の点で設定
     * 
     * ・メニュー領域を差し引いた幅にすること
     * ・線がぼやけないよう解像度を調整
     */
    setCanvasScale() {
        const ratio = DrawingUtil.getPixelRatio()

        // ぼやけないよう解像度に合わせて大きさを設定
        this._context.canvas.width = (document.body.clientWidth - DrawConst.menu.MENU_WIDTH) *ratio
        this._context.canvas.height = document.body.clientHeight *ratio

        // メニュー領域を差し引いて実サイズを設定
        this._context.canvas.style.width = `${(document.body.clientWidth -DrawConst.menu.MENU_WIDTH)}px`
        this._context.canvas.style.height = `${(document.body.clientHeight)}px`

        this._context.canvasContext.setTransform(ratio,0,0,ratio,0,0)
    }
}