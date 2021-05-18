import request from '@/utils/request'

const Api = {
  DrugList: '/drug/list.do',
  DrugDetail: '/drug/detail.do',
  DurgSave: '/drug/save.do'
}

/**
 * 药品列表
 * @param {*} parameter 
 * @returns 
 */
export function drugList (params) {
  return request({
    url: Api.DrugList,
    method: 'post',
    data: params
  })
}

/**
 * 药品描述
 * @param {*} parameter 
 * @returns 
 */
 export function drugDetail (params) {
  return request({
    url: Api.DrugDetail,
    method: 'post',
    data: params
  })
}

/**
 * 药品保存
 * @param {*} parameter 
 * @returns 
 */
 export function durgSave (params) {
  return request({
    url: Api.DurgSave,
    method: 'post',
    data: params
  })
}
