<template>
  <div>
    <!-- 轮博图区域 -->
    <div class="title-pic">
      <van-swipe :autoplay="3000" :height="212">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="baseURL + image.imgSrc" class="lazy-img" />
        </van-swipe-item>
      </van-swipe>
      <div class="title">
        <div class="left">
          <!-- 左部地址 -->
          <div class="inner-left" @click="$router.push('/city')">
            {{ this.$store.state.nowCityName }}
            <van-icon name="location" />
          </div>
          <!-- 右部按钮 -->
          <div class="inner-right">
            <van-button type="default" block size="small">
              <template #icon>
                <van-icon name="search" />
              </template>
              请输入小区或者地址</van-button
            >
          </div>
        </div>
        <div class="right">
          <van-icon name="guide-o" @click="$router.push('/map')" />
        </div>
      </div>
    </div>
    <!-- 标签栏区域 -->
    <div class="table-menu">
      <div class="item">
        <img src="../../assets/allrent.png" alt="图片显示错误" />
        <p>整租</p>
      </div>
      <div class="item">
        <img src="../../assets/pattern.png" alt="图片显示错误" />
        <p>合租</p>
      </div>
      <div class="item">
        <img src="../../assets/location.png" alt="图片显示错误" />
        <p>地图找房</p>
      </div>
      <div class="item">
        <img
          src="../../assets/yaoshi.png"
          alt="图片显示错误"
          @click="$router.push('/rent/add')"
        />
        <p>去出租</p>
      </div>
    </div>
    <!-- 底部租房小组区域 -->
    <div class="group">
      <div class="group-title">
        <h4>租房小组</h4>
        <p>更多</p>
      </div>
      <!-- 信息展示区域 -->
      <van-row gutter="10">
        <van-col span="12" class="info-item">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="pic"
          />
          <p>家住回龙观归属的感觉</p>
        </van-col>
        <van-col span="12" class="info-item">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="pic"
          />
          <p>家住回龙观归属的感觉</p>
        </van-col>
        <van-col span="12" class="info-item">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="pic"
          />
          <p>家住回龙观归属的感觉</p>
        </van-col>
        <van-col span="12" class="info-item">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="pic"
          />
          <p>家住回龙观归属的感觉</p>
        </van-col>
      </van-row>
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
      this.images = res.body
    } catch (err) {
      this.$toast('获取图片信息失败，请稍后重试')
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
//=== 头部区域
.title-pic {
  position: relative;
  width: 100%;
  height: 212px;
  .title {
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    height: 35px;

    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      margin-left: 8px;
      background-color: rgb(255, 255, 255);
      width: 310px;
      height: 100%;
      border-radius: 2px;
      vertical-align: middle;
      display: flex;
      align-items: center;
      .inner-left {
        padding-left: 10px;
        height: 28px;
        width: 75px;
        font-size: 16px;
        line-height: 28px;
        border-right: 1px solid #e5e5e5;
        /deep/ .van-icon:before {
          font-size: 20px !important;
        }
      }
      .inner-right {
        padding-left: 10px;
        .van-button--default {
          border: 1px solid #fff;
        }
      }
    }
    .right {
      height: 25px;
      width: 25px;
      display: flex;
      align-items: center;
    }
  }
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

//===菜单栏
.table-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 18px 10px 18px 10px;
  height: 122px;
  width: 375px;
  text-align: center;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      font-size: 14px;
      margin: 10px 0;
    }
  }
}
// 租房小组区域
.group {
  padding: 0 10px;
  height: 188px;
  background-color: #f6f5f6;
  .group-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0 10px 10px;
    width: 345;
    height: 48px;
    font-size: 15px;
    line-height: 18px;
  }
  .info-item {
    width: 170px;
    height: 50px;
    margin: 0 0 10px 7px;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    .pic {
      margin: 0 10px;
    }
    p {
      width: 70px;
      line-height: 16px;
      text-align: center;
    }
  }
}
</style>
