import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)
Validator.locale = 'zh_CN'
Validator.localize('zh_CN', {
  messages: zh_CN.messages
})

/*自定义校验规则*/

//手机号
Validator.extend('mobile', {
  getMessage: () => '手机格式不正确',
  validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})

//非空
Validator.extend('required', {
  getMessage(field) {
    return field + '不能为空'
  },

  validate(value) {
    if (value) {
      return true
    }
    return false
  }
})

//邮箱
Validator.extend('email', {
  getMessage: () => '邮箱格式错误',
  validate(value) {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
  }
})

//名字
Validator.extend('name', {
  getMessage: () => '名字长度不超过1-15个字',
  validate: value => {
    return /^[\u4e00-\u9fa5·]{1,15}$/.test(value)
  }
})

//年龄
Validator.extend('age', {
  getMessage: () => '年龄不得小于18岁',
  validate: value => {
    return value > 17 && /^\d{1,3}$/.test(value)
  }
})
