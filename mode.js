/**
 * 描画モード
 * ・RECTANGLE 赤枠の四角
 * ・TEXT 文字列
 */
export const DrawMode = {
    RECTANGLE: Symbol('rect'),
    TEXT: Symbol('text')
}

export const FocusAngle = {
    TOP: Symbol('top'),
    RIGHT: Symbol('right'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left')

}