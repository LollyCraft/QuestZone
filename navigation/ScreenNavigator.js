import React from 'react';
import SinglePostScreen from '../screens/SinglePostScreen';
import {createStackNavigator,createAppContainer} from 'react-navigation';

const ScreenNavigatorStack = createStackNavigator({
  SinglePost: SinglePostScreen,
});

export default ScreenNavigatorStack;
