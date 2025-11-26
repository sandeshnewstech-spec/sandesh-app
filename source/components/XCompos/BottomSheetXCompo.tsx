import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { SharedValue } from 'react-native-reanimated';

interface P {
    ref?: any;
    snapPoints: Array<number | string> | SharedValue<Array<string | number>>;
    fixed?: boolean;
    children?: ReactNode;
}

const BottomSheetXCompo = ({ ref, snapPoints, fixed = true, children }: P) => {
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        >
            {fixed
                ? (<BottomSheetView>{children}</BottomSheetView>)
                : (<BottomSheetScrollView>{children}</BottomSheetScrollView>)
            }
        </BottomSheet >
    )
}

export default BottomSheetXCompo

const styles = StyleSheet.create({})