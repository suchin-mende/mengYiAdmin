import request from '@/utils/request'

const Api = {
  DragList: '/drug/list.do'
}

/**
 * 药品列表
 * @param {*} parameter 
 * @returns 
 */
export function dragList (params) {
  return request({
    url: Api.DragList,
    method: 'post',
    data: params
  })
}
