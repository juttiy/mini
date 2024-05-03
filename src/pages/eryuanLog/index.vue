<template>
  <view class="wrapper">
  <view class="no-data" v-if=" list && !list.length">暂无记录</view>
  <template v-else>
    <view class="item" v-for=" item in list" :key="item.id">
      <view class="kuo"><text decode="true">{{ letterL }}</text></view>
      <view class="shi">
        <view class="inner"> {{item.a}}x{{item.m}}{{item.b}}y={{item.e}} </view>
        <view class="inner"> {{item.c}}x{{item.n}}{{item.d}}y={{item.f}} </view>
        <!-- <view class="inner"> 3x+2y=9 </view> -->
      </view>
      <view class="btn">
        <button type="primary" @click="toResult(item)">查看</button>
      </view>
    </view>
  </template>
  <view class="resultWrapper" v-if="showModal">
    <view class="result-content">
      <eryuanResultVue :values="results" />
      <button class="cancel" type="primary" @click="closeModal">关闭</button>
    </view>
  </view>
</view>
</template>
<script>
import eryuanResultVue from '../../components/eryuan-result.vue'
function gcd(a, b) {
  if (b === 0) {
      return a;
  }
  return gcd(b, a % b);
}
function lcm(a, b) {
  a = toInt(a)
  b = toInt(b)
  return Math.abs(a * b) / gcd(a, b);
}
function toInt(cc) {
  let dd = String(cc)
  let ln = dd.split('.')[1]
  if(ln) {
    ln = ln.length
    cc = cc*(Math.pow(10, ln))
  }
  return cc
}
//判断是否整除
function toh(a, b){
  // debugger
  let tag = true
  let cc = a/b
  cc = String(cc).split('.')[1]
  if(cc && cc.length) {
    tag = false
  }
  return !tag
}
// 化简分数
function simplifyFraction(numerator, denominator) {
  numerator = toInt(numerator)
  denominator = toInt(denominator)
  // 计算两个数的最大公约数
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  const divisor = gcd(numerator, denominator);
  // 分子分母同时除以最大公约数，得到最简形式
  const simplifiedNumerator = numerator / divisor;
  const simplifiedDenominator = denominator / divisor;
  return `${simplifiedNumerator}/${simplifiedDenominator}`;
}
export default {
  components: {
    eryuanResultVue
  },
  data() {
    return {
      list: [],
    results: {
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
    },
    showModal: false,
    letterL: '{',
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
    getData() {
    // wx.removeStorageSync('logs')
    console.log(uni.getStorageSync('logs'))
    let list = uni.getStorageSync('logs') || '[]'
    list = JSON.parse(list)
    this.list = list
  },
  filter(m,b) {
    if(b < 0) {
      m === '+' ? m='-': m = '+'
      b = -b
    }
    return{
      mn: m, bd: b
    }
  },
  closeModal(){
    this.showModal = false
  },
  toResult(item) {
    this.showModal = true
    // return false
    let { a, b,c,d,e,f ,m,n} = item
    let a1 = toInt(a)
    let b1 = toInt(b)
    let e1 = toInt(e)
    let m1 = toInt(m)
    let x = 0
    let y = 0
    let resultData = {}
    if (!(a&&b&&c&&d&&e&&f)) {
      uni.showToast({
        title: '输入数据有误，请确保所有数字全部输入以及所有输入全为大于0的数字',
        icon: 'error',
        duration: 2000
      })
      console.log('输入数据有误，请确保所有数字全部输入以及所有输入全为大于0的数字')
      return false
    }
    if ((n!=='+' && n!=='-') || (n!=='+' && n!=='-')) {
      uni.showToast({
        title: '输入的运算符有误，请输入+或者-',
        icon: 'error',
        duration: 2000
      })
      console.log('输入的运算符有误，请输入+或者-')
      return false
    }
    
    console.log(b, b<0)
    if(b < 0) {
      console.log(m)
      m === '+'? m = '-' : m = "+"
      console.log(m)
      b = -b
    }
    if(d < 0) {
      n === '+'? n = '-' : n = "+"
      d = -d
    }
    // this.setStorage(a, b,c,d,e,f ,m,n)
    resultData.line1='(1):' + `${a}x${m}${b}y=${e}`
    resultData.line2='(2):' + `${c}x${n}${d}y=${f}`
    console.log('(1):' + `${a}x${m}${b}y=${e}`)
    console.log('(2):' + `${c}x${n}${d}y=${f}`)
    var k = lcm(a,c)
    var j = lcm(b,d)
    var g = Math.abs(k/a)
    var h = Math.abs(k/c)
    if(Math.abs(k) > Math.abs(j) && toInt(c) === c && toInt(c) === c) {
      g = Math.abs(j/b)
      h = Math.abs(j/d)
    }
    g = Math.floor(g)
    h = Math.floor(h)
    a = a * g
    b = b * g
    c = c * h
    d = d * h
    e = e * g
    f = f * h
    // debugger
    resultData.line3 = `(1)式乘以${g},(2)式乘以${h}得：`
    resultData.line4='(1):' + `${a}x${m}${b}y=${e}`
    resultData.line5='(2):' + `${c}x${n}${d}y=${f}`
    console.log('(1):' + `${a}x${m}${b}y=${e}`)
    console.log('(2):' + `${c}x${n}${d}y=${f}`)
    let o = 0
    let p = 0
    let q = 0
    // if (m === '-') {
    //   b = -b
    // }
    // if(n === '-') {
    //   d = -d
    // }
    if ((m !== n && b === d) || (a + c === 0)) {
      resultData.line6 = `(1)+(2)得:`
      o = a + c
      p = b + d
      q = e + f
    }else{
      resultData.line6 = `(1)-(2)得:`
      console.log(b, d)
      o = a - c
      p = b - d
      q = e - f
    }
    // if(a + c === 0) {
    //   o = 0
    //   if(m === '-')
    // }
    // if (m === '-' && n === '-') {
    //   p = (-b) - (-d)
    // }
    console.log(o, p, '111')
    if ( o === 0) {
      resultData.isX = false
      resultData.line7 = `${p}y = ${q}`
      console.log(`${p}y = ${q}`)
      // debugger
      if(toh(q,p)) {
        y = simplifyFraction(q, p)
        resultData.line8 = '继续得：'
        resultData.line9 = `y = ${y}`
        console.log(`y = ${y}`)
        q = Number(y.split('/')[0])
        p = Number(y.split('/')[1])
        if(p < 0) {
          p = -p
          q = -q
        }
        resultData.line10 = '将y值代入(1)式得:'
        resultData.line11 = `${a1}x${m1}(${b1}*${y})=${e1}`
        console.log(`${a1}x${m1}(${b1}*${y})=${e1}`)
        let ggA = e1*p - b1*q
        let ggB = p
        if (m1 === '-') {
          ggA = e1*p + b1*q
        }
        resultData.line12 = '继续解得：'
        resultData.line13 = `${a1}x=${ggA}/${ggB}`
        console.log(`${a1}x=${ggA}/${ggB}`)
        ggB = ggB * a1
        if(toh(ggA,ggB)){
          x = simplifyFraction(ggA, ggB)
        }else{
          x = ggA/ggB
        }
        resultData.line14 = '继续得：'
        resultData.line15 = `x = ${x}`
        console.log(`x = ${x}`)
      } else {
        y = q/p
        resultData.line8 = '继续得：'
        resultData.line9 = `y = ${y}`
        console.log(`y = ${y}`)
        resultData.line10 = '将y值代入(1)式得:'
        resultData.line11 = `${a1}x${m1}(${b1}*${y})=${e1}`
        console.log(`${a1}x${m1}(${b1}*${y})=${e1}`)
        let gg = e1 - (b1*y)
        if(m1 === '-') {
          gg = e1 + b1*y
        }
        // debugger
        resultData.line12 = '继续解得：'
        resultData.line13 = `${a1}x=${gg}`
        console.log(`${a1}x=${gg}`)
        // if(gg%a1 !== 0) {
        if(toh(gg, a1)){
          x = simplifyFraction(gg, a1)
          
        } else {
          x = gg/a1
        }
        resultData.line14 = '继续得：'
        resultData.line15 = `x = ${x}`
        console.log(`x = ${x}`)
        // console.log(`x =`)
      }
      
      // console.log(`${p}y = ${q}`)
      



      // x = 
    } else {
      resultData.isX = true
      resultData.line7 = `${o}x = ${q}`
      console.log(`${o}x = ${q}`)
      // if(q%o !== 0) {
      if(toh(q,o)) {
        x = simplifyFraction(q, o)
        resultData.line8 = '继续得：'
        resultData.line9 = `x = ${x}`
        console.log(`x = ${x}`)
        q = Number(x.split('/')[0])
        o = Number(x.split('/')[1])
        if(o < 0) {
          q = -q
          o = -o
        }
        resultData.line10 = '将x值代入(1)式得:'
        resultData.line11 = `${a1}*${x}${m1}${b1}y=${e1}`
        console.log(`${a1}*${x}${m1}${b1}y=${e1}`)
        let ggA = e1*o - a1*q
        let ggB = o
        // if (m1 === '-') {
        //   ggA = e1*o + b1*q
        // }
        if(m1 === '-') {
          b1 = -b1
        }
        resultData.line12 = '继续解得：'
        resultData.line13 = `${b1}y=${ggA}/${ggB}`
        console.log(`${b1}y=${ggA}/${ggB}`)
        ggB = ggB * b1
        // if(ggA%ggB !== 0){
          if(toh(ggA, ggB)){
          y = simplifyFraction(ggA, ggB)
        }else{
          y = ggA/ggB
        }
        resultData.line14 = '继续得：'
        resultData.line15 = `y = ${y}`
        console.log(`y = ${y}`)
      } else {
        x = q/o
        resultData.line8 = '继续得：'
        resultData.line9 = `x = ${x}`
        console.log(`x = ${x}`)
        resultData.line10 = '将x值代入(1)式得:'
        resultData.line11 = `(${a1}*${x})${m1}${b1}y=${e1}`
        console.log(`(${a1}*${x})${m1}${b1}y=${e1}`)
        let gg = e1 - (a1*x)
        resultData.line12 = '继续解得：'
        resultData.line13 = `${m1}${b1}y=${gg}`
        console.log(`${m1}${b1}y=${gg}`)
        if(m1 === '-') {
          b1 = -b1
        }
        // if(gg%b1 !== 0) {
        if(toh(gg, b1)) {
          y = simplifyFraction(gg, b1)
        } else{
          y = gg / b1
        }
        resultData.line14 = '继续得：'
        resultData.line15 = `y = ${y}`
        console.log(`y = ${y}`)
      }
      // x= q/o
      // console.log(`${0}x = ${q}`)
      // console.log(`x = ${x}`)
      

    }
    console.log(resultData)
    this.results = resultData
  },
  }
}
</script>
<style>
.no-data{
  margin: 100px auto;
  width: 100%;
  text-align: center;
}
.item{
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

.resultWrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
.result-content{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 4px 4px 15px #ccc;
  border-radius: 20px;
}
.cancel{
  margin-top: 10px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>