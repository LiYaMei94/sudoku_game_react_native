import React, { Component } from 'react';
import { Easing, Animated,Text,StyleSheet } from "react-native";
import { createStackNavigator} from 'react-navigation-stack';


//路由文件

import Game from '../page/game'

export const router = createStackNavigator(
    {
        Game: Game,
    },
    {
        initialRouteName: "Game",
        mode: 'modal',
        defaultNavigationOptions: {
            header: null,
        },
    }
)
