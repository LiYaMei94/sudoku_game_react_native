import React, { Component } from 'react';
import { Easing, Animated,Text,StyleSheet } from "react-native";
import { createStackNavigator} from 'react-navigation-stack';


//路由文件

import Game from '../page/game';
import Index from '../page/index';
import Setting from '../page/setting'

export const router = createStackNavigator(
    {
        Index:Index,
        Game: Game,
        Setting:Setting
    },
    {
        initialRouteName: "Index",
        mode: 'modal',
        defaultNavigationOptions: {
            header: null,
        },
    }
)
