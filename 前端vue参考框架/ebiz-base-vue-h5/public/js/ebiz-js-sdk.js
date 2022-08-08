/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*!
 * ebiz js sdk v1.0.0
 *
 * Includes webBridge
 *
 * Date: 2020-03-09
 */

//webBridge
window.appCallBack = function() {}
;(function(window) {
  if (window.EWebBridge) {
    return
  }
  // 初始化App桥接环境
  function setupWebViewJavascriptBridge(callback) {
    // Android 调用
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function() {
          callback(WebViewJavascriptBridge)
        },
        false
      )
    }

    // iOS使用
    if (navigator.userAgent.indexOf('iPhone') != -1) {
      // WebViewJavascriptBridge v6
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
      }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'https://__bridge_loaded__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
  }

  // App桥接调用初始化
  setupWebViewJavascriptBridge(function(bridge) {
    //桥接默认
    bridge.registerHandler('appCallWebInJs', function(data, responseCallback) {
      try {
        data = JSON.parse(data)
        //业务逻辑放在这里;
        window.appCallBack(data, true)
        responseCallback('{"code": "0","message": "success"}')
      } catch (e) {
        window.appCallBack({}, false)
        responseCallback('{"code": "1","message": "App调用JS异常:"' + e + '"}')
      }
    })
  })

  // H5 & webapp 调用APP，并返回一个Promise对象
  function triggerCallHandler(method, params) {
    return new Promise(function(resolve) {
      WebViewJavascriptBridge.callHandler(method, params, function(response) {
        resolve(response)
      })
    })
  }

  // 初始化SDK
  var EWebBridge = (window.EWebBridge = {
    webCallAppInJs: function(method, params) {
      // params --> Mixed (json对象 {"a":"123","b":"200"} 或 null 或其他形式的参数，具体根据和app端的约定来)
      method = method || 'getUserToken'
      params = params || null
      return triggerCallHandler(method, params)
    }
  })
})(window)
;(function() {
  //If iPhone Call it, then return
  if (window.WebViewJavascriptBridge || navigator.userAgent.indexOf('iPhone') != -1) {
    return
  }

  var messagingIframe
  var sendMessageQueue = []
  var receiveMessageQueue = []
  var messageHandlers = {}

  var CUSTOM_PROTOCOL_SCHEME = 'yy'
  var QUEUE_HAS_MESSAGE = '__QUEUE_MESSAGE__/'

  var responseCallbacks = {}
  var uniqueId = 1

  function _createQueueReadyIframe(doc) {
    messagingIframe = doc.createElement('iframe')
    messagingIframe.style.display = 'none'
    doc.documentElement.appendChild(messagingIframe)
  }

  //set default messageHandler
  function init(messageHandler) {
    if (WebViewJavascriptBridge._messageHandler) {
      throw new Error('WebViewJavascriptBridge.init called twice')
    }
    WebViewJavascriptBridge._messageHandler = messageHandler
    var receivedMessages = receiveMessageQueue
    receiveMessageQueue = null
    for (var i = 0; i < receivedMessages.length; i++) {
      _dispatchMessageFromNative(receivedMessages[i])
    }
  }

  function send(data, responseCallback) {
    _doSend(
      {
        data: data
      },
      responseCallback
    )
  }

  function registerHandler(handlerName, handler) {
    messageHandlers[handlerName] = handler
  }

  function callHandler(handlerName, data, responseCallback) {
    _doSend(
      {
        handlerName: handlerName,
        data: data
      },
      responseCallback
    )
  }

  //sendMessage add message, 触发native处理 sendMessage
  function _doSend(message, responseCallback) {
    if (responseCallback) {
      var callbackId = 'cb_' + uniqueId++ + '_' + new Date().getTime()
      responseCallbacks[callbackId] = responseCallback
      message.callbackId = callbackId
    }

    sendMessageQueue.push(message)
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
  }

  // 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url shouldOverrideUrlLoading 的方式返回内容
  function _fetchQueue() {
    var messageQueueString = JSON.stringify(sendMessageQueue)
    sendMessageQueue = []
    //android can't read directly the return data, so we can reload iframe src to communicate with java
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://return/_fetchQueue/' + encodeURIComponent(messageQueueString)
  }

  //提供给native使用,
  function _dispatchMessageFromNative(messageJSON) {
    setTimeout(function() {
      var message = JSON.parse(messageJSON)
      var responseCallback
      //java call finished, now need to call js callback function
      if (message.responseId) {
        responseCallback = responseCallbacks[message.responseId]
        if (!responseCallback) {
          return
        }
        responseCallback(message.responseData)
        delete responseCallbacks[message.responseId]
      } else {
        //直接发送
        if (message.callbackId) {
          var callbackResponseId = message.callbackId
          responseCallback = function(responseData) {
            _doSend({
              responseId: callbackResponseId,
              responseData: responseData
            })
          }
        }

        var handler = WebViewJavascriptBridge._messageHandler
        if (message.handlerName) {
          handler = messageHandlers[message.handlerName]
        }
        //查找指定handler
        try {
          handler(message.data, responseCallback)
        } catch (exception) {
          if (typeof console != 'undefined') {
            console.log('WebViewJavascriptBridge: WARNING: javascript handler threw.', message, exception)
          }
        }
      }
    })
  }

  //提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null,所以
  function _handleMessageFromNative(messageJSON) {
    console.log(messageJSON)
    if (receiveMessageQueue && receiveMessageQueue.length > 0) {
      receiveMessageQueue.push(messageJSON)
    } else {
      _dispatchMessageFromNative(messageJSON)
    }
  }

  var WebViewJavascriptBridge = (window.WebViewJavascriptBridge = {
    init: init,
    send: send,
    registerHandler: registerHandler,
    callHandler: callHandler,
    _fetchQueue: _fetchQueue,
    _handleMessageFromNative: _handleMessageFromNative
  })

  var doc = document
  _createQueueReadyIframe(doc)
  var readyEvent = doc.createEvent('Events')
  readyEvent.initEvent('WebViewJavascriptBridgeReady')
  readyEvent.bridge = WebViewJavascriptBridge
  doc.dispatchEvent(readyEvent)
})()

