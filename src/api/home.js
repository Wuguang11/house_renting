/**
 * 获取轮播图数据
 */
import request from '@/utils/request'
export const getSwiperImg = () => {
  return request({
    url: 'home/swiper'
  })
}
