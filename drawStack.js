/**
 * キャンバス上に描画されたオブジェクトを管理するためのクラス
 * 以下の用途で利用
 * ・Undo
 * ・既存の描画済みオブジェクトを保持 リサイズ時にはキャンバスを一度クリアする必要があるため、状態として保持しておく
 */
export default class DrawStack {
    constructor() {
        this._drawStack = []
        this._selectedDrawing = 0
    }

    /**
     * 
     */
    append(shape) {
        this._drawStack.push(shape)
    }

    getCurrent() {
        return this._drawStack[this._drawStack.length-1]
    }

    get drawStack() {
        return this._drawStack
    }
}