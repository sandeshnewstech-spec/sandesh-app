import React from 'react'
import CustomizeBottomTabBar from './CustomizeBottomTabBar'
import { BottomTabStack } from '../utils'
import { ListAllTaskScr } from '../screens'
import { StackProps } from '../types'

/** Bottom Tab Navigator */
const BottomTab = ({ }: StackProps<'BottomTab'>) => {

    return (
        <BottomTabStack.Navigator
            tabBar={props => <CustomizeBottomTabBar {...props} />}
            screenOptions={{ headerShown: false }}>
            <BottomTabStack.Screen
                name='FriendsListingScr'
                component={ListAllTaskScr}
                initialParams={{ tabScr: true }} />
        </BottomTabStack.Navigator>)
}

export default BottomTab