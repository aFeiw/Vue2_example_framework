import request from '@/assets/js/utils/request'
import getUrl from '@/assets/js/utils/get-url'

export function getList(params) {
  return request({
    url: getUrl('/table/list', 0),
    method: 'get',
    params
  })
}
