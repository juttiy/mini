<template>
  <view class="log-wrapper">
    <view class="log-tab">
      <view class="tab" :class="{ 'actived': type === 'max' }" @click="toggle('max')">最大无关组与秩记录</view>
      <view class="tab" :class="{ 'actived': type === 'zhi' }" @click="toggle('zhi')">行列式计算记录</view>
    </view>
    <view class="result-contents">
      <view class="no-data" v-if="!list.length">暂无数据</view>
      <view class="list" v-else>
        <view class="list-item" v-for="(item, index) in list" :key="index">
          <view class="kuo"><text decode="true">{{ letterL }}</text></view>
          <view class="shi">
            <view class="num" v-for="val in item" :key='val'>
              <view class="num-inner" v-for="valInner in val" :key="valInner">{{ valInner }}</view>
            </view>
          </view>
          <view class="kuo"><text decode="true">{{ letterR }}</text></view>
          <view class="btn">
            <button type="primary" @click="toResult(item)">查看</button>
          </view>
        </view>
      </view>
      <view class="resultWrapper" v-if="showModal">
        <view class="result-content">
          <JuZheng ref="juzheng" :num='num' :A='A' :notStorage='notStorage' />
          <button class="cancel" type="primary" @click="closeModal">关闭</button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import JuZheng from '../../components/juzheng.vue'
export default {
  components: {
    JuZheng
  },
  data() {
    return {
      type: 'max',
      list: [],
      showModal: false,
      A: [],
      num: 0,
      notStorage: true,
      letterL: '{',
      letterR: '}',
    }
  },
  onLoad() {
    console.log(1)
    this.getData()
  },
  onShow(){
    console.log(2)
    this.getData()
  },
  methods: {
    closeModal(){
      this.showModal = false
    },
    handleCal() {
        this.$refs.juzheng.handleCal(this.type)
      },
    toResult(item) {
      this.showModal = true
      this.A = item
      this.$nextTick(() => this.handleCal())
    },
    getData() {
      // wx.removeStorageSync('logs')
      console.log(uni.getStorageSync(this.type))
      let list = uni.getStorageSync(this.type) || '[]'
      list = JSON.parse(list)
      this.list = list
      console.log(this.list)
    },
    toggle(type) {
      this.type = type
      this.getData()
    }
  }
}
</script>
<style>
.log-tab{
  width: 90%;
  margin: 10px auto;
  display: flex;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.tab{
  height: 34px;
  line-height: 34px;
  flex: 1;
  text-align: center;
}
.tab:nth-child(1){
  border-right: 1px solid #ccc;
}
.tab.actived{
  border-color: #007aff;
  color: #fff;
  background-color: #007aff;
}
.no-data{
  margin: 20px;
  text-align: center;
}
.list-item{
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 4px 4px 12px #ccc;
}
.kuo, .btn, .shi{
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shi{
  flex: 1;
  flex-wrap: wrap;
}
.shi .inner{
  width: 100%;
}
.btn button{
  /* padding: 4px 20px; */
  font-size: 12px;
}
.kuo{
  font-size: 30px;
  text-align: right;
}
.num{
  display: flex;
  width: 100%;
  margin: 5px 0px;
}
.num-inner{
  flex: 1;
  text-align: center;
}
.resultWrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
}
.result-content{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 4px 4px 15px #ccc;
  border-radius: 20px;
}
</style>