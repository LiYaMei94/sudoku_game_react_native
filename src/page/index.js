
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getSudokuArr} from '../utils/sudoku';
import {
    getArrayItems
} from '../utils/util';
import {
    StackcellSize,
    BoardWidth,
  } from '../utils/globalStyle'
const stack = [1, 2, 3, 4, 5, 6, 7, 8,9];
export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stackcellArr:[],
            sdArr:getSudokuArr()
        }
    }
    componentDidMount(){
        //设置数独
        this.createBlankCells();
    }
    //创建空白
    createBlankCells(){
        let backupSdArr = this.state.sdArr.slice();
        let blankArr=getArrayItems(stack,9);
        let temp=[];
        for(var i=1;i<=9;i++){
            for(var j=1;j<=9;j++){
                let isBlank=false;
                if(blankArr[i]==j){
                    isBlank=true;
                    this.state.sdArr[parseInt(i + '' + j)]=undefined;
                }
                temp[parseInt(i + '' + j)]={number:backupSdArr[parseInt(i + '' + j)],isBlank:isBlank}
            }
        }
        this.setState({
            sdArr:this.state.sdArr
        },()=>{
            //console.warn(backupSdArr)
        })
        //console.warn(sdArr)
        this._setStackcellInitArr(temp);
    }
    //设置初始牌的top和left
    _setStackcellInitArr(sudokuArr){
        let temp=[];
        for(var i=1;i<=9;i++){
            let item=[];
            for(var j=1;j<=9;j++){
                let col=0;
                let itemj=sudokuArr[parseInt(i+''+j)].number;
                let isBlank=sudokuArr[parseInt(i+''+j)].isBlank;
                col=itemj==1?0:itemj==2?1:itemj==3?2:itemj==4?3:itemj==5?4:itemj==6?5:itemj==7?6:itemj==8?7:itemj==9?8:0
                let left=BoardWidth / 9 * col + (BoardWidth / 9 - StackcellSize) / 2;
                //console.warn(itemj)
                obj={
                    left:left,
                    top:(BoardWidth+80)+i,
                    row:j-1,
                    col:i-1,
                    number:itemj,
                    isBlank:isBlank
                }
                item.push(obj);
            }
            temp.push(item);
        }
        this.setState({
            stackcellArr:temp,
        },()=>{
            //console.warn(temp)
        })
    }
  render(){
      const {stackcellArr,sdArr}=this.state;
    return (
     <View  style={styles.container}>
        <View style={styles.game_name_container}>
            <Text style={[styles.game_name_item,{transform: [{skewY:'15deg'}]}]}>数</Text>
            <Text style={[styles.game_name_item,{transform: [{skewY:'-15deg'}]}]}>独</Text>
        </View>
        <View style={styles.menu_container}>
            <TouchableHighlight
                style={styles.menu_item}
                underlayColor='#E57221'
                onPress={()=>{
                    this.props.navigation.push('Game',{sdArr:sdArr,stackcellArr:stackcellArr});
                }}
                >
                <Text style={styles.menu_item_text}>开始游戏</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.menu_item}
                underlayColor='#E57221'
                onPress={()=>{
                }}
                >
                <Text style={styles.menu_item_text}>我的成就</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.menu_item}
                underlayColor='#E57221'
                onPress={()=>{
                    this.props.navigation.push('Setting');
                }}
                >
                <Text style={styles.menu_item_text}>设置</Text>
            </TouchableHighlight>
        </View>
     </View>
    );
  }
  
};
/*
<Text style={[styles.game_name,{transform: [{skewY:'15deg'}]}]}>开</Text>
            <Text style={[styles.game_name,{transform: [{skewY:'-15deg'}]}]}>心</Text>
*/
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#444264"
    },
    game_name_container:{
        marginTop:90,
        flexDirection:"row",
        alignItems:"center"
    },
    game_name_item:{
        fontFamily:"包图小白体",
        fontSize:100,
        color:'#D68539',
        marginRight:15
    },
    menu_container:{
        marginTop:30,
        flex:1,
        paddingTop:70
    },
    menu_item:{
        width:255,
        height:40,
        backgroundColor:"#E57221",
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:25,
    },
    menu_item_text:{
        color:'#FBF3BC',
        fontSize:25,
        fontFamily:"沐瑶软笔手写体"
    }
});