//ebiz js sdk
;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && (define.amd || define.cmd)
    ? define(factory)
    : (global.ebiz = factory())
})(this, function() {
  //是否在app环境
  function isAPP() {
    return !!navigator.userAgent.match(/dingchenglife/i)
  }
  /**
   * 跨应用路由跳转
   * @param {String} href url地址
   * @param {Object} stateObj 状态参数 可以通过history.state读取
   * @param {String} title 标题 暂时没有用
   */
  function routerGo(href = '/', title = null, stateObj = {}) {
    window.history.pushState(stateObj, title, href)
  }
  //fecth http请求，兼容旧浏览器
  function request(url, options, type) {
    let opt = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: localStorage.token
      },
      body: JSON.stringify(options.data),
      mode: 'cors', // 支持跨域请求
      credentials: 'include' // fetch请求携带cookie信息
    }
    let newOpt = Object.assign(opt, options)
    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }

    function parseJSON(response) {
      return response.json()
    }

    return fetch(url, newOpt)
      .then(checkStatus)
      .then(parseJSON)
      .then(res => {
        if (res.code != 0) {
          if (res.code == 40001) {
            alert('你已被登出，可以取消继续留在该页面，或者重新登录')
          } else {
            // console.log(res)
          }
          return Promise.reject(res)
        } else {
          return res.content
        }
      })
      .catch(err => err)
  }

  /**
   * JSAPI
   */
  var version = '1.0.0',
    ebiz = function(opt) {
      return new ebiz.fn.init()
    }

  ebiz.fn = ebiz.prototype = {
    init: function() {
      return this
    },
    version,
    /**
     * 业务型JSAPI
     */
    biz: {
      //获取用户信息
      getUserInfo: function(opt) {
        if (false) {
          opt.success && opt.success({ name: '我是代理人1' })
        } else {
          opt.fail && opt.fail({ errMsg: '获取用户信息失败' })
        }
      },
      //分享
      share: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('bridge', {
            flag: 'share',
            extra: opt
          })
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //示例化右上角按钮
      rightBtn: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('webview_right_button', opt)
          window.appCallBack = opt.success
          opt.success && opt.success()
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //回退拦截
      leftBtn: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('webview_left_button', opt)
          window.appCallBack = opt.success
          opt.success && opt.success()
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //修改导航栏
      navigation: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('navigation', opt)
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //导航栏颜色
      navigationColor: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('navigation_color', opt)
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //凡泰小程序跳转
      applet: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('bridge', {
            flag: 'applet',
            extra: opt
          })
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //应用间导航
      navigateTo: function(opt) {
        if (opt.developMode == 0) {
          if (opt.appType == 0) {
            routerGo(opt.url)
          } else {
            this.applet({ appId: opt.appId })
          }
        } else {
          window.location.href = opt.url
        }
      },
      fetch: function(url, options, type) {
        return request(url, options, type)
      },
      //获取token
      getToken: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('getToken')
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: '获取token失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      }
    },
    /**
     * 工具型JSAPI
     */
    util: {
      //获取当前环境
      getEnv: function(opt) {
        var ua = navigator.userAgent
        var envFlag = ''
        if (ua.match(/dingchenglife/i)) {
          envFlag = 'isAPP'
        } else if (ua.match(/MicroMessenger/i)) {
          envFlag = 'isWX'
        } else {
          envFlag = 'other'
        }
        opt.success && opt.success({ env: envFlag })
      },
      //是否在app内部
      isAPP: function() {
        return isAPP()
      },
      //获取位置
      getLocation: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('getLocation')
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: '获取定位失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //打电话
      tel: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('bridge', {
            flag: 'tel',
            extra: opt
          })
        } else {
          console.log('error:请在app环境内调用')
        }
      }
    },
    /**
     * 存储类JSAPI
     */
    storage: {
      //设置存储信息
      setInfo: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('setInfo', opt)
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: '设置存储信息失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //获取存储信息
      getInfo: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('getInfo', opt)
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: '获取存储信息失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //删除存储信息
      removeInfo: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('removeInfo', opt)
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: '删除存储信息失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      }
    },
    /**
     * 设备类JSAPI
     */
    device: {
      //alert
      alert: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('alert', opt)
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: 'alert失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //confirm
      confirm: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('confirm', opt)
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: 'confirm失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      },
      //toast
      toast: function(opt) {
        if (isAPP()) {
          EWebBridge.webCallAppInJs('toast', opt)
            .then(function(data) {
              var json = JSON.parse(data)
              opt.success && opt.success(json)
            })
            .catch(function(err) {
              opt.fail && opt.fail({ errMsg: 'toast失败' })
            })
        } else {
          console.log('error:请在app环境内调用')
        }
      }
    }
  }
  ebiz.fn.init.prototype = ebiz.fn
  return ebiz()
})
