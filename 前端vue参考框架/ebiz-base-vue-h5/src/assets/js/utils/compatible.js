import FastClick from 'fastclick'

//解决ios移动端input调软键盘问题
let isIphone = navigator.userAgent.indexOf('iPhone') != -1
if (isIphone) {
  FastClick.prototype.focus = function(targetElement) {
    let length
    if (
      isIphone &&
      targetElement.setSelectionRange &&
      targetElement.type.indexOf('date') !== 0 &&
      targetElement.type !== 'time' &&
      targetElement.type !== 'month' &&
      targetElement.type !== 'email'
    ) {
      length = targetElement.value.length
      targetElement.setSelectionRange(length, length)
      /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
      targetElement.focus()
    } else {
      targetElement.focus()
    }
  }
}
