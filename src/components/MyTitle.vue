<template>
  <div>
    <van-nav-bar :title="title">
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          class="icon"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'MyTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.icon {
  color: #fff;
}
</style>
