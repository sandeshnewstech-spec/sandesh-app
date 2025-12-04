import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonX, MasterView } from 'components'

const HomeController = ({ }) => {

    return (
        <MasterView title='hellow' >
            <View style={{ padding: 10 }}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <View key={i} style={{ height: 100, marginBottom: 10, backgroundColor: 'red' }}>
                        <Text>Item {i + 1}</Text>
                    </View>
                ))}
            </View>
            <ButtonX text='Click Me' />
        </MasterView>
    )
}

export default HomeController