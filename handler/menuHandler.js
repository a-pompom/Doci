import { DrawConst } from '../const/drawingConst.js'

/**
 * キャンバスを操作する際のメニュー管理するクラス
 * @property {string} activeMode 現在有効なモード[赤枠・文字列・吹き出しが存在] 
 * @property {Array<Object>} menuList 各メニュー要素
 *     element: メニューを表すDOM要素
 *     mode: メニューと紐づくモード
 *     type: メニューと紐づくタイプ
 */
export default class MenuHandler {
    
    constructor() {
        this._activeMode = DrawConst.menu.DrawMode.NONE
        this._activeType = DrawConst.menu.DrawType.NONE
        this._activeResizable = false

        this._messageForFocusDOM = document.getElementById('focusText')

        this._menuList = [
            {
                element: document.getElementById('rectangleModeButton'),
                mode: DrawConst.menu.DrawMode.RECTANGLE,
                type: DrawConst.menu.DrawType.RECTANGLE,
                resizable: true
            },
            {
                element: document.getElementById('textModeButton'),
                mode: DrawConst.menu.DrawMode.TEXT,
                type: DrawConst.menu.DrawType.TEXT,
                resizable: false
            },
            {
                element: document.getElementById('wordBalloonModeButton'),
                mode: DrawConst.menu.DrawMode.WORD_BALLOON,
                type: DrawConst.menu.DrawType.RECTANGLE,
                resizable: true
            },
            {
                element: document.getElementById('imageModeButton'),
                mode: DrawConst.menu.DrawMode.IMAGE,
                type: DrawConst.menu.DrawType.IMAGE,
                resizable: true
            },
            {
                element: document.getElementById('moveModeButton'),
                mode: DrawConst.menu.DrawMode.MOVE,
                type: DrawConst.menu.DrawType.NONE,
                resizable: false
            },
            {
                element: document.getElementById('deleteModeButton'),
                mode: DrawConst.menu.DrawMode.DELETE,
                type: DrawConst.menu.DrawType.NONE,
                resizable: false
            },
        ]

        this.initMenu()
        this.initShortCutMenu()
    }

    /**
     * メニューに対してクリックイベントを登録
     */
    initMenu() {

        this._menuList.forEach((menu) => {
            menu.element.addEventListener('click', () => {

                this._activeMode = menu.mode
                this._activeType = menu.type
                this._activeResizable = menu.resizable
            })
        })

    }

    /**
     * ショートカット表示用メニューを初期化
     * アイコンにマウスを近づけることで各メニューのショートカットを表示
     */
    initShortCutMenu() {

        const shortCutMenu = document.getElementById('shortCutMenu')
        const shortCutTips = document.getElementById('shortCutTips')

        shortCutTips.addEventListener('mouseover', () => {
            shortCutMenu.classList.remove('invisible')
        })
        shortCutTips.addEventListener('mouseout', () => {
            shortCutMenu.classList.add('invisible')
        })
    }

    get activeMode() {
        return this._activeMode
    }

    get activeType() {
        return this._activeType
    }

    get activeResizable() {
        return this._activeResizable
    }

}