<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar class="title-container">
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          class="icon"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
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
        <van-icon name="guide-o" />
      </div>
    </div>
    <!-- 下拉单区域 -->
    <van-dropdown-menu active-color="#21b97a" direction="down">
      <van-dropdown-item title="区域">
        <van-picker
          show-toolbar
          :columns="columns1"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-dropdown-item>
      <van-dropdown-item title="方式">
        <van-picker show-toolbar :columns="columns2"> </van-picker>
      </van-dropdown-item>
      <van-dropdown-item title="租金">
        <van-picker show-toolbar :columns="columns3"> </van-picker>
      </van-dropdown-item>
      <van-dropdown-item title="筛选"> </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 菜单栏下描述信息 -->
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    >
      <template #tags>
        <van-tag plain type="danger">标签</van-tag>
        <van-tag plain type="danger">标签</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </template>
    </van-card>
    <van-cell @click="show = true" class="show-popup" />
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '668px', width: '292.5px' }"
      class="popup"
    >
      <!-- 弹出框展示的内容 -->
      <ShowPoup :data="data"></ShowPoup>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getAreaInfo } from '@/api/findHouse'
import ShowPoup from '@/views/findhouse/components/ShowPopup.vue'
export default {
  name: 'FindHouse',
  created () {
    this.getNavInfo()
  },
  // mounted () {
  //   this.$refs.item.toggle = false
  // },
  data () {
    return {
      // 右侧导航栏是否显示
      show: false,
      // 选项栏数据
      columns1: [], // 区域
      columns2: [], // 方式
      columns3: [], //  租金
      // 储存获取到的数据
      data: []
    }
  },
  methods: {
    // 获取导航栏数据
    async getNavInfo () {
      try {
        const { data: res } = await getAreaInfo({ id: this.$store.state.nowId })
        console.log(res)
        // 存储数据
        this.data = res.body
        // 得到区域的数据
        this.columns1.push(res.body.area)
        this.columns1.push(res.body.subway)
        // 得到一级标题
        this.columns1[0].text = res.body.area.label
        this.columns1[1].text = res.body.subway.label
        this.columns1[0].children.forEach(item => {
          // 得到二级标题
          item.text = item.label
          if (item.label !== '不限') {
            item.children.forEach(item1 => {
              // 得到三级标题
              item1.text = item1.label
            })
          }
        })
        this.columns1[1].children.forEach(item => {
          item.text = item.label
          if (item.label !== '不限') {
            item.children.forEach(item1 => {
              item1.text = item1.label
            })
          }
        })
        this.columns1[0].children.shift()
        this.columns1[1].children.shift()
        // 获取方式标签的数据
        res.body.rentType.forEach(item => {
          this.columns2.push(item.label)
        })
        // 组件标签的数据
        res.body.price.forEach(item => {
          this.columns3.push(item.label)
        })
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      Toast('取消')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ShowPoup }
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  height: 50px !important;
}
/deep/ .van-nav-bar__left {
  left: -10px;
  top: 10px;
}
.icon {
  color: #fff;
}
.title {
  z-index: 1;
  position: absolute;
  left: 20px;
  top: 8px;
  width: 95%;
  height: 35px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    margin-left: 8px;
    margin-right: 10px;
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
    .van-button--default {
      color: #9c9fa1;
    }
    .inner-right {
      padding-left: 10px;
      .van-button--default {
        border: 1px solid #fff;
      }
    }
  }
  .right {
    color: #fff;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
  }
}
/deep/ .van-picker__toolbar {
  display: flex;
  height: 50px;
  width: 100%;
  z-index: 9;
  position: absolute;
  bottom: 0;
  left: 0;
  .van-picker__confirm {
    font-size: 18px;
    width: 65%;
    background-color: #21b97a;
    color: #fff;
  }
  .van-picker__cancel {
    width: 30%;
    color: #21b97a;
    font-size: 18px;
  }
}
/deep/ .van-dropdown-menu__title {
  font-size: 17px !important;
  color: #333;
}
// 右边的侧边栏区域
.show-popup {
  position: absolute;
  top: 46px;
  right: 0;
  padding: 0;
  width: 94px;
  height: 50px;
  background-color: transparent;
}
.popup {
}
</style>
