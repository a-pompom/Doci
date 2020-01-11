import {DrawConst} from '../const/drawingConst.js'
import ShapeFunction from './shapeFunction.js'

/**
 * キャンバス上に描画される図形を表す
 * @property {Object} context 描画用コンテキスト
 * 
 * 属性
 * @property {number} x 描画開始x座標
 * @property {number} y 描画開始y座標
 * @property {number} width 幅
 * @property {number} height 高さ
 * 
 * @property {number} originX 描画開始時点でのx座標 キャンバスで描画方向を反転させた場合にも滑らかに描画するために利用
 * @property {number} originY 描画開始時点でのy座標
 * @property {number} originWidth リサイズ前の幅 リサイズ時の動きを滑らかにするために利用
 * @property {number} originHeight リサイズ前の高さ
 * 
 * メタ属性 
 * @property {boolean} hasArea 領域を持つか 領域を持たないものは、内側を図形とみなさないよう区別するために利用
 * @property {boolean} canIncludeText 図形の内部にテキストを保持できるか 吹き出しなどの図形が相当
 * @property {boolean} resizable リサイズが可能か 基本図形はすべて可能
 * @property {ShapeType} shapeType 図形の種類 テキストと基本図形を識別するために利用
 */
export default class Shape {

    constructor(context, startX, startY) {
        this._context = context

        this._shapeFunction = new ShapeFunction(this._context)

        this._x = startX
        this._y = startY

        this._width = 0 
        this._height = 0

        this._originX = startX
        this._originY = startY
        this._originWidth = 0
        this._originHeight = 0

        this._hasArea = false
        this._canIncludeText = false

        this._resizable = true
        this._shapeType = DrawConst.shape.ShapeType.SHAPE
    }

    /**
     * キャンバス全体を再描画 各描画管理クラスから呼ばれるインタフェース部分としての役割を持つ
     */
    fullDraw() {
        this._shapeFunction.fullDraw()

    }

    /**
     * キャンバス全体の再描画の実装部分
     */
    drawBase() {
        this._shapeFunction.drawBase()
    }

    /**
     * リサイズ時に参照する元の図形の描画スケールを設定
     */
    setOriginPos() {
        this._originX = this._x
        this._originY = this._y
    }

    setOriginScale() {
        this._originWidth = this._width
        this._originHeight = this._height
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
    get originX() {
        return this._originX
    }
    get originY() {
        return this._originY
    }
    set originX(originX) {
        this._originX = originX
    }
    set originY(originY) {
        this._originY = originY
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
    get originWidth() {
        return this._originWidth
    }
    get originHeight() {
        return this._originHeight
    }
    
    get color() {
        return this._color
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