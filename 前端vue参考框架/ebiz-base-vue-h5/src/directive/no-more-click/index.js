/**
 * @describe  // 全局防重复点击
 * @example v-no-more-click="1000"
 */
export default {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, binding.value || 1000)
    })
  }
}
