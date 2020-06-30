
const addEventListener = EventTarget.prototype.addEventListener

EventTarget.prototype.addEventListener = function (type, callback, options) {
  const obj = null
  const _this = this
  let lastTime = 0
  let x = 0
  let y = 0
  this._eventMark = this._eventMark === undefined ? true : this._eventMark

  const end = function (e) {
    _this.removeEventListener('touchend', end)
    const touch = e.changedTouches[0]
    const cx = Math.abs(touch.clientX - x)
    const cy = Math.abs(touch.clientY - y)
    if (e.timeStamp - lastTime < 500 && cx < 10 && cy < 10) {
      lastTime = e.timeStamp
      const tag = new TouchEvent('tag', e)
      _this.dispatchEvent(tag)
			typeof _this.ontag==='function' && _this.ontag(e);
    }
  }

  if (type === 'tag' && this._eventMark) {
    this._eventMark = false
    addEventListener.call(this, 'touchstart', e => {
      lastTime = e.timeStamp
      const touch = e.changedTouches[0]
      x = touch.clientX
      y = touch.clientY
      addEventListener.call(this, 'touchend', end)
    })
  }

  addEventListener.call(this, type, callback, options)
}
