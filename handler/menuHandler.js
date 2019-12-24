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

        this._messageForFocusDOM = document.getElementById('focusText')

        this._menuList = [
            {
                element: document.getElementById('rectangleModeButton'),
                mode: DrawConst.menu.DrawMode.RECTANGLE,
                type: DrawConst.menu.DrawType.RECTANGLE
            },
            {
                element: document.getElementById('textModeButton'),
                mode: DrawConst.menu.DrawMode.TEXT,
                type: DrawConst.menu.DrawType.TEXT
            },
            {
                element: document.getElementById('wordBalloonModeButton'),
                mode: DrawConst.menu.DrawMode.WORD_BALLOON,
                type: DrawConst.menu.DrawType.RECTANGLE
            },

            {
                element: document.getElementById('moveModeButton'),
                mode: DrawConst.menu.DrawMode.MOVE,
                type: DrawConst.menu.DrawType.NONE
            },
            {
                element: document.getElementById('deleteModeButton'),
                mode: DrawConst.menu.DrawMode.DELETE,
                type: DrawConst.menu.DrawType.NONE
            },
        ]

        this.initMenu()
    }

    /**
     * メニューに対してクリックイベントを登録
     */
    initMenu() {

        this._menuList.forEach((menu) => {
            menu.element.addEventListener('click', () => {

                this._activeMode = menu.mode
                this._activeType = menu.type
            })
        })

    }

    modifyFocusMessage(modifyedText) {
        this._messageForFocusDOM.textContent = modifyedText
    }

    get activeMode() {
        return this._activeMode
    }

    get activeType() {
        return this._activeType
    }

}