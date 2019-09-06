import {
  inArray,
  getConnect,
  arrMinus,
  getRandom,
}  from './util';

//将数独数据存入二位数组中
function getSudokuArr(){
  var backupSdArr=[];
  createSudokuArr();//创建数独
  backupSdArr = sdArr.slice();
  return backupSdArr;
}


//创建数独
function createSudokuArr(){
  try{
    sdArr = [];
    setThird(2,2);
    setThird(5,5);
    setThird(8,8);
    var allNum = [1,2,3,4,5,6,7,8,9];
    outerfor:
    for(var i=1;i<=9;i++){
      innerfor:
      for(var j=1;j<=9;j++){
        if(sdArr[parseInt(i+''+j)]){
          continue innerfor;
        }
        var XArr = getXArr(j,sdArr);
        var YArr = getYArr(i,sdArr);
        var thArr = getThArr(i,j,sdArr);
        var arr = getConnect(getConnect(XArr,YArr),thArr);
        var ableArr = arrMinus(allNum,arr);
  
        if(ableArr.length == 0){
          createSudokuArr();
          return;
          break outerfor;
        }
  
        var item;
        //如果生成的重复了就重新生成。
        do{
          item = ableArr[getRandom(ableArr.length)-1];
        }while((inArray(item, arr)>-1));
  
        sdArr[parseInt(i+''+j)] = item;
      }
    }
  }catch(e){
    createSudokuArr();
  }
}

//获取所在行的值。
function getXArr(j, SDArr) {
  var arr = [];
  for (var a = 1; a <= 9; a++) {
      if (sdArr[parseInt(a + "" + j)]) {
          arr.push(SDArr[parseInt(a + "" + j)])
      }
  }
  return arr;
}
//获取所在列的值。
function getYArr(i, sdArr) {
  var arr = [];
  for (var a = 1; a <= 9; a++) {
      if (sdArr[parseInt(i + '' + a)]) {
          arr.push(sdArr[parseInt(i + '' + a)])
      }
  }
  return arr;
}

 //获取所在三宫格的中间位坐标。
function getTh (i, j) {
  var cenArr = [22, 52, 82, 25, 55, 85, 28, 58, 88];
  var index = (Math.ceil(j / 3) - 1) * 3 + Math.ceil(i / 3) - 1;
  var cenNum = cenArr[index];
  return cenNum;
}

//获取所在三宫格的值。
function getThArr(i, j, sdArr) {
  var arr = [];
  var cenNum = getTh(i, j);
  var thIndexArr = [cenNum - 11, cenNum - 1, cenNum + 9, cenNum - 10, cenNum, cenNum + 10, cenNum - 9, cenNum + 1, cenNum + 11];
  for (var a = 0; a < 9; a++) {
      if (sdArr[thIndexArr[a]]) {
          arr.push(sdArr[thIndexArr[a]]);
      }
  }
  return arr;
}
//为对角线上的三个三宫格随机生成。
function setThird (i, j) {
  var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var sortedNumArr = numArr.sort(function () { return Math.random() - 0.5 > 0 ? -1 : 1 });
  var cenNum = parseInt(i + '' + j);
  var thIndexArr = [cenNum - 11, cenNum - 1, cenNum + 9, cenNum - 10, cenNum, cenNum + 10, cenNum - 9, cenNum + 1, cenNum + 11];
  for (var a = 0; a < 9; a++) {
      sdArr[thIndexArr[a]] = sortedNumArr[a];
  }
}

//判断用户输入的是否正确
function checkCell(arr,number,row,col){
  let backupSdArr = arr;
  //console.warn(backupSdArr)
  var allNum = [1,2,3,4,5,6,7,8,9];
  var XArr = getXArr(col, backupSdArr);
  var YArr = getYArr(row, backupSdArr);
  var thArr = getThArr(row, col, backupSdArr);
  var arr = getConnect(getConnect(XArr, YArr), thArr);
  var ableArr = arrMinus(allNum,arr);//可以填的数字
  //console.warn(XArr)
  //console.warn(YArr)
  //console.warn(thArr)
  //console.warn(arr)
  //console.warn(ableArr)
  //console.warn(number)
  if (ableArr.indexOf(number) != -1) {//在横竖小矩阵中都没找到，则填的正确
    console.warn('成功');//成功之后将填的数字放入到arr数组中
    backupSdArr[parseInt(row + '' + col)]=number;
  }else{
    console.warn('失败')
  }
  //console.warn(backupSdArr)
  return backupSdArr;
}

module.exports={
  createSudokuArr:createSudokuArr,
  getSudokuArr:getSudokuArr,
  checkCell:checkCell,
}