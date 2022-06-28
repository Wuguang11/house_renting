<template>
  <div class="login_container">
    <!-- 头部 -->
    <van-nav-bar title="账号登陆">
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          class="icon"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
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
      try {
        // 提交登录信息获得token
        const res = await login(values)
        this.$toast.success('登陆成功')
        // console.log(res.data.body)
        // 将获得的token存储到本地
        this.$store.commit('setUser', res.data.body)
        // 跳转到首页
        this.$router.push('/layout')
      } catch (error) {
        this.$toast.fail('登陆失败')
      }
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
  line-height: 200px;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__arrow {
    color: #fff !important;
    font-size: 20px;
  }
}
.login_ipt {
  display: flex;
  justify-content: center;
  /deep/ .van-field__control {
    height: 60px !important;
    font-size: 18px;
  }
}
.login_btn {
  .van-button--block {
    font-size: 20px;
    background-color: #1cb676;
  }
}
.icon {
  color: #fff;
}
.login_amount {
  height: 80px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin: 0 120px;
}
</style>
