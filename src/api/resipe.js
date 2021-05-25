import request from '@/utils/request'

const Api = {
  ResipeList: '/resipe/list.do',
  ResipeDetail: '/resipe/detail.do',
  ResipeCharts: '/resipe/burildugun.do',
  DurgSave: '/drug/save.do',
  DrugRemove: '/drug/delete.do',
  DrugImageUpload: '/drug/upload.do',
  DrugImageList: '/drug/getDrugImg.do',
  DrugImagePreview: '/drug/showFile.do',
  DrugImageRemove: '/drug/deleteFile.do'
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

/**
 * 删除药品
 * @param {*} parameter 
 * @returns 
 */
 export function drugRemove (params) {
  return request({
    url: Api.DrugRemove,
    method: 'post',
    data: params
  })
}

/**
 * 上传药品图片
 * @returns {*}
 */
 export function uploadImage (formData, header) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    ...(header || {})
  }
  return request({
    url: Api.DrugImageUpload,
    method: 'post',
    headers: headers,
    data: formData,
    onUploadProgress: evt => {
    }
  })
}

/**
 * 药品图片列表
 * @param {*} parameter 
 * @returns 
 */
 export function drugImageList (params) {
  return request({
    url: Api.DrugImageList,
    method: 'post',
    data: params
  })
}

/**
 * 药品图片查看
 * @param {*} parameter 
 * @returns 
 */
 export function drugImagePreview (params) {
  return request({
    url: Api.DrugImagePreview,
    method: 'get',
    params: params,
    responseType: 'arraybuffer'
  })
}

/**
 * 药品图片删除
 * @param {*} parameter 
 * @returns 
 */
 export function drugImageRemove (params) {
  return request({
    url: Api.DrugImageRemove,
    method: 'post',
    data: params
  })
}