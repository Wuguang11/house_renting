<template>
  <div class="login_container">
    <!-- 头部 -->
    <van-nav-bar title="账号登陆" left-arrow />
    <!-- 中间输入内容 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '用户名不能为空!' }]"
        class="login_ipt"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        class="login_ipt"
      />
      <div style="margin: 16px" class="login_btn">
        <van-button block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
    <a class="login_amount">还没有账号，去登录~</a>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'login',
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      // 先进行表单验证
      const regName = /^[a-zA-Z0-9_-]{5,8}$/
      if (!regName.test(values.username)) {
        this.$toast('用户名必须是5-8位的数字或者字母')
        return
      }
      const regPsd = /^[a-zA-Z0-9_-]{5,12}$/
      if (!regPsd.test(values.password)) {
        this.$toast('用户密码必须是5-12位的数字或者字母')
        return
      }
      // 提交登录信息获得token
      const res = await login(values)
      this.$toast.success('登陆成功')
      // console.log(res.data.body)
      // 将获得的token存储到本地
      this.$store.commit('setUser', res.data.body)
      // 跳转到首页
      this.$router.push('/layout')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar {
  .van-nav-bar__content {
    height: 120px !important;
  }
  line-height: 200px;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__arrow {
    color: #fff !important;
    font-size: 50px;
  }
  .van-nav-bar__left {
    left: 40px;
    .van-cell {
      padding-left: 80px !important;
    }
  }
}
.login_ipt {
  padding-left: 80px;
  display: flex;
  justify-content: center;
  /deep/ .van-field__control {
    height: 120px !important;
    font-size: 40px;
  }
}
.login_btn {
  height: 100px;
  .van-button--block {
    height: 100px;
    font-size: 40px;
    background-color: #1cb676;
  }
}
.login_amount {
  height: 80px;
  width: 100%;
  text-align: center;
  margin: 0 230px;
}
</style>
