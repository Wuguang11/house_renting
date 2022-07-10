import request from '@/utils/request'
/**
 * 热门城市
 */
export const getHotCity = () => {
  return request({
    url: 'area/hot'
  })
}
/**
 * 城市列表数据
 */
export const getAllCity = (params) => {
  return request({
    url: '/area/city',
    params
  })
}
