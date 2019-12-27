import { DrawConst } from '../const/drawingConst.js'

/**
 * リサイズ機能を扱うためのハンドラ
 * @property {Shape} shape リサイズ対象の図形
 */
export default class ResizeHandler {

    constructor() {
        this._shape = null
    }

    resize(x, y, focusedAngle) {

        // キャンバスではx,yは左上が指定されるので、上向き/左向きにリサイズする場合、
        // 描画開始位置をカーソルに合わせる
        const posX = x >= this._shape.originX ? this._shape.originX : x
        const posY = y >= this._shape.originY ? this._shape.originY : y

        this.updatePos(posX, posY, focusedAngle)

        // 元の位置と現在の位置の差分から、リサイズの変動分を導出し、描画位置・スケールに反映
        const scaleX = Math.abs(this._shape.originX - x)
        const scaleY = Math.abs(this._shape.originY - y)

        this.modifyScale(scaleX, scaleY, focusedAngle)
    }

    /**
     * リサイズによって更新された図形の描画開始座標を反映
     * 
     * @param {number} posX x座標の起点
     * @param {number} posY y座標の起点
     * @param {FocusAngle} focusAngle 図形の上下左右いずれにフォーカスしているか
     */
    updatePos(posX, posY, focusAngle) {
        // 上下左右のうち、一方向のみでのリサイズの場合、他の軸の座標を固定するために利用
        // ex) 上方向にリサイズする場合、X方向に動かしても図形のx軸方向での大きさは不変
        const yFocused = this.isYFocused(focusAngle)
        const xFocused = this.isXFocused(focusAngle)

        this._shape.x = yFocused ? this._shape.originX : posX
        this._shape.y = xFocused ? this._shape.originY : posY
    }

    /**
     * X方向にのみフォーカスしているか判定 
     * 
     * @param {FocusAngle} focusAngle 図形の上下左右いずれにフォーカスしているか 
     * @return {boolean} true→X方向にのみフォーカス
     */
    isXFocused(focusAngle) {
        // 左上・右下のように、複数方向にフォーカスしている場合は、座標の固定は不要
        if (focusAngle.length > 1) {
            return false
        }

        if (focusAngle[0] === DrawConst.focus.FocusAngle.LEFT || focusAngle[0] === DrawConst.focus.FocusAngle.RIGHT) {
            return true
        }

        return false
    }

    /**
     * Y方向にのみフォーカスしているか判定 
     * 
     * @param {FocusAngle} focusAngle 図形の上下左右いずれにフォーカスしているか 
     * @return {boolean} true→Y方向にのみフォーカス
     */
    isYFocused(focusAngle) {
        // 左上・右下のように、複数方向にフォーカスしている場合は、座標の固定は不要
        if (focusAngle.length > 1) {
            return false
        }

        if (focusAngle[0] === DrawConst.focus.FocusAngle.TOP || focusAngle[0] === DrawConst.focus.FocusAngle.BOTTOM) {
            return true
        }

        return false
    }

    /**
     * リサイズによる幅・高さの変動を反映
     * 
     * @param {number} scaledX 伸縮後の幅の変動分
     * @param {number} scaledY 伸縮後の高さの変動分
     * @param {FocusAngle} focusAngle 図形の上下左右いずれにフォーカスしているか
     */
    modifyScale(scaledX, scaledY, focusAngle) {
        // フォーカス対象は、上下・左右等複数方向存在し得るので、ループで処理
        focusAngle.forEach( (angle) => {

            // フォーカスなし 全方向にリサイズ可能
            if (angle === DrawConst.focus.FocusAngle.NONE) {
                this._shape.width = scaledX
                this._shape.height = scaledY 

            }
            // 下 下方向に伸縮可能
            if (angle === DrawConst.focus.FocusAngle.BOTTOM) {
                this._shape.height = scaledY
            }

            // 上 伸縮の位置によって、高さ・描画開始y座標を変動
            if (angle === DrawConst.focus.FocusAngle.TOP) {

                switch(this.getScaleDirection(scaledY, 'y')) {

                    // 上 高さを増分だけ伸ばす
                    case DrawConst.resize.Direction.FORWARD:
                        this._shape.height = scaledY + this._shape.originHeight
                        break
                    
                    // 元の図形内 描画開始位置・高さを縮める
                    case DrawConst.resize.Direction.BETWEEN:
                        this._shape.y = this._shape.originY + scaledY
                        this._shape.height = this._shape.originHeight - scaledY
                        break

                    // 元の図形より下 元の図形の底辺を基準に増分だけ下方向に伸ばす
                    case DrawConst.resize.Direction.REVERSE:
                        this._shape.y = this._shape.originY + this._shape.originHeight
                        this._shape.height = scaledY - this._shape.originHeight
                        break

                }
            }

            // 右 右方向に伸縮可能
            if (angle === DrawConst.focus.FocusAngle.RIGHT) {
                this._shape.width = scaledX
            }

            // 左 伸縮の位置によって、幅・描画開始x座標を変動
            if (angle === DrawConst.focus.FocusAngle.LEFT) {

                switch(this.getScaleDirection(scaledX, 'x')) {

                    // 左 幅を増分だけ伸ばす
                    case DrawConst.resize.Direction.FORWARD:
                        this._shape.width = scaledX + this._shape.originWidth
                        break
                    
                    // 元の図形内 幅・描画開始位置を縮小
                    case DrawConst.resize.Direction.BETWEEN:
                        this._shape.x = this._shape.originX + scaledX
                        this._shape.width = this._shape.originWidth - scaledX
                        break

                    // 元の図形より右 元の図形の右辺を基準に増分だけ右方向に伸ばす
                    case DrawConst.resize.Direction.REVERSE:
                        this._shape.x = this._shape.originX + this._shape.originWidth
                        this._shape.width = scaledX - this._shape.originWidth
                        break

                }

            }
        })
    }

    /**
     * リサイズの方向に応じて処理を分岐させるため、方向を取得
     * 
     * @param {number} scale 伸縮の大きさ 元の図形に対する比率で、どの方向での伸縮かを判定
     * @param {string} xyDirection X方向・Y方向
     * 
     * @return {Direction} 伸縮方向
     */
    getScaleDirection(scale, xyDirection) {
        const pos = this._shape[`${xyDirection}`]
        const originPos = this._shape[`origin${xyDirection.toUpperCase()}`]
        const originScale = xyDirection === 'x' ? this._shape.originWidth : this._shape.originHeight

        // フォーカス方向に準ずる
        if (pos !== originPos) {
            return DrawConst.resize.Direction.FORWARD
        }
        // フォーカスとは逆向き 元の図形の範囲内
        if (scale <= originScale) {
            return DrawConst.resize.Direction.BETWEEN
        }

        // フォーカスとは逆向き 元の図形の範囲外
        return DrawConst.resize.Direction.REVERSE
    }

    set shape(shape) {
        this._shape = shape
    }
}