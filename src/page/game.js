import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity ,
} from 'react-native';
import {
    StackcellSize,
    BoardWidth,
    GridWidth,
    BoardBorderWidth,
    game_container_marginTop,
    cellFrist,
    BorderWidth
  } from '../utils/globalStyle'
import  Stackcell from '../components/stackCell';
import Grid from '../components/Grid';
import {getSudokuArr,checkCell} from '../utils/sudoku';
import {
    getArrayItems
} from '../utils/util';
const stack = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export default class Game extends Component{
    stacks = stack.map(x => new Array(9))
    blankArr=getArrayItems(stack,9);
    constructor(props){
        super(props);
        this.state={
            sudokuArr:[],
            sdArr:getSudokuArr(),
            stackcellDealArr:[],
            stackcellArr:[],
            cellActive:{}
        }
    }
    
    componentDidMount(){
        //console.warn(this.state.sdArr)
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
            sudokuArr:temp,
            sdArr:this.state.sdArr
        },()=>{
            //console.warn(this.state.sdArr)
        })
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
            //console.warn(sdArr)
        })
    }
    //游戏开始
    _setDeal(){
        let {stackcellArr}=this.state;
        const that=this;
        for(var i=0;i<stackcellArr.length;i++){
            (function(i) {
                setTimeout(function() {
                    for(var j=0;j<stackcellArr[i].length;j++){
                        (function(j) {
                            setTimeout(function() {
                                that.stacks[i][j].changePosition();
                            }, (j + 1) * 800);
                        })(j)
                    }
                }, (i + 1) * 200);
            })(i)
        }
      
    }
    //确定点击选择的格子的
    setFillSudokuSite(cell){
        this.setState({
            cellActive:cell
        })
    }
    
    //出现遮罩
    showMask(){
        let {cellActive}=this.state;
        if(JSON.stringify(cellActive)!='{}'){
            let borderLeft= (cellActive.col-1)>=6?BorderWidth*4:(cellActive.col-1)>=3?BorderWidth*2:0;
            let borderTop=(cellActive.row-1)>=6?BorderWidth*4:(cellActive.row-1)>=3?BorderWidth*2:0;
            let top=(cellActive.row-1)*StackcellSize+borderTop;
            let left=(cellActive.col-1)*StackcellSize+borderLeft;
            return (
               <View style={[styles.mask_container]}>
                    <View style={[styles.active,styles.row_active,{top:top}]}></View>
                    <View style={[styles.active,styles.col_active,{left:left}]}></View>
               </View>
            )
        }else{
            return null;
        }
       
        //<View style={[styles.inner_active,]}></View>
    }
    //点击下放的数字写入点击的空格位置
    fillSudoku(item){
        let {cellActive}=this.state;
        cellActive.number=item.number;
        //console.warn(cellActive)
        this.stacks[item.row][item.col].changePosition(cellActive);
    }
    //检查放入的数独是否正确
    checkResult(number,row,col){
        //console.warn(number,row,col)
        this.setState({
            sdArr:checkCell(this.state.sdArr,number,row,col)
        },()=>{
            console.warn(this.state.sdArr)
        })
    }
    render(){
        const {stackcellArr,sdArr}=this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.game_container}>
                    <View style={styles.sudoku_board}>
                        <Grid sudokuArr={sdArr} gridPosition={this.gridPosition} setFillSudokuSite={this.setFillSudokuSite.bind(this)}></Grid>
                    </View>
                    {
                        stackcellArr.map((itemi,i)=>{
                            return itemi.map((itemj,j)=>{
                                return (
                                <Stackcell ref={ref => this.stacks[j][i] = ref}  key={i+'-'+j} 
                                    item={itemj}  fillSudoku={this.fillSudoku.bind(this)} 
                                    checkResult={this.checkResult.bind(this)}
                                    setFillSudokuSite={this.setFillSudokuSite.bind(this)}/>
                                )
                            })
                        })
                    }
                    {
                        this.showMask()
                    }
                </View>
                <TouchableOpacity  style={styles.gameStart}  
                    onPress={this._setDeal.bind(this)}>
                    <Text>点击发牌</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
    
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#5D9DA0',
        alignItems:"center",
        
    },
    game_container:{
        width:BoardWidth,
        position:"relative",
        alignItems:"center",
        marginTop:game_container_marginTop,
    },
    sudoku_board:{
        backgroundColor:'#FEA600',
        width:BoardWidth,
        height:BoardWidth,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center"
    },
    gameStart:{
        marginTop:160,
        alignItems:"center",
        justifyContent:"center",
        width:80,
        height:35,
        backgroundColor:"#FEA600"
    },
    active:{
        borderColor:'#FFF507',
        zIndex:2,
        backgroundColor:'#AC570B',
        opacity:0.5,
        position:"absolute"
    },
    inner_active:{
        width:StackcellSize*2,
        height:StackcellSize*2,
        zIndex:2,
        backgroundColor:'#AC570B',
        opacity:0.5,
        position:"absolute",
        top:StackcellSize,
        left:StackcellSize
    },
    row_active:{
        width:GridWidth,
        height:StackcellSize,
        left:0
    },
    col_active:{
        height:GridWidth,
        width:StackcellSize,
        top:0
    },
    mask_container:{
        width:GridWidth,
        height:GridWidth,
        position:"absolute",
        top:cellFrist.pageY,
        left:cellFrist.pageY,
        //backgroundColor:'red'
    }
});