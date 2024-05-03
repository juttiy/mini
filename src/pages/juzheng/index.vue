<script>
  import JuZheng from '../../components/juzheng.vue'
  export default {
    data() {
      return {
        num: '',
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        letterL: '{',
        letterR: '}',
      }
    },
    computed: {
      A() {
        let arr = []
        let A1 = this.a1.split(',').length > 1 ? this.a1.split(',') : this.a1.split('，')
        let A2 = this.a2.split(',').length > 1 ? this.a2.split(',') : this.a2.split('，')
        let A3 = this.a3.split(',').length > 1 ? this.a3.split(',') : this.a3.split('，')
        let A4 = this.a4.split(',').length > 1 ? this.a4.split(',') : this.a4.split('，')
        A1.length > 1 && arr.push(A1)
        A2.length > 1 && arr.push(A2)
        A3.length > 1 && arr.push(A3)
        A4.length > 1 && arr.push(A4)
        return arr
      }
    },
    methods: {
      handleCal(type) {
        this.$refs.juzheng.handleCal(type)
      }
    },
    components: {
      JuZheng
    }
  }
</script>
<template>
  <view class="content">
    <view class="juzheng-wrapper">
      <view class="input-wrapper">
        <!-- <view class="input-item">
          <view class="input-title">
            请输入数乘数值
          </view>
        
        </view>
        <view class="input-item">
          <view class="input-title">
          </view>
        </view> -->
        <view class="input-item">
          <view class="input-title">
            请输入矩阵（行列不大于4）
          </view>
        </view>
      </view>
      <view class="input-wrapper">
        <!-- <view class="input-item">
          <view class="input">
            <input type="text" placeholder="请输入" v-model="num">
          </view>
        </view> -->
        <view class="input-item">
          <view class="input fuhao">
            {{ letterL }}
          </view>
        </view>
        <view class="input-item large">
          <view class="input">
            <input type="text" placeholder="请输入" v-model="a1">
            <input type="text" placeholder="请输入" v-model="a2">
            <input type="text" placeholder="请输入" v-model="a3">
            <input type="text" placeholder="请输入" v-model="a4">
          </view>
        </view>
        <view class="input-item">
          <view class="input fuhao">
            {{ letterR }}
          </view>
        </view>
      </view>
    </view>
    <view class="btn-wrapper">
      <button type="primary" @click="handleCal('max')">求最大无关组及秩</button>
      <!-- <button @click="handleCal('num')">求数乘</button> -->
      <button type="primary" @click="handleCal('zhi')">求矩阵的值</button>
    </view>
    <view class="result-wrapper">
      <JuZheng ref="juzheng" :num='num' :A='A' />
    </view>
    <navigator
      url="/pages/juzhengLog/index"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      <view class="log-btn">查看记录</view>
    </navigator>
  </view>
</template>
<style>
.input-wrapper{
  display: flex;
}
.juzheng-wrapper{
  padding: 20px 0;
  /* width: 90%; */
  /* margin: 20px auto; */
  background-color: #fff;
}
.input-item{
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.input-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
.input-item.medium{
  flex: 2;
}
.input-item.large{
  flex: 4;
}
input{
  margin-top: 10px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
}
.fuhao{
  font-size: 24px;
}
.btn-wrapper{
  margin-top: 10px;
  display: flex;
}
button{
  font-size: 12px;
}
.result-wrapper{
  width: 80%;
  margin: 10px auto;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px #ccc;
  background-color: #fff;
  border-radius: 10px;
}
.log-btn{
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  font-size: 14px;
  text-align: center;
  padding: 5px 0;
  color: #fff;
  background-color: #007aff;
}
</style>