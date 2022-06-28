/**
 * 用户登录
 */
import request from '@/utils/request'
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data
  })
}
/**
 * 获取用户信息
 */
export const getusrInfo = () => {
  return request({
    url: 'user'
  })
}
