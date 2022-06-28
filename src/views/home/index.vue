<template>
  <div>
    <!-- 轮博图区域 -->
    <div class="title-pic">
      <van-swipe :autoplay="3000" :height="212">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="baseURL + image.imgSrc" class="lazy-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
import { getSwiperImg } from '@/api/home'
Vue.use(Lazyload)
export default {
  name: 'home',
  async created () {
    try {
      const { data: res } = await getSwiperImg()
      console.log(res)
      this.images = res.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      images: [],
      baseURL: 'http://liufusong.top:8080'
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title-pic {
  width: 100%;
  height: 212px;
  background-color: pink;
}
.my-swipe .van-swipe-item {
  height: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
// 懒加载图片
.lazy-img {
  height: 212px;
}
</style>
