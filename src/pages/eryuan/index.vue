<template>
  <view class="">
    <view class="wrapper">
      <view class="item">
        <input type="text" v-model="values.a"/>x <input type="text" v-model="values.m"/> <input type="text"  v-model="values.b"/>y = <input type="text" v-model="values.e"/><br/>
      </view>
      <view class="item">
        <input type="text" v-model="values.c"/>x <input type="text" v-model="values.n"/> <input type="text" v-model="values.d"/>y = <input type="text" v-model="values.f"/><br/>
      </view>
      <view class="item">
        <button type="primary" @click="toResult">计算</button>
      </view>
    </view>
    <view class="result-wrapper">
      <eryuanResultVue :values="results" />
    </view>
    <navigator
      url="/pages/eryuanLog/index"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      <view class="log-btn">查看记录</view>
    </navigator>
  </view>
  
</template>
<script>
import eryuanResultVue from '../../components/eryuan-result.vue';
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
let storageOrign = {}
export default {
  components: {
    eryuanResultVue
  },
  data() {
    return {
      // list: [],
      values: {
        a: '',
        b: '',
        c: '', 
        d: '',
        e: '',
        f: '',
        m: '+',
        n: '+',
      },
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
      },
      showModal: false
    }
  },
  // onLoad() {
  //   console.log(1)
  //   this.getData()
  // },
  // onShow(){
  //   console.log(2)
  //   this.getData()
  // },
  methods: {
  filter(m,b) {
    if(b < 0) {
      m === '+' ? m='-': m = '+'
      b = -b
    }
    return{
      mn: m, bd: b
    }
  },
  setStorage(a, b,c,d,e,f ,m,n) {
    // let {a, b,c,d,e,f ,m,n} = storageOrign
    let logs = uni.getStorageSync('logs') || '[]'
    logs = JSON.parse(logs)
    logs.unshift({
      a,b,c,d,e,f,m,n,id: logs.length + 1
    })
    uni.setStorageSync('logs', JSON.stringify(logs))
  },
  toResult(ev) {
    // this.setData({
    //   showModal: true
    // })
    // console.log(ev.target.dataset.value)
    // return false
    console.log(11)
    let { a, b,c,d,e,f ,m,n} = this.values
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
    this.setStorage(a, b,c,d,e,f ,m,n)
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
    this.results = resultData
  },
  }
}
</script>

<style>
.wrapper{
  margin-top: 20px;
  background: #fff;
}
.item{
  padding: 10px 0;
  vertical-align: middle;
  text-align: center;
}
input{
  margin-left: 5%;
  display: inline-block;
  width: 15%;
  border: none;
  border-bottom: 1px solid #ccc;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}
input:nth-child(4n + 1) {
  margin-left: 0;
}
.result-wrapper{
  width: 90%;
  margin: 0 auto;
  min-height: 100px;
  border: none;
  box-shadow: 0px 0px 10px 0px #ccc;
  background-color: #fff;
  border-radius: 10px;
}
button{
  margin: 10px auto;
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