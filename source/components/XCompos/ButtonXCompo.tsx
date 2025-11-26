import React, { memo } from 'react'
import { PressXType } from '../../Types'
import { useThemeX } from '../../hooks'
import { Size } from '../../functions'
import PressXCompo from './PressXCompo'
import { btnRadius } from '../../utils'

const ButtonXCompo = (porps: PressXType & { transparent?: boolean }) => {
    const { transparent } = porps;
    const { col, font } = useThemeX();
    return (<PressXCompo
        {...porps}
        tSty={{
            color: transparent ? col.BTN_BGCOL : col.BTN_TEXT_COL,
            fontFamily: font.BOLD,
            fontSize: Size(15),
            ...porps?.tSty,
        }}
        cSty={{
            flex: 1,
            borderWidth: 1,
            borderColor: col.BTN_BGCOL,
            borderRadius: btnRadius,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: transparent ? col?.TRANSPARENT : col.BTN_BGCOL,
            ...porps?.cSty
        }}
        mSty={{ height: 55, flex: 1, ...porps?.mSty }}
    />)
}

export default memo(ButtonXCompo);