/**
 * キャンバス上に描画されたオブジェクトを管理するためのクラス
 * 以下の用途で利用
 * ・Undo
 * ・既存の描画済みオブジェクトを保持 リサイズ時にはキャンバスを一度クリアする必要があるため、状態として保持しておく
 */
export default class DrawStack {
    constructor() {

        this._stack = []
        this._selectedDrawing = 0
        this._currentIndex = 0
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
     * 現在描画中の要素を取得
     */
    getCurrent() {

        if (this._currentIndex === -1) {
            return null
        }

        return this._stack[this._currentIndex]
    }

    /**
     * スタックの現在参照中の要素を変更
     * 
     * @param {number} index スタックを更新するインデックス
     */
    modifyCurrent(index) {
        this._currentIndex = index
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
            // 現在参照中の要素は、更新で別途描画されるので、対象外とする
            if (shape === this.getCurrent()) {
                return
            }

            shape.draw()
        })
    }

    get stack() {
        return this._stack
    }
}