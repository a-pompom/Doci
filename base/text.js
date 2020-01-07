import { DrawConst } from '../const/drawingConst.js'
import ShapeFunction from './shapeFunction.js'

/**
 * キャンバス上に描画される図形の内、テキストを表す
 * 
 * @property {Object} context 描画用コンテキスト
 * 
 * @property {DOM} originTextDOM 描画する文字列を一時的に格納するためのテキストエリアのDOM要素
 * @property {string} originText 描画対象文字列 編集・図形の幅に合わせて加工する際に利用
 * 
 * 属性
 * @property {number} x 描画開始x座標
 * @property {number} y 描画開始y座標
 * @property {number} width 幅
 * @property {number} height 高さ
 * 
 * メタ属性 
 * @property {boolean} hasArea 領域を持つか 領域を持たないものは、内側を図形とみなさないよう区別するために利用
 * @property {boolean} canIncludeText 図形の内部にテキストを保持できるか 吹き出しなどの図形が相当
 * @property {boolean} resizable リサイズが可能か 基本図形はすべて可能
 * @property {ShapeType} shapeType 図形の種類 テキストと基本図形を識別するために利用
 */
export default class Text {

    constructor(context, startX, startY) {

        this._context = context
        this._shapeFunction = new ShapeFunction(this._context)

        this._originTextDOM = document.getElementById('inputText')
        this._originText = ''

        this._x = startX
        this._y = startY
        this._width = 0 
        this._height = 0

        this._hasArea = false
        this._canIncludeText = false
        this._resizable = false
        this._shapeType = DrawConst.shape.ShapeType.TEXT
    }

    fullDraw() {
        this._shapeFunction.fullDraw()
    }

    /**
     * 自身を描画する際の前処理を行う
     */
    drawBase() {
        this._shapeFunction.drawBase()
    }

    /**
     * 属性値を設定 実装は各サブクラスに委譲
     */
    defineAttribute() {
    }

    //  ------------------------------------------------getter setter ----------------------------------------------------


    get x() {
        return this._x
    }
    set x(x) {
        this._x = x
    }
    get y() {
        return this._y
    }
    set y(y) {
        this._y = y
    }
    get width() { return this._width
    }
    set width(width) {
        this._width = width
    }
    get height() {
        return this._height
    }
    set height(height) {
        this._height = height
    }

    get hasArea() {
        return this._hasArea
    }

    get canIncludeText() {
        return this._canIncludeText
    }

    get resizable() {
        return this._resizable
    }

    get shapeType() {
        return this._shapeType
    }
}