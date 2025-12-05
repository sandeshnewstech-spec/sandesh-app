import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { defStyObjType } from 'types'
import { useThemeX } from 'hooks'

const HomePageCompo = () => {
    const { defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);
    return (<View style={style.mainSty} >
        <ScrollView
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll>
            <View style={{ backgroundColor: 'red', height: 100 }} >
            </View>
        </ScrollView>
    </View>)
}

export default HomePageCompo

const styleFN = ({ col, font }: defStyObjType) => StyleSheet.create({

    mainSty: {
        flex: 1
    }

});