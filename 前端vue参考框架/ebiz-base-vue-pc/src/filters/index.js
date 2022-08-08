import Common from '../assets/js/common'

/*
 * 把其他filter放到index.js里面一起引入
 */
export default {
  m2km(value) {
    return Common.m2km(value)
  },

  /**
   * 除法
   * @param  {Number} dividend 被除数
   * @param  {Number} divisor  除数
   * @return {Number}          值
   */
  divide(dividend, divisor) {
    return Common.divide(dividend, divisor)
  },

  /**
   * 保留小数位，替代Number.toFixed()方法，针对于某些数据（16.455）不能做到四舍五入
   * @param  {[type]} value 数值
   * @param  {[type]} num   几位小数
   * @return {[type]}       值
   */
  toFixed(value, num) {
    return Common.toFixed(value, num)
  },

  /**
   * 如果是小数则保留小数位，默认两位
   * @param  {[type]} value 数值
   * @param  {Number} num   几位小数
   * @return {[type]}       值
   */
  toFloatFixed(value, num) {
    Common.toFloatFixed(value, num)
  },

  /**
   * 转化成工作时间
   * @param  {[type]} value 值
   * @return {[type]}       [description]
   */
  businessHour(value) {
    let time = ''
    if (value) {
      const arr = value.split(';')
      time =
        '星期' +
        Common.getWeek(arr[0]) +
        ' ~ 星期' +
        Common.getWeek(arr[1]) +
        '  ' +
        Common.getTime(arr[2]) +
        ':' +
        Common.getTime(arr[3]) +
        ' ~ ' +
        Common.getTime(arr[4]) +
        ':' +
        Common.getTime(arr[5])
    }
    return time
  },

  isEmptyObject(o) {
    return Common.isEmptyObject(o)
  },
  wan(value) {
    const isNumber = typeof value === 'number'
    return isNumber && value / 10000
  },
  // 除以100保留小数位
  divide100(value, num = 2, isFill) {
    let values = Number(value)
    const regular = /^\d+\.\d+/
    if (values) {
      values = values / 100
      if (regular.test(values)) {
        return Common.toFixed(values, num)
      } else {
        return Common.toFixed(values)
      }
    } else {
      if (isFill) {
        // 是否需要填充
        value = 0
      }
    }
    return value
  },
  discount(value, position = 0) {
    let ret = value.split('.')
    if (position == 0) {
      ret = ret[0]
    } else if (position == 1) {
      ret = ret[1]
    }
    return ret
  }
}
