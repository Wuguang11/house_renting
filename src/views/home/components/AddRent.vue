<template>
  <div class="house-container">
    <!-- 头部区域 -->
    <MyTitle :title="title"></MyTitle>
    <!-- 房源信息 -->
    <van-cell title="房源信息" style="color: #21b97a" />
    <!-- 小区名称 -->
    <van-cell-group style="color: #666">
      <van-cell title="小区名称" is-link value="请输入小区名称" />
    </van-cell-group>
    <!-- 租金 -->
    <van-cell-group>
      <van-field v-model="rental" placeholder="请输入租金/月" type="digit">
        <template #label> 租 &nbsp;&nbsp;&nbsp;&nbsp; 金 </template>
        <template #extra> ￥/月 </template>
      </van-field>
    </van-cell-group>
    <!-- 建筑面积 -->
    <van-cell-group>
      <van-field v-model="floorage" placeholder="请输入租金/月">
        <template #label> 建筑面积 </template>
        <template #extra> m² </template>
      </van-field>
    </van-cell-group>
    <!-- 户型 -->
    <van-cell-group style="color: #666">
      <van-cell is-link :value="chooseData1" @click="show1 = true">
        <template #title>
          <i>户 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</i>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show1" position="bottom" :style="{ height: '42%' }">
      <ShowPoup
        :columns="columns1"
        @cancel="show1 = $event"
        @confirm="getChoose1"
      ></ShowPoup>
    </van-popup>
    <!-- 所在楼层 -->
    <van-cell-group style="color: #666">
      <van-cell is-link :value="chooseData2" @click="show2 = true">
        <template #title>
          <i>所住楼层</i>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show2" position="bottom" :style="{ height: '30%' }">
      <ShowPoup
        :columns="columns2"
        @cancel="show2 = $event"
        @confirm="getChoose2"
      ></ShowPoup
    ></van-popup>
    <!-- 朝向 -->
    <van-cell-group style="color: #666">
      <van-cell is-link :value="chooseData3" @click="show3 = true">
        <template #title>
          <i>朝 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</i>
        </template>
        <template #label>
          <h5 class="info">房屋标题</h5>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show3" position="bottom" :style="{ height: '30%' }">
      <ShowPoup
        :columns="columns3"
        @cancel="show3 = $event"
        @confirm="getChoose3"
      ></ShowPoup
    ></van-popup>
    <!-- 房屋头像 -->
    <van-cell-group style="color: #666" :border="false">
      <van-field
        v-model="houseTitle"
        placeholder="请输入标题 (例如：整租 小区名 2室 5000元)"
      />
      <van-field label="房屋图像" />
    </van-cell-group>
    <!-- 上传图片信息 -->
    <van-cell-group style="color: #666">
      <van-uploader :after-read="afterRead" class="uploader" />
      <van-field label="房屋配置" />
    </van-cell-group>
    <!-- 房屋配置 -->
    <div class="house-list-body">
      <div class="house-package">
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>衣柜</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>洗衣机</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>空调</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>天然气</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>冰箱</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>暖气</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>电视</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>热水器</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>宽带</p>
        </div>
        <div class="house-package-item">
          <van-icon name="wap-home-o" class="house-icon" />
          <p>沙发</p>
        </div>
      </div>
    </div>
    <!-- 房屋描述 -->
    <van-cell-group style="color: #666">
      <van-cell value="请选择" />
    </van-cell-group>
    <van-field
      v-model="message"
      rows="5"
      autosize
      type="textarea"
      placeholder="请输入留言"
      class="textarea"
    />
    <!-- 底部按钮 -->
    <van-tabbar v-model="active" class="bottom-tabbar">
      <van-button type="default" class="btn btn-white">取消</van-button>
      <van-button type="primary" class="btn btn-green" color="#21b97a"
        >提交</van-button
      >
    </van-tabbar>
  </div>
</template>

<script>
import MyTitle from '@/components/MyTitle.vue'
import ShowPoup from '@/views/home/components/ShowPopup.vue'
export default {
  name: 'AddRent',
  created () { },
  data () {
    return {
      title: '发布房源',
      // 租金
      rental: '',
      // 建筑面积
      floorage: '',
      // 弹框是否显示
      show1: false,
      show2: false,
      show3: false,
      // 标题
      houseTitle: '',
      // 房屋的描述信息
      message: '',
      // 底部标签栏
      active: 0,
      // 传递给弹窗的数据
      columns1: ['一室', '二室', '三室', '四室', '四室+'],
      columns2: ['高楼层', '中楼层', '低楼层'],
      columns3: ['东', '西', '南', '北'],
      // 接收弹窗的数据
      chooseData1: '请选择',
      chooseData2: '请选择',
      chooseData3: '请选择',
      // 接收上传图片成功后的数据
      successFile: ''
    }
  },
  methods: {
    // 文件上传完毕后会触发 afterread 回调函数，获取到对应的 file 对象。
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    // 接收弹窗传递过来的数据
    getChoose1 (e) {
      this.show1 = e[0]
      this.chooseData1 = e[1]
    },
    getChoose2 (e) {
      this.show2 = e[0]
      this.chooseData2 = e[1]
    },
    getChoose3 (e) {
      this.show3 = e[0]
      this.chooseData3 = e[1]
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { MyTitle, ShowPoup }
}
</script>

<style scoped lang='less'>
.house-container {
  background-color: #f6f5f6;
  padding: 0 0 70px 0;
}
.van-cell {
  color: #666;
}
/deep/ .van-field__label {
  margin-right: 5px;
}
.info {
  height: 36px;
  line-height: 40px;
  font-size: 14px;
  color: #333;
  padding-top: 8px;
  font-weight: normal;
}
/deep/ .van-uploader__input {
  height: 83px;
  width: 83px;
}
/deep/ .van-uploader__wrapper {
  padding: 10px 0 0 10px;
}
.house-list-body {
  width: 376px;
  height: 160px;
  background-color: #f6f5f6;
  .house-package {
    display: flex;
    flex-wrap: wrap;
    width: 375px;
    height: 140px;
    background-color: #fff;
    .house-package-item {
      height: 70px;
      width: 75px;
      padding: 10px 0;
      text-align: center;
      .house-icon {
        width: 23px;
        height: 23px;
      }
      p {
        font-size: 14px;
        color: #333;
        margin-top: -5px;
      }
    }
  }
  .textarea {
    padding: 10px 0;
  }
}
.bottom-tabbar {
  height: 45px;
  .btn {
    height: 45px;
    width: 183px;
    font-size: 15px;
  }
  .btn-white {
    color: #21b97a;
  }
  .btn-green {
    margin-left: 10px;
  }
}
</style>
