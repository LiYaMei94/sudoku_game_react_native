'use strict';

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

export const Size = Dimensions.get('window');

export const ScreenWidth = Size.width;

export const StackcellSize = Math.floor(ScreenWidth / 10);//每个方格的大小

export const BorderWidth = 2;//3*3方格的margin值

export const BoardWidth = StackcellSize*9+BorderWidth*2+8+10;//棋牌的宽度

export const GridWidth=StackcellSize * 9 + BorderWidth * 2+4;//格子的总宽度

export const BoardBorderWidth=(BoardWidth-GridWidth)/2;//棋牌和格子外围的宽度

export const cellFrist={pageX:(ScreenWidth-GridWidth)/2,pageY:BoardBorderWidth};

export const game_container_marginTop=40

export const Color = {

};
