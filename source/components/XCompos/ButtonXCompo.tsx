import React from 'react'
import { PressableScaleXCompoProps } from '../../Types'
import { useThemeX } from '../../hooks'
import { Size } from '../../functions'
import { btnHeight, btnRadius } from '../../utils'
import PressableScaleXCompo from './PressableScaleXCompo'

const ButtonXCompo = (porps: PressableScaleXCompoProps & { transparent?: boolean }) => {
    const { transparent } = porps;
    const { col, font } = useThemeX();
    return (<PressableScaleXCompo
        rippleColor={col.WHITE03}
        {...porps}
        tSty={{
            color: transparent ? col.BTN_BGCOL : col.BTN_TEXT_COL,
            fontFamily: font.BOLD,
            fontSize: Size(15),
            ...porps?.tSty,
        }}
        style={{
            height: btnHeight, width: "100%",
            overflow: 'hidden', borderRadius: btnRadius,
            backgroundColor: transparent ? col?.TRANSPARENT : col.BTN_BGCOL,
            // borderWidth: 1,
            // borderColor: col.BTN_BGCOL,
            justifyContent: 'center',
            alignItems: 'center',
            ...porps?.style,
        }}
    />)
}

export default ButtonXCompo;