import request from '@/utils/request'
/**
 * @param {一级城市的id} id
 */
export const getAreaInfo = (params) => {
  return request({
    url: 'houses/condition',
    params
  })
}
