import { StyleSheet } from 'react-native'
import React from 'react'
import { ButtonX, MasterView, PressX } from '../components'
import { useThemeX } from '../hooks'
import { defStyObjType } from '../types'

const HomeController = () => {

    const { defStyOBJ } = useThemeX();
    const sty = styFN(defStyOBJ);

    return (
        <MasterView title="DefStructure" backBtn={false} >
            <PressX text="Hello" />
            <ButtonX text="Hello" />
        </MasterView>
    )
}

export default HomeController

const styFN = ({ }: defStyObjType) => StyleSheet.create({

})