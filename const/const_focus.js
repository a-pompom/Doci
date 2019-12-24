export const FocusMode = {
    NONE: Symbol('focus-none'),
    BORDER: Symbol('border'),
    INSIDE: Symbol('inside')
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