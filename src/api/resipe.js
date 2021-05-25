import request from '@/utils/request'

const Api = {
  ResipeList: '/resipe/list.do',
  ResipeDetail: '/resipe/detail.do',
  ResipeCharts: '/resipe/burildugun.do',
  ResipeSave: '/resipe/save.do',
  ResipeRemove: '/resipe/delete.do'
}

/**
 * 处方列表
 * @param {*} parameter 
 * @returns 
 */
export function resipeList (params) {
  return request({
    url: Api.ResipeList,
    method: 'post',
    data: params
  })
}

/**
 * 处方描述
 * @param {*} parameter 
 * @returns 
 */
 export function resipeDetail (params) {
  return request({
    url: Api.ResipeDetail,
    method: 'post',
    data: params
  })
}

/**
 * 处方保存
 * @param {*} parameter 
 * @returns 
 */
 export function resipeSave (params) {
  return request({
    url: Api.ResipeSave,
    method: 'post',
    data: params
  })
}

/**
 * 删除处方
 * @param {*} parameter 
 * @returns 
 */
 export function resipeRemove (params) {
  return request({
    url: Api.ResipeRemove,
    method: 'post',
    data: params
  })
}
