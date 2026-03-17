import { StatusBar, SafeAreaView } from 'react-native'
import React, { Fragment } from 'react'
import { useThemeX } from '../../hooks';
import { statusBarType } from '../../types';

const StatusBarXCompo = ({ sbShow = true, sbColor, barStyle = 'dark-content', sbTransition }: statusBarType) => {
    const { top, col } = useThemeX();
    return (
        <Fragment>
            {sbShow && <StatusBar
                animated
                translucent={true} // ANDROID::: when its true then us can use top Insets value, if false then u can not use its value. 
                barStyle={barStyle}
                backgroundColor={col.TRANSPARENT}
                showHideTransition={sbTransition ?? 'fade'} />}
            {sbShow && <SafeAreaView style={{ height: top, backgroundColor: sbColor ?? col.TRANSPARENT }} />}
        </Fragment>
    )
}

export default StatusBarXCompo;