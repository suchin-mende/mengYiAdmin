import request from '@/utils/request'

const accsApi = {
  UserList: '/system/sysuser/list.do',
  UserDetail: 'system/sysuser/detail.do',
  UserSave:'/system/sysuser/saveUser.do',
  GetCurUser:'system/sysuser/getCurUser.do'
}

/**
 * UserList func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */

export function uList (parameter) {
  return request({
    url: accsApi.UserList,
    method: 'post',
    data: parameter
  })
}

export function uDetail (parameter) {
  return request({
    url: accsApi.UserDetail,
    method: 'post',
    data: parameter
  })
}

export function uSave (parameter) {
  return request({
    url: accsApi.UserSave,
    method: 'post',
    data: parameter
  })
}

export function getCur () {
  return request({
    url: accsApi.GetCurUser,
    method: 'post'
  })
}
