<template>
  <view class="wrapper">
    <view class="wrapper" v-if="type === 'max'">
      <text>过程及结果：</text>
      <text>化简矩阵</text>
      <view class="result">
        <template v-for="item in results">
          <view class="label" v-if="isString(item)" key="item">{{item}}<text v-if="item.indexOf('：') < 0">,</text></view>
          <view v-else :key="item" class="num-wrapper">
            <view class="num" v-for="val in item" :key='val'>{{val}}</view>
          </view>
        </template>
      </view>
      <text></text>
      <view v-if="aa && aa.length">
        <text>由此可得：</text>
        <text>最大无关组为：
          <text v-for="c in aa" :key="c">α{{c + 1}},</text>
        </text>
        <text>矩阵的秩为：{{ aa && aa.length }}</text>
      </view>
    </view>
    <view v-else-if="type === 'zhi'" class="wrapper">
      <text>过程及结果：</text>
      <view class="result">
        矩阵的行列式计算：{{zhi}} = {{result}}
      </view>
    </view>
  </view>
</template>
<script>
// import { isString } from '@dcloudio/uni-i18n'


export default {
  props: {
    num: {
      type: String
    },
    A: {
      type: Array
    },
    notStorage: {
      type: Boolean
    }
  },
  data() {
    return {
      results: [],
      aa: [],
      type: 'max',
      zhi: '',
      result: 0,
      typeStr: '',
      juStr: '',
    }
  },
  methods: {
    isString(val) {
      return typeof val === 'string'
    },
    setStorage() {
    // let {a, b,c,d,e,f ,m,n} = storageOrign
      let str = JSON.stringify(this.A)
      if(str === this.juStr && this.typeStr === this.type || this.notStorage) {
        return false
      }
      this.juStr = str
      this.typeStr = this.type
      let logs = uni.getStorageSync(this.type) || '[]'
      logs = JSON.parse(logs)
      logs.unshift([
        ...this.A
      ])
      uni.setStorageSync(this.type, JSON.stringify(logs))
    },
    handleCal(type) {
      
      if(type === 'max') {
        // console.log(JSON.stringify(this.A))
        let ln = this.A[0]?.length || 0
        let target = false
        this.A.forEach(item => {
          if(item.length !== ln) target = true
        })
        if(this.A.length < 2 || target) {
          uni.showToast({
            title: '请输入正确的矩阵',
            icon: 'error',
            mask: false
          })
          return false
        } else {
          // console.log(this.A)
          this.type = type
          this.calMax()
        }
      } else if(type === 'zhi') {
        // debugger
        let ln = this.A?.length || 0
        let target = false
        this.A.forEach(item => {
          if(item.length !== ln) target = true
        })
        if(ln > 3 || target || ln < 1) {
          uni.showToast({
            title: '请输入n*n的矩阵,并且n不大于3',
            icon: 'error',
            mask: false
          })
        } else {
          this.type = type
          this.calZhi()
        }
        
      }
    },
    calZhi(){
      const m = JSON.parse(JSON.stringify(this.A));
      let result = 0
      if (m.length === 1) {
        result = m[0][0];
        this.zhi = `a11`
      } else if (m.length === 2) {
          result = m[0][0] * m[1][1] - m[0][1] * m[1][0];
          this.zhi = `a11*a22 - a12*a21 = ${m[0][0]}*${m[1][1]} - ${m[0][1]}*${m[1][0]}`
      } else {
          result = m[0][0] * m[1][1] * m[2][2] + m[0][1] * m[1][2] * m[2][0] + m[0][2] * m[1][0] * m[2][1]  -
          m[0][2] * m[1][1] * m[2][0] - m[0][0] * m[1][2] * m[2][1] - m[0][1] * m[1][0] * m[2][2];
          this.zhi = `a11*a22*a33 + a12*a23*a31 + a13*a21*a32 - a13*a22*a31 - a11*a23*a32 - a12*a21*a33
          =${m[0][0]} * ${m[1][1]} * ${m[2][2]} + ${m[0][1]}* ${m[1][2]} * ${m[2][0]} + ${m[0][2]} * ${m[1][0]} * ${m[2][1]}  -
          ${m[0][2]} * ${m[1][1]} * ${m[2][0]} - ${m[0][0] }* ${m[1][2]} * ${m[2][1]} - ${m[0][1]} * ${m[1][0]} * ${m[2][2]}`
      }
      this.result = result
      this.setStorage()
    },
    calMax() {
      this.results = []
      const matrix = JSON.parse(JSON.stringify(this.A))
      const rowCount = matrix.length;
  const columnCount = matrix[0].length;
  let lead = 0;
  console.log(2222)
  for (let r = 0; r < rowCount; r++) {
      if (lead >= columnCount) {
          return matrix;
      }
      let i = r;
      while (matrix[i][lead] === 0) {
          i++;
          if (i === rowCount) {
              i = r;
              lead++;
              if (lead === columnCount) {
                  return matrix;
              }
          }
      }
      if( r !== i) {
        console.log(`交换r${i+1},r${r+1}两行`);
        this.results.push(`交换r${i+1},r${r+1}两行`)
      }
      [matrix[i], matrix[r]] = [matrix[r], matrix[i]]; // 交换两行
      let lv = matrix[r][lead];
      if(lv !== 0 && lv !== 1){
        console.log(`r${r+1}${lv}`)
        this.results.push(`r${r+1}/${lv}`)
      }
      for (let j = 0; j < columnCount; j++) {
          matrix[r][j] /= lv; // 倍乘行
      }
      for (let i = 0; i < rowCount; i++) {
          if (i !== r) {
              lv = matrix[i][lead];
              console.log(`r${i+1} - r${r+1}*${lv}`);
              this.results.push(`r${i+1} - r${r+1}*${lv}`)
              for (let j = 0; j < columnCount; j++) {
                  matrix[i][j] -= lv * matrix[r][j]; // 倍加行
              }
          }
      }
      lead++;
      console.log('得：');
      this.results.push('得：')
      matrix.forEach(item => {
        console.log(item)
        this.results.push([...item])
        
      });
      console.log(matrix)
      this.getRe(matrix)
      this.setStorage()
      // this.results.push(matrix)
      }
      // console.log(11111)
      // console.log(matrix, 11111)
      // this.getRe(matrix)
      // return matrix;
    },
    getRe(matrix){
      // console.log(matrix)
      let cc = [];
      // debugger
      matrix.forEach((item, index) => {
        if(item[index] !== 0) {
          cc.push(index);
        }
      })
      this.aa = cc
    }
  },
  filters: {
    isString(val) {
      return typeof val === 'string'
    }
  }
}
</script>
<style>
.wrapper{
  min-height: 100px;
  background-color: #fff;
}
.label{
  margin: 10px auto;
  display: inline-block;
}
.num{
  display: inline-block;
  /* width: 40px; */
  flex: 1;
  text-align: center;
}
.num-wrapper{
  padding: 5px;
  display: flex;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>
