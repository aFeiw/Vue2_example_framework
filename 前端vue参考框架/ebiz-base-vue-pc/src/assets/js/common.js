/**
 * @desc 扩展对象继承
 * @param  {Object} out 一个或多个对象
 * @return {Object} 对象
 */
Object.extend = function(out) {
  out = out || {}
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key]
    }
  }
  return out
}

export default {
  /**
   * @desc  判断对象是否为空
   * @param  {Object} o 对象
   * @return {Boolean}
   */
  isEmptyObject(o = {}) {
    let flag = true
    for (const k in o) {
      if (k) {
        flag = false
        break
      }
    }
    return flag
  },

  /**
   * @description 去除前后空格
   * @param  {String} 值
   * @return {String}
   */
  trim(val) {
    return val.replace(/(^\s*)|(\s*$)/g, '')
  },

  /**
   * @desc  获取 cookie
   * @param  {String}
   * @return {*}
   */
  getCookie(name1) {
    let rs = ''
    var name = name1 + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) != -1) {
        rs = this._string2json(c.substring(name.length, c.length))
      }
    }
    return rs
  },

  /**
   * @desc  设置 cookie
   * @param {String} name 名称
   * @param {*} value 值
   * @param {Number} hours 时长
   */
  setCookie(name, value, hours) {
    let str = name + '=' + this._json2string(value)
    if (hours && hours > 0) {
      var date = new Date()
      date.setTime(date.getTime() + hours * 3600 * 1000)
      str += '; expires=' + date.toUTCString()
    }
    document.cookie = str
  },

  /**
   * @desc  清除 cookie
   * @param  {String} 名称
   */
  delCookie(name) {
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    document.cookie = name + '=a; expires=' + date.toGMTString()
  },

  /**
   * @desc  获取 localStorage 中指定的变量
   * @param  {String} name 名称
   * @return {*} rs
   */
  getStorage(name) {
    return this._string2json(window.localStorage[name])
  },

  /**
   * @desc  设置或添加 localStorage 中指定的变量
   * @param {String} name 名称
   */
  setStorage(name, value) {
    window.localStorage[name] = this._json2string(value)
  },

  /**
   * @desc  删除 localStorage 中指定的变量
   * @param  {String} name 名称
   */
  delStorage(name) {
    window.localStorage.removeItem(name)
  },

  /**
   * @desc json转string
   * @param  {*} value 值
   * @return {*} value 值
   */
  _json2string(value) {
    return JSON.stringify(value)
  },
  /**
   * @desc  string转json
   * @param  {*} value 值
   * @return {*} value 值
   */
  _string2json(value) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      //
    }
    return value
  },
  /**
   *@desc 只能输入单词字符
   *@param { String } value
   */
  character(value) {
    if (value) {
      value = value.replace(/[^A-Za-z0-9]/g, '')
    }
    return value
  },
  // 保留小数位，替代Number.toFixed()方法，针对于某些数据（16.455）不能做到四舍五入
  toFixed(value, num = 0) {
    const pos = value.toString().indexOf('.')
    const decimalPlaces = value.toString().length - pos - 1
    const intValue = value * Math.pow(10, decimalPlaces)
    const divisor1 = Math.pow(10, decimalPlaces - num)
    const divisor2 = Math.pow(10, num)
    return Math.round(intValue / divisor1) / divisor2
  },

  /**
   * 如果是小数则保留小数位，默认两位
   * @param  {[type]} value [description]
   * @param  {Number} num   [description]
   * @return {[type]}       [description]
   */
  toFloatFixed(value, num = 2) {
    const values = Number(value)
    if (values) {
      if (/^\d+\.\d+/.test(values)) {
        return this.toFixed(values, num)
      } else {
        return this.toFixed(values)
      }
    }
    return value
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
