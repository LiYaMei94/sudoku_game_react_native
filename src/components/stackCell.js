import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  LayoutAnimation,
  UIManager
} from 'react-native';

import {
  StackcellSize,
  BoardBorderWidth,
  cellFrist,
  BoardWidth,
  BorderWidth
} from '../utils/globalStyle';

const spring = {
  duration: 700,
  update: {
    type: LayoutAnimation.Types.linear,
    springDamping: 0.8,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default class Stackcell extends Component{
    constructor(props){
        super(props);
        this.state={
          left:props.item.left,
          top:props.item.top,
        }
    }
    componentDidMount(){

    }
    //改变top和left使其放置在9*9的矩阵上
    changePosition(currentCell){
      const {item}=this.props;
      let left=0;
      let top=0;
      let borderLeft= 0;
      let borderTop=0;
      if(!currentCell){//初始值
        if(!item.isBlank){
          //console.warn(item)
          borderLeft= item.row>=6?BorderWidth*2+4:item.row>=3?BorderWidth+2:0;
          borderTop=item.col>=6?BorderWidth*2+4:item.col>=3?BorderWidth+2:0;
          left=item.row*StackcellSize+cellFrist.pageY+borderLeft;
          top=item.col*StackcellSize+cellFrist.pageY+borderTop;
        }
        item.top=top==0?item.top:top;
        item.left=left==0?item.left:left;
        LayoutAnimation.configureNext(spring);
        this.setState({
          left:item.left,
          top:item.top
        },()=>{
          if(!currentCell){
            
          }
        })
      }else{
        borderLeft= (currentCell.col-1)>=6?BorderWidth*2+4:(currentCell.col-1)>=3?BorderWidth+2:0;
        borderTop=(currentCell.row-1)>=6?BorderWidth*2+4:(currentCell.row-1)>=3?BorderWidth+2:0;
        left=(currentCell.col-1)*StackcellSize+cellFrist.pageY+borderLeft;
        top=(currentCell.row-1)*StackcellSize+cellFrist.pageY+borderTop;
        item.top=top==0?item.top:top;
        item.left=left==0?item.left:left;
        LayoutAnimation.configureNext(spring);
        this.setState({
          left:item.left,
          top:item.top
        },()=>{
          this.props.setFillSudokuSite({});
          this.props.checkResult(currentCell.number,currentCell.row,currentCell.col);
        })
      }
    }
    render(){
      const {left,top}=this.state;
      const { item } = this.props;
      return (
        <View style={[styles.Stackcell_bg,{left:left,top:top}]}>
          <TouchableHighlight style={{width:'100%',height:'100%',alignItems:"center",justifyContent:"center"}}
            onPress={()=>{
              this.props.fillSudoku(item)
            }}
          
          >
            <Text style={styles.Stackcell_text}>{item.number}</Text>
          </TouchableHighlight>
        </View>
      );
    }
    
  };
  //<Text style={styles.Stackcell_text}>{item.number}</Text>
  const styles = StyleSheet.create({
    Stackcell_bg:{
        backgroundColor:'#FEE185',
        alignItems:"center",
        justifyContent:"center",
        width:StackcellSize,
        height:StackcellSize,
        borderColor: 'orange',
        position:"absolute",
        zIndex:1,
        borderWidth: StyleSheet.hairlineWidth,//hairlineWidth:CallExpression 该用来定义当前平台最细的宽度。该属性用来设置边框或者两个组件之间的分割线
    },
    Stackcell_text:{
        color:"#AD590A",
        fontSize: StackcellSize * 2 / 3,
        fontFamily: 'HelveticaNeue',
    }
  });