/**
 * 描画モード
 * ・RECTANGLE 赤枠の四角
 * ・TEXT 文字列
 */
export const DrawMode = {
    RECTANGLE: Symbol('rect'),
    TEXT: Symbol('text')
}

/**
 * フォーカス位置 リサイズ等の動作で利用
 * ・TOP: 上
 * ・RIGHT: 右
 * ・BOTTOM: 下
 * ・LEFT: 左
 * ・NONE: 対象なし
 */
export const FocusAngle = {
    TOP: Symbol('top'),
    RIGHT: Symbol('right'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    NONE: Symbol('none-focused')

}