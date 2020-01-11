/**
 * 描画スタックの大きさ
 * あまり増やしすぎてもスクロールが発生したり、描画領域が狭まったりとデメリットが目立つようになるので、
 * 数値の1~9までを割り当てるため、9個とする
 */
export const StackLength = 9

export const StackWidth = 80
export const StackHeightCoefficient = 20

export const StackScaleCoefficient = {base: 10, ratio: 8}

/**
 * スタックのショートカットのキーコード
 */
export const StackKeyCode = {
    Key_1: 49,
    Key_2: 50,
    Key_3: 51,
    Key_4: 52,
    Key_5: 53,
    Key_6: 54,
    Key_7: 55,
    Key_8: 56,
    Key_9: 57
}