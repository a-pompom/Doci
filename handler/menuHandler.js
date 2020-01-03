import { DrawConst } from '../const/drawingConst.js'
import DrawingUtil from '../drawingUtil.js'

/**
 * キャンバスを操作する際のメニュー管理するクラス
 * @property {DrawMode} activeMode 現在有効なモード[赤枠・文字列・吹き出しが存在] 
 * @property {DrawType} activeType 描画モード
 * @property {number} activeIndex 現在有効なメニュー 画面表示のアクティブ要素の切り替えで利用
 * @property {boolean} activeResizable 現在有効なメニュー要素でリサイズ機能が利用できるか
 * 
 * @property {Array<Object>} menuList 各メニュー要素
 *     element: メニューを表すDOM要素
 *     mode: メニューと紐づくモード
 *     type: メニューと紐づくタイプ
 *     index: メニューのインデックス
 *     resizable: リサイズ機能が使えるか
 *     keyCode: ショートカットキー機能で利用
 */
export default class MenuHandler {
    
    constructor() {
        this._activeMode = DrawConst.menu.DrawMode.NONE
        this._activeType = DrawConst.menu.DrawType.NONE
        this._activeIndex = 0
        this._activeResizable = false

        this._messageForFocusDOM = document.getElementById('focusText')

        this._menuList = [
            {
                element: document.getElementById('rectangleModeButton'),
                mode: DrawConst.menu.DrawMode.RECTANGLE,
                type: DrawConst.menu.DrawType.RECTANGLE,
                index: 0,
                resizable: true,
                keyCode: DrawConst.menu.KeyCode.Key_R
            },
            {
                element: document.getElementById('textModeButton'),
                mode: DrawConst.menu.DrawMode.TEXT,
                type: DrawConst.menu.DrawType.TEXT,
                index: 1,
                resizable: false,
                keyCode: DrawConst.menu.KeyCode.Key_T
            },
            {
                element: document.getElementById('wordBalloonModeButton'),
                mode: DrawConst.menu.DrawMode.WORD_BALLOON,
                type: DrawConst.menu.DrawType.RECTANGLE,
                index: 2,
                resizable: true,
                keyCode: DrawConst.menu.KeyCode.Key_W
            },
            {
                element: document.getElementById('imageModeButton'),
                mode: DrawConst.menu.DrawMode.IMAGE,
                type: DrawConst.menu.DrawType.IMAGE,
                index: 3,
                resizable: true,
                keyCode: DrawConst.menu.KeyCode.Key_I
            },
            {
                element: document.getElementById('moveModeButton'),
                mode: DrawConst.menu.DrawMode.MOVE,
                type: DrawConst.menu.DrawType.NONE,
                index: 4,
                resizable: false,
                keyCode: DrawConst.menu.KeyCode.Key_M
            },
            {
                element: document.getElementById('deleteModeButton'),
                mode: DrawConst.menu.DrawMode.DELETE,
                type: DrawConst.menu.DrawType.NONE,
                index: 5,
                resizable: false,
                keyCode: DrawConst.menu.KeyCode.Key_D
            },
        ]

        this.initMenu()
        this.initShortCutInfo()
    }

    /**
     * メニューに対してクリック/ショートカットキーイベントを登録
     */
    initMenu() {

        this._menuList.forEach((menu) => {
            menu.element.addEventListener('click', () => {

                this.registerHandleEvent(menu)
            })

            document.addEventListener('keydown', (event) => {

                if (DrawingUtil.isTextInputMode() || event.keyCode !== menu.keyCode) {
                    return
                }

                this.registerHandleEvent(menu)
            })
        })

    }

    /**
     * ショートカット表示用メニューを初期化
     * アイコンにマウスを近づけることで各メニューのショートカットを表示
     */
    initShortCutInfo() {

        const shortCutMenu = document.getElementById('shortCutMenu')
        const shortCutTips = document.getElementById('shortCutTips')

        shortCutTips.addEventListener('mouseover', () => {
            shortCutMenu.classList.remove('invisible')
        })
        shortCutTips.addEventListener('mouseout', () => {
            shortCutMenu.classList.add('invisible')
        })
    }

    /**
     * 有効なメニューを切り替える
     * 
     * @param {Object} menu メニュー要素
     */
    registerHandleEvent(menu) {

        DrawingUtil.deactivateClass(this._menuList[this._activeIndex].element.id, 'active-menu')

        this._activeMode = menu.mode
        this._activeType = menu.type
        this._activeResizable = menu.resizable

        this._activeIndex = menu.index

        DrawingUtil.activateClass(menu.element.id, 'active-menu')
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