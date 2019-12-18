import {DrawMode} from './mode.js'

/**
 * キャンバスを操作する際のメニュー管理するクラス
 * @property {string} activeMode 現在有効なモード[赤枠・文字列・吹き出しが存在] 
 * @property {object} rectMenuButton 赤枠モードに移行するためのボタン
 * @property {object} textMenuButton テキストモードに移行するためのボタン
 */
export default class MenuHandler {
    
    constructor() {
        this._activeMode = ''
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

            this._activeMode = DrawMode.RECTANGLE

        })

        this._textMenuButton.addEventListener('click', () => {
            this._activeMode = DrawMode.TEXT

        })

        this._wordBalloonMenuButton.addEventListener('click', () => {
            this._activeMode = DrawMode.WORD_BALLOON

        })

    }

    modifyFocusMessage(modifyedText) {
        this._messageForFocusDOM.textContent = modifyedText
    }

    /**
     * 現在のモードが「テキスト」かどうかを判定
     * @return true→Text false→!Text
     */
    isTextActive() {
        return this._activeMode === DrawMode.TEXT
    }
    /**
     * 現在のモードが「枠」かどうかを判定
     * @return true→Rectangle false→!Rectangle
     */
    isRectangleActive() {
        return this._activeMode === DrawMode.RECTANGLE
    }

    isWordBalloonActive() {
        return this._activeMode === DrawMode.WORD_BALLOON
    }

    get activeMode() {
        return this._activeMode
    }

}