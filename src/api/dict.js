import request from '@/utils/request'

const Api = {
  GetDict: '/datadict/listByGroup.do'
}

/**
 * 字典
 * @param {*} parameter 
 * @returns 
 */
export function getDict (type) {
  return request({
    url: Api.GetDict,
    method: 'post',
    data: {
      grouptype: type
    }
  })
}
