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

        this._rectMenuButton = document.getElementById('rectangleModeButton')
        this._textMenuButton = document.getElementById('textModeButton')

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

    }

    get activeMode() {
        return this._activeMode
    }

}