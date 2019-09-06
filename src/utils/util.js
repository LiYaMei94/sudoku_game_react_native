//将多维数组转成一位数组
function mdArrChangeodArr(arr){
	arr=arr.join().split(',');
//	arr.map(String);//将数组中的元素转成字符串类型
//	arr=arr.map(function(item,i){//将数组中的元素转成数字类型
//		return item*1;
//	});
	return arr.map(Number);//将数组中的元素转成数字类型
}
//生成二位数组
function create_matrix_arr(){
    var arr = [];
    for(var i = 0; i < 10; ++i) {
      var columns = [];
      for(var j = 0; j < 10; ++j) {
              columns[j] = null;
      }
      arr[i] = columns;
    }
    return arr;
}
//生成随机正整数
function getRandom(n) {
    return Math.floor(Math.random() * n + 1)
}
//两个简单数组差集，arr1为大数组
function arrMinus(arr1, arr2) {
    var resArr = [], len = arr1.length;
    for (var i = 0; i < len; i++) {
        if (inArray(arr1[i], arr2) < 0) {
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}
//两个简单数组的并集。
function getConnect(arr1, arr2) {
    var i, len = arr1.length, resArr = arr2.slice();
    for (i = 0; i < len; i++) {
        if (inArray(arr1[i], arr2) < 0) {
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}
//判断ele是不是在数组arr中
function inArray(ele,arr) {
    return arr == null ? -1 : arr.indexOf(ele); 
}

//相同的合并对象
function json_merge(arr) {
	var result = {};
	var jmap = {};
	arr.forEach(function(al,index) {
		var key = al.pageY; //这里可以修改合并的key，对象的key是选择要合并的key的value值
		if(typeof jmap[key] === 'undefined') {
			jmap[index] = [];
		}
		jmap[index].push(al);
	})
	return jmap;
}

//从数组中取出随机的两个数
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

//按照二位数组的第1值从小到大排序
function descend(x,y){
    return x[0]-y[0];  
}
//使用：arr.sort(descend)
//从一个给定的数组arr中,随机返回num个不重复项
function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}
module.exports={
    mdArrChangeodArr:mdArrChangeodArr,
    create_matrix_arr:create_matrix_arr,
    inArray:inArray,
    getConnect:getConnect,
    arrMinus:arrMinus,
    getRandom:getRandom,
    json_merge:json_merge,
    getRandomArrayElements:getRandomArrayElements,
    descend:descend,
    getArrayItems:getArrayItems
}