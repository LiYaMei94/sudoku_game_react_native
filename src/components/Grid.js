'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  NativeModules
} from 'react-native';

import {
  StackcellSize,
  BorderWidth,
  GridWidth
} from '../utils/globalStyle'


const stack = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default class Grid extends Component {
  constructor(props){
    super(props);
    this.state={
      sudokuArr:props.sudokuArr,
      grid_inner_site:[]
    }
  }
  render() {
    const {sudokuArr}=this.props;
    //console.warn(sudokuArr)
    //{sudokuArr[parseInt(itemi + '' + itemj)]}
    return (
        <View style={styles.container} >
          {
              stack.map((itemi, i) => {
              return stack.map((itemj, j) => {
                    return (
                      <TouchableHighlight key={j} 
                          style={[styles.grid_inner,{marginRight:j==2||j==5?BorderWidth*2:0,marginBottom:i==2||i==5?BorderWidth*2:0}]}
                          onLayout={(e)=>{
                              
                          }} 
                          underlayColor='transparent'
                          onPress={(e)=>{
                              this.props.setFillSudokuSite({row:itemi,col:itemj,number:sudokuArr[parseInt(itemi + '' + itemj)]})
                          }}
                      >
                        <Text></Text>
                      </TouchableHighlight>
                    )
                  })
            })
          }
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    width: GridWidth,
    height:GridWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FEA600',
  },
  grid_outer: {
    margin: BorderWidth,
    width: StackcellSize * 3,
    height: StackcellSize * 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  grid_inner:{
    width: StackcellSize,
    height: StackcellSize,
    backgroundColor:"#FEFEDE",
    borderColor:'#FED16E',
    borderWidth: StyleSheet.hairlineWidth,
  },
 
});


