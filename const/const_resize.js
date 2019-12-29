/**
 * リサイズの方向を定義 方向に応じて拡大・縮小の方法を変更
 * ・FORWARD: 右側から右へ、のように流れにあわせる
 * ・BETWEEN: 上から下へ、のように、図形の底辺より上にあるとき 徐々に図形を縮める
 * ・REVERSE: 上から下へ、のようなリサイズで、かつ図形の底辺より下にあるとき、図形を引き伸ばす
 */
export const Direction = {
    FORWARD: Symbol('forward'),
    BETWEEN: Symbol('between'),
    REVERSE: Symbol('reverse')
}