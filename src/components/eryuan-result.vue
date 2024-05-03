<template>
  <view class="result-wrapper">
  <text >过程: </text>
  <view class="result" v-if=" values && values.line1">
    <view>{{ values.line1 }}</view>
    <view>{{ values.line2 }}</view>
    <view>{{ values.line3 }}</view>
    <view>{{ values.line4 }}</view>
    <view>{{ values.line5 }}</view>
    <view>{{ values.line6 }}</view>
    <view>{{ values.line7 }}</view>
    <view>{{ values.line8 }}</view>
    <view>{{ values.line9 }}</view>
    <view>{{ values.line10 }}</view>
    <view>{{ values.line11 }}</view>
    <view>{{ values.line12 }}</view>
    <view>{{ values.line13 }}</view>
    <view>{{ values.line14 }}</view>
    <view>{{ values.line15 }}</view>
    <template v-if=" values && values.isX">
      <view >最终得：</view>
      <view>{{ values.line9 }}</view>
      <view>{{ values.line15 }}</view>
    </template>
    <template v-else>
      <view >最终得: </view>
      <view>{{ values.line15 }}</view>
      <view>{{ values.line9 }}</view>
    </template>
  </view>
</view>
</template>
<script>
export default {
  props: {
    values: {
      // type: Object,
      default: {
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        line5: '',
        line6: '',
        line7: '',
        line8: '',
        line9: '',
        line10: '',
        line11: '',
        line12: '',
        line13: '',
        line14: '',
        line15: '',
        isX: false
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.result-wrapper{
  margin: 0 auto;
  /* width: 100%; */
  padding: 10px 20px;
  transition: all .3s;
  /* background-color: red; */
}
.result{
  padding: 20px;
}
</style>