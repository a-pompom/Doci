import { DrawConst } from './drawingConst.js'

/**
 * キャンバスを操作する際のメニュー管理するクラス
 * @property {string} activeMode 現在有効なモード[赤枠・文字列・吹き出しが存在] 
 * @property {object} rectMenuButton 赤枠モードに移行するためのボタン
 * @property {object} textMenuButton テキストモードに移行するためのボタン
 */
export default class MenuHandler {
    
    constructor() {
        this._activeMode = DrawConst.menu.DrawMode.NONE
        this._activeType = DrawConst.menu.DrawType.NONE

        this._messageForFocusDOM = document.getElementById('focusText')

        this._rectMenuButton = document.getElementById('rectangleModeButton')
        this._textMenuButton = document.getElementById('textModeButton')
        this._wordBalloonMenuButton = document.getElementById('wordBalloonModeButton')

        this.initMenu()

    }

    /**
     * メニューに対してクリックイベントを登録
     */
    initMenu() {

        this._rectMenuButton.addEventListener('click', () => {

            this._activeMode = DrawConst.menu.DrawMode.RECTANGLE
            this._activeType = DrawConst.menu.DrawType.RECTANGLE
        })

        this._textMenuButton.addEventListener('click', () => {
            this._activeMode = DrawConst.menu.DrawMode.TEXT
            this._activeType = DrawConst.menu.DrawMode.TEXT
        })

        this._wordBalloonMenuButton.addEventListener('click', () => {
            this._activeMode = DrawConst.menu.DrawMode.WORD_BALLOON
            this._activeType = DrawConst.menu.DrawType.RECTANGLE
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