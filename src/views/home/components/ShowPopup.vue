<template>
  <div>
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      show-toolbar:true
      :default-index="0"
      v-show="flag"
    />
  </div>
</template>

<script>
export default {
  name: 'ShowPoup',
  props: {
    columns: {
      type: [Array, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      flag: true
    }
  },
  methods: {
    onConfirm (value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`)
      this.$emit('confirm', [false, value])
    },
    onCancel (picker, value, index) {
      this.$emit('cancel', false)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-picker__toolbar {
  height: 42px;
  border-bottom: 1px solid #f6f5f9;
  .van-picker__cancel {
    font-size: 17px;
    color: #108ee9;
  }
  .van-picker__confirm {
    font-size: 17px;
    color: #108ee9;
  }
}
</style>
