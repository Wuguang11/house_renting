<template>
  <div>
    <div class="main">
      <!-- 户型 -->
      <p class="public">户型</p>
      <div class="check-container">
        <ul>
          <li
            v-for="(item, index) in houseTypeList"
            :key="index"
            @click="onClick"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 朝向 -->
      <p class="public">朝向</p>
      <div class="check-container">
        <ul>
          <li
            v-for="(item, index) in orientation"
            :key="index"
            @click="onClick"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 房屋亮点 -->
      <p class="public">房屋亮点</p>
      <div class="check-container">
        <ul>
          <li
            v-for="(item, index) in houseHighlights"
            :key="index"
            @click="onClick"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom">
      <van-button type="default" class="btn btn-white">取消</van-button>
      <van-button type="primary" class="btn btn-green" color="#21b97a"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  created () {
    // 处理数据
    this.data.roomType.forEach(item => {
      this.houseTypeList.push(item.label)
    })
    this.data.oriented.forEach(item => {
      this.orientation.push(item.label)
    })
    this.data.characteristic.forEach(item => {
      this.houseHighlights.push(item.label)
    })
  },
  data () {
    return {
      active: 0,
      checked: true,
      houseTypeList: [],
      orientation: [],
      houseHighlights: []
    }
  },
  methods: {
    onClick (e) {
      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active')
      } else {
        e.target.classList.add('active')
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
.bottom {
  position: sticky;
  bottom: 0px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  // 底部按钮
  .btn {
    font-size: 18px;
    height: 48px;
  }
  .btn-white {
    color: #21b97a;
    width: 99px;
  }
  .btn-green {
    width: 197px;
  }
}
.main {
  padding: 0px 15px 48px;
}
// p标签公用样式
.public {
  margin: 20px 0;
  font-size: 15px;
  color: #333;
}
.first {
  width: 225px;
  height: 165px;
}
.check-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 40px;
  padding: 0 0 4px;
  border-bottom: 1px solid #e3e3e3;
  li {
    text-align: center;
    line-height: 32px;
    display: inline-block;
    margin: 0 18px 15px 0;
    width: 70px;
    height: 32px;
    font-size: 12px;
    color: #888;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
  }
  .active {
    color: #21b97a !important;
    border-color: #21b97a !important;
    background-color: #defaef !important;
  }
}
</style>
