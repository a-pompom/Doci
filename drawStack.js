/**
 * キャンバス上に描画されたオブジェクトを管理するためのクラス
 * 以下の用途で利用
 * ・既存の描画済みオブジェクトを保持 リサイズ時にはキャンバスを一度クリアする必要があるため、状態として保持しておく
 * 
 * @property {Array} stack 描画対象の図形を格納したスタック
 * @property {number} currentIndex 現在描画中の要素のインデックス 基本は最後に描画された要素を表す
 */
export default class DrawStack {
    constructor() {

        this._stack = []
        this._currentIndex = -1
    }

    /**
     * 描画スタックへ要素を追加
     * @param {Shape} 描画要素
     */
    append(shape) {
        this._stack.push(shape)
        this._currentIndex = this._stack.length-1
    }

    /**
     * 描画スタックから要素を削除
     */
    pop() {
        this._stack.pop()
        this._currentIndex --
    }

    /**
     * 現在描画中の要素を取得
     */
    getCurrent() {

        if (this._currentIndex === -1) {
            return this._stack[this._stack.length-1]
        }

        return this._stack[this._currentIndex]
    }

    getByIndex(index) {
        return this._stack[index]
    }

    /**
     * 描画スタックから指定要素を削除
     * 
     * @param {number} index 削除対象のインデックス
     */
    delete(index) {
        this._stack = this._stack.filter((element, elementIndex) => {
            return elementIndex !== index
        })
    }

    /**
     * キャンバス上の要素は、更新の度に初期化されてしまうので、
     * 既存要素を保持したスタックをもとに再描画
     */
    draw() {

        this._stack.forEach((shape) => {

            shape.draw()
        })
    }

    get stack() {
        return this._stack
    }
}