
let EventTarget = EventTarget ? EventTarget : Node;
const addEventListener = EventTarget.prototype.addEventListener

EventTarget.prototype.addEventListener = function (type, callback, options) {
  const obj = null
  const _this = this
  let lastTime = 0
  let x = 0
  let y = 0

  const end = function (e) {
    _this.removeEventListener('touchend', end)
    const touch = e.changedTouches[0]
    const cx = Math.abs(touch.clientX - x)
    const cy = Math.abs(touch.clientY - y)
    if (e.timeStamp - lastTime < 500 && cx < 10 && cy < 10) {
      lastTime = e.timeStamp
      const tap = new TouchEvent('tap', e)
      _this.dispatchEvent(tap)
			typeof _this.ontap==='function' && _this.ontap(e);
    }
  }

  if (type === 'tap'&& !this._tap) {
    Object.defineProperty(this,'_tap',{
    	value:true,
    	writable:false, //不可修改
    	enumerable:false,  //不可枚举
    	configurable:false,  //不可配置或删除该属性
    })
    addEventListener.call(this, 'touchstart', e => {
			e.stopPropagation();
      lastTime = e.timeStamp
      const touch = e.changedTouches[0]
      x = touch.clientX
      y = touch.clientY
      addEventListener.call(this, 'touchend', end,options)
    },options)
  }

  addEventListener.call(this, type, callback, options)
}
