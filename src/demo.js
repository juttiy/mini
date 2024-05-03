function toRowEchelonForm(matrix) {
  let lead = 0;
  debugger
  for (let r = 0; r < matrix.length; r++) {
      if (matrix[0].length <= lead) {
          return;
      }
      let i = r;
      while (matrix[i][lead] === 0) {
          i++;
          if (matrix.length === i) {
              i = r;
              lead++;
              if (matrix[0].length === lead) {
                  return;
              }
          }
      }
      [matrix[i], matrix[r]] = [matrix[r], matrix[i]];
      let val = matrix[r][lead];
      for (let j = 0; j < matrix[0].length; j++) {
          matrix[r][j] /= val;
      }
      for (let i = 0; i < matrix.length; i++) {
          if (i === r) continue;
          val = matrix[i][lead];
          for (let j = 0; j < matrix[0].length; j++) {
              matrix[i][j] -= val * matrix[r][j];
          }
      }
      lead++;
  }
  return matrix;
}
function rowEchelonForm(matrix) {
  const rowCount = matrix.length;
  const columnCount = matrix[0].length;
  let lead = 0;

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
      }
      [matrix[i], matrix[r]] = [matrix[r], matrix[i]]; // 交换两行
      let lv = matrix[r][lead];
      if(r !== 0 || r !== 1){
        console.log(`r${r+1}*${lv}`)
      }
      for (let j = 0; j < columnCount; j++) {
          matrix[r][j] /= lv; // 倍乘行
      }
      for (let i = 0; i < rowCount; i++) {
          if (i !== r) {
              lv = matrix[i][lead];
              console.log(`r${r+1} - r${i+1}*${lv}`);
              for (let j = 0; j < columnCount; j++) {
                  matrix[i][j] -= lv * matrix[r][j]; // 倍加行
              }
          }
      }
      lead++;
      console.log('得：');
      matrix.forEach(item => console.log(item));
  }
  return matrix;
}
function calMax(A) {
  // const A = JSON.parse(JSON.stringify(this.A))
  const n = A.length;
  for (let i = 0; i < n; i++) {
    // 消元，将矩阵化简为上三角形式
    let j = i + 1
    for (j; j < n; j++) {
        // 被除数不能为0，每次运算时，必须保证对角线上的元素不为0（即运算中的分母不为0）
        let coef = parseInt(A[j][i]) / parseInt(A[i][i]);
        let coef1 = coef // 系数
        if(Math.abs(coef) >=1) {
          console.log(`α${j+1} - α${i+1}乘以${coef}`)
        } else {
          coef = parseInt(A[i][i]) / parseInt(A[j][i])
          console.log(`α${j+1}乘以${coef} - α${i+1}`)
        }
        
        A[j].forEach((val, idx) => {
          A[j][idx] = parseInt(A[j][idx])
          if(Math.abs(coef1) > 1) {
            A[j][idx] -= parseInt(A[i][idx]) * coef;
          } else {
            A[j][idx] = A[j][idx] * coef - parseInt(A[i][idx])
          }
        });
    }
    console.log('得：')
    A.forEach(a => console.log(a.join(',')))
  }
}
const determinant = m => {
  if (m.length === 1) {
      return m[0][0];
  } else if (m.length === 2) {
      return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else {
      return m[0].reduce((result, e, i) =>
          result + (-1) ** (i + 2) * e * determinant(m.slice(1).map(c =>
              c.filter((_, j) => i !== j))), 0);
  }
};
const A = [
  [1,1,2,3,0],
  [-1,-1,1,0,3],
  [2,2,5,7,1],
  [4,0,6,14,2]
];
const b = rowEchelonForm(A)
// const c = toRowEchelonForm(A)