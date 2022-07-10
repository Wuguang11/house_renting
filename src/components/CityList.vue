<template>
  <div class="city-container">
    <!-- ===头部区域=== -->
    <van-nav-bar title="城市列表" fixed>
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          class="icon"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
    <!-- 索引栏 -->
    <van-index-bar :index-list="indexList">
      <template v-for="(value, key) in cityList">
        <van-index-anchor
          :index="key === '#' ? '当前城市' : key === '热' ? '热门城市' : key"
          :key="key"
        />
        <!-- <span :key="key + 'a'">{{
          key === "#" ? "当前城市" : key === "热" ? "热门城市" : key
        }}</span> -->
        <van-cell
          v-for="(citem, cindex) in value"
          :key="cindex + key"
          :title="citem.name"
          @click="getDetail(citem)"
        ></van-cell>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import { getHotCity, getAllCity } from '@/api/city'
// 筛选城市数据的方法
import citySorter from '@/utils/citySort'
export default {
  name: 'CityList',
  async created () {
    // 请求热门城市
    try {
      const { data: res } = await getHotCity()
      this.hotCityList = res.body
    } catch (error) {
      console.log(error)
    }
    // 请求城市列表
    this.getAllCity()
  },
  mounted () {
    // 获取存储的当前城市的城市名和id
    this.nowCityName = this.$store.state.nowCityName
    this.nowId = this.$store.state.nowId
  },
  data () {
    return {
      hotCityList: [],
      indexList: ['#', '热'],
      nowCityName: '',
      nowId: '',
      cityList: []
    }
  },
  methods: {
    async getAllCity () {
      const { data: res } = await getAllCity({ level: 1 })
      // 将获得的城市数据筛选成拼音首字母的键值对对象
      const obj = citySorter(res.body)
      this.cityList = obj
      // 获取有城市数据的首字母
      const cityIndex = []
      for (const key in obj) {
        if (obj[key].length !== 0) {
          cityIndex.push(key)
        }
      }
      // 将晒选出来的首字母增加到indexList里面 获得右边侧边栏的数据
      this.indexList.push(...cityIndex)
      // 分别获得右边侧边栏对应的城市数据
      const cityName = {}
      this.indexList.forEach((item, index) => {
        cityName[item] = []
        // # 索引对应的城市数据
        if (item === '#') {
          cityName[item].push({
            name: this.nowCityName,
            id: this.nowId
          })
        } else if (item === '热') {
          // 将热门城市变成数组里的对象
          const hotName = []
          // 遍历热门城市
          this.hotCityList.forEach((itm) => {
            hotName.push({
              name: itm.label,
              id: itm.value
            })
          })
          // 将遍历得到的数组赋值给城市列表
          cityName[item] = hotName
        } else {
          // 处理ajax获得的城市数据
          // this.cityList.forEach((item, idex) => {
          //   console.log(item)
          // })
          for (const key in this.cityList) {
            if (key === item) {
              obj[key].forEach(item1 => {
                cityName[key].push({
                  name: item1.label,
                  id: item1.value
                })
              })
            }
          }
          this.cityList = cityName
        }
      })
    },
    getDetail (citem) {
      // 将热门遍历成一个数组，然后判断点击的城市是否在数组中筛选出点击的城市
      console.log(citem)
      const arr = []
      this.hotCityList.forEach(item => {
        arr.push(item.label)
      })
      // console.log(arr.includes(citem.name))
      if (arr.includes(citem.name)) {
        this.$store.commit('setCityName', citem)
        // 回退首页
        this.$router.back()
      } else {
        this.$toast('该城市暂无房源')
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
.city-container {
  // height: calc(100vh- px);
  // overflow: auto;
  padding-top: 45px;
  /deep/ .van-index-bar__index--active {
    background-color: #21b97a;
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    padding-right: 0 !important;
    padding-top: 0;
  }
  /deep/ .van-index-bar__index {
    padding: 4px 0 5px 0;
    line-height: 19px;
  }
  /deep/ .van-index-bar__sidebar {
    top: 53%;
    padding-right: 8px;
  }
  /deep/.van-index-anchor {
    height: 44px !important;
  }
}
.icon {
  color: #fff;
}
</style>
