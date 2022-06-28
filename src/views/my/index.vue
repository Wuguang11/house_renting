<template>
  <div>
    <!-- 头部显示区域 -->
    <div
      class="backgroundImg"
      ref="Img"
      :style="{ backgroundImage: `url(${baseURL + userInfo.avatar})` }"
    >
      <!-- 登录成功显示头像区域 -->
      <div
        class="avaterBox"
        v-if="$store.state.user && $store.state.user.token"
      >
        <van-image
          round
          width="60px"
          height="60px"
          :src="baseURL + userInfo.avatar"
          class="avater"
        />
        <p class="renter">{{ userInfo.nickname }}</p>
        <van-button type="primary" round size="mini" @click="logout"
          >退出</van-button
        >
        <div class="userInfo">
          编辑个人资料 <van-icon name="play" class="right-icon" />
        </div>
      </div>
      <!-- 未登录图片显示区域 -->
      <div class="avaterBox" v-else>
        <van-image
          round
          width="60px"
          height="60px"
          src="http://liufusong.top:8080/img/profile/avatar.png"
          class="avater"
        />
        <p class="renter">游客</p>
        <van-button type="primary" round size="mini" @click="$router.push('/')"
          >去登录</van-button
        >
      </div>
    </div>
    <!-- 中部标签栏 -->
    <div class="content-list">
      <van-col span="8" class="icon-item">
        <van-icon name="star-o" class="iconList" size="30px" />
        <p>我的收藏</p>
      </van-col>
      <van-col span="8" class="icon-item">
        <van-icon name="wap-home-o" class="iconList" size="30px" />
        <p>我的出租</p>
      </van-col>
      <van-col span="8" class="icon-item">
        <van-icon name="underway-o" class="iconList" size="30px" />
        <p>看房记录</p>
      </van-col>
      <van-col span="8" class="icon-item">
        <van-icon name="vip-card-o" class="iconList" size="30px" />
        <p>成为房主</p>
      </van-col>
      <van-col span="8" class="icon-item">
        <van-icon name="manager-o" class="iconList" size="30px" />
        <p>个人资料</p>
      </van-col>
      <van-col span="8" class="icon-item">
        <van-icon name="service-o" class="iconList" size="30px" />
        <p>联系我们</p>
      </van-col>
    </div>
    <van-image
      width="375px"
      height="100px"
      src="http://liufusong.top:8080/img/profile/join.png"
    />
  </div>
</template>

<script>
import { getusrInfo } from '@/api/user'
export default {
  name: 'my',
  async created () {
    try {
      if (this.$store.state.user.token) {
        const { data: res } = await getusrInfo()
        this.userInfo = res.body
      }
    } catch (error) {
      this.$toast.fail('获取用户数据失败')
    }
  },
  data () {
    return {
      userInfo: {},
      baseURL: 'http://liufusong.top:8080'
    }
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        message: '确认退出？'
      })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch((err) => {
          // on cancel
          console.log(err)
        })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.backgroundImg {
  margin-bottom: 0px;
  background-repeat: no-repeat;
  background-size: cover;
  width: 375px;
  height: 350px;
  // background-image: url("http://liufusong.top:8080/img/profile/bg.png");
  background-size: content;
  .avaterBox {
    z-index: 999;
    box-shadow: 0px 0px 10px 2px #ddd;
    position: absolute;
    top: 140px;
    left: 30px;
    width: 320px;
    height: 210px;
    background-color: #fff;
    .avater {
      position: absolute;
      top: -30px;
      left: 130px;
      border: 4px solid #ddd;
    }
    .logout-btn {
      height: 20px;
      width: 50px;
      font-size: 14px;
    }
    text-align: center;
    .renter {
      margin-top: 40px;
      margin-bottom: -10px;
      font-size: 14px;
    }
    /deep/ .userInfo {
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      color: #999;
      .van-icon:before {
        margin-left: 10px;
        font-size: 12px !important;
      }
    }
  }
}
.content-list {
  padding-top: 10px;
  text-align: center;
  margin-bottom: 20px;
  height: 140px;
  .icon-item {
    padding: 10px 0;
    flex: 1;
    height: 60px;
  }
  .van-icon:before {
    font-size: 22px !important;
  }
  p {
    font-size: 13px;
  }
}
</style>
