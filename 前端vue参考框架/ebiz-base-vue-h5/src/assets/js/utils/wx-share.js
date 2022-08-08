import { wxShare } from '@/api/ebiz/common/common.js'
var wx = require('weixin-js-sdk')
//鼎诚人寿 微信分享
export function weixinShare(options) {
  let defaults = {
    title: '',
    imgUrl: '',
    desc: '',
    link: window.location.href
  }
  let params = Object.assign(defaults, options)
  let localURl = location.href.split('#')[0]
  wxShare({ url: localURl }).then(response => {
    if (response.result == '0') {
      let data = response.content
      if (typeof data == 'string') {
        data = JSON.parse(data)
      }

      wx.config({
        //debug: true,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'updateAppMessageShareData', 'updateTimelineShareData']
      })
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: params.title,
          link: params.link,
          imgUrl: params.imgUrl,
          success: function() {},
          cancel: function() {}
        })

        wx.onMenuShareAppMessage({
          title: params.title,
          desc: params.desc,
          link: params.link,
          imgUrl: params.imgUrl,
          type: 'link',
          dataUrl: '',
          success: function() {},
          cancel: function() {}
        })

        wx.updateAppMessageShareData({
          title: params.title,
          desc: params.desc,
          link: params.link,
          imgUrl: params.imgUrl,
          type: 'link',
          dataUrl: '',
          success: function() {},
          cancel: function() {}
        })

        wx.updateTimelineShareData({
          title: params.title,
          desc: params.desc,
          link: params.link,
          imgUrl: params.imgUrl,
          type: 'link',
          dataUrl: '',
          success: function() {},
          cancel: function() {}
        })
      })
    }
  })
}
