<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" class="bottomIcon">
      <van-tabbar-item icon="home-o" to="/layout">首页 </van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/findhouse"
        >找房
      </van-tabbar-item>
      <van-tabbar-item icon="todo-list-o" to="/layout/information"
        >资讯
      </van-tabbar-item>
      <van-tabbar-item icon="contact" to="/layout/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  created () { },
  data () {
    return {
      active: ''
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
.bottomIcon {
  height: 50px;
  font-size: 20px;
}
/deep/ .van-icon:before {
  font-size: 22px !important;
}
</style>
