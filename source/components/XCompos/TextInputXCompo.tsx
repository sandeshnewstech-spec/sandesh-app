import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useThemeX } from '../../hooks';
import { TextInputXType, defStyObjType } from '../../Types';
import { Size } from '../../functions';
import PressXCompo from './PressXCompo';
import TextXCompo from './TextXCompo';
import Animated from 'react-native-reanimated';
// import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { isANDROID } from '../../utils';

const TextInputXCompo = ({
    onBlur, reff, phNm, text, lines, onChangeT, onSubEdit, rKeyType, kbType,
    autoComplete, autoCorrect, sTxtEntry, multiline, BSInput = false, inputSty = {},
    textContentType, pointerEvents, readOnly, onLayout,
    mSty, onFocus, onPressIn, labelNM, editable,
    lbl_LChild, lbl_RChild, lbl_LSvg, lbl_RSvg, lbl_cSty,
    ip_LSvg, ip_RSvg,
    topSvg, bottomSvg, maxLength,
    lBtn, lBtn_text, lBtn_tSty, lBtn_mSty, lBtn_cSty, lBtnDis, lBtnPress, lBtn_loader,
    rBtn, rBtn_text, rBtn_tSty, rBtn_mSty, rBtn_cSty, rBtnDis, rBtnPress, rBtn_loader,
    inputBox, autoCapitalize = 'none', lBtnNode, rBtnNode, onBoxLayout,
}: TextInputXType) => {

    const { col, font, cpSty, defStyOBJ } = useThemeX();
    const sty = styFN(defStyOBJ);

    const textSty: any = inputSty;

    const BottomSheetTextInput: any = <></>;

    return (
        <Animated.View style={[sty.container]} onLayout={onBoxLayout} >
            {topSvg && topSvg}
            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 1 }}>

                    {labelNM && <Animated.View style={[sty.lable_Container, lbl_cSty]} >
                        {lbl_LSvg && lbl_LSvg}
                        <TextXCompo
                            text={labelNM}
                            lChild={lbl_LChild}
                            rChild={lbl_RChild}
                            tSty={sty.lable_tSty} />
                        {lbl_RSvg && lbl_RSvg}
                    </Animated.View>}

                    <View style={[sty.mSty, mSty]}>
                        {lBtnNode && lBtnNode}
                        {/* {lBtn && <View children={lBtn} style={sty.lBtn} />} */}
                        {(lBtn || lBtn_text || lBtn_loader) && <PressXCompo
                            children={lBtn}
                            disabled={lBtnDis}
                            onPress={lBtnPress}
                            loading={lBtn_loader}
                            mSty={{ ...sty.lBtn_mSty, ...lBtn_mSty }}
                            cSty={{ ...sty.lBtn_cSty, ...lBtn_cSty }}
                            tSty={lBtn_tSty}
                            text={lBtn_text}
                            pStyIdx={2}
                        />}

                        {readOnly
                            ? (<TextXCompo
                                lines={1} onLayout={onLayout}
                                text={(!text || text?.length === 0) ? phNm : text}
                                tSty={{
                                    ...cpSty.inputSty1,
                                    color: (!text || text?.length === 0) ? col.INPUT_TEXT_PH_COL : cpSty.inputSty1?.color,
                                    ...textSty,
                                }}
                            />)
                            : inputBox ? inputBox : (
                                BSInput
                                    ? (<BottomSheetTextInput
                                        onLayout={onLayout}
                                        ref={reff}
                                        value={text}
                                        onChangeText={onChangeT}
                                        placeholderTextColor={col.INPUT_TEXT_PH_COL}
                                        placeholder={phNm}
                                        allowFontScaling={false}
                                        blurOnSubmit={rKeyType === 'done' ? true : false}
                                        numberOfLines={lines}
                                        onSubmitEditing={onSubEdit}
                                        returnKeyType={rKeyType}
                                        onBlur={onBlur}
                                        keyboardType={kbType}
                                        autoCorrect={autoCorrect}
                                        autoCapitalize={autoCapitalize}
                                        autoComplete={autoComplete}
                                        textContentType={textContentType}
                                        onFocus={onFocus}
                                        onPressIn={onPressIn}
                                        secureTextEntry={sTxtEntry}
                                        multiline={multiline}
                                        pointerEvents={pointerEvents}
                                        readOnly={readOnly}
                                        maxLength={maxLength}
                                        style={[
                                            // sty.inputSty,
                                            cpSty.inputSty1,
                                            {
                                                // textAlignVertical: multiline ? 'top' : undefined,
                                                verticalAlign: multiline ? 'top' : undefined,
                                                // textAlignVertical: multiline ? 'bottom' : undefined,
                                                // verticalAlign: multiline ? 'bottom' : undefined,
                                            },
                                            inputSty]}
                                        editable={editable} />)
                                    : (<TextInput
                                        onLayout={onLayout}
                                        ref={reff}
                                        value={text}
                                        onChangeText={onChangeT}
                                        placeholderTextColor={col.INPUT_TEXT_PH_COL}
                                        placeholder={phNm}
                                        allowFontScaling={false}
                                        blurOnSubmit={rKeyType === 'done' ? true : false}
                                        numberOfLines={lines}
                                        onSubmitEditing={onSubEdit}
                                        returnKeyType={rKeyType}
                                        onBlur={onBlur}
                                        keyboardType={kbType}
                                        // textBreakStrategy='highQuality'
                                        // lineBreakStrategyIOS='standard'
                                        autoCorrect={autoCorrect}
                                        autoCapitalize={autoCapitalize}
                                        autoComplete={autoComplete}
                                        textContentType={textContentType}
                                        onFocus={onFocus}
                                        onPressIn={onPressIn}
                                        secureTextEntry={sTxtEntry}
                                        multiline={multiline}
                                        pointerEvents={pointerEvents}
                                        readOnly={readOnly}
                                        maxLength={maxLength}
                                        style={[
                                            cpSty.inputSty1,
                                            {
                                                verticalAlign: (multiline && isANDROID) ? 'top' : undefined,
                                                flex: 1,
                                            },
                                            inputSty]}
                                        editable={editable}
                                    />))}
                        {/* {ip_LSvg && <View style={sty.rBtn} >{rBtn}</View>} */}
                        {ip_LSvg && <PressXCompo
                            children={ip_LSvg}
                            disabled={rBtnDis}
                            onPress={rBtnPress}
                            cSty={sty.rBtn_cSty} />}
                        {rBtnNode && rBtnNode}
                    </View>
                </View>
                {(rBtn || rBtn_text || rBtn_loader) && <PressXCompo
                    children={rBtn}
                    disabled={rBtnDis}
                    dStyIdx={0}
                    onPress={rBtnPress}
                    loading={rBtn_loader}
                    mSty={{ ...sty.rBtn_mSty, ...rBtn_mSty }}
                    cSty={{ ...sty.rBtn_cSty, ...rBtn_cSty }}
                    tSty={rBtn_tSty}
                    text={rBtn_text}
                    pStyIdx={2}
                />}
            </View>
            {bottomSvg && bottomSvg}
        </Animated.View>)
}

export default React.memo(TextInputXCompo);

const styFN = ({ col, font }: defStyObjType) => StyleSheet.create({

    container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: col.INPUT_TEXT_OUTLINE,
        paddingHorizontal: 15,
        paddingVertical: 7,
        backgroundColor: col.INPUT_BG,
        // paddingTop: 10,
        marginBottom: 10,
        // flexDirection: 'column'
    },
    lable_Container: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center'
    },
    lable_tSty: {
        fontFamily: font.REGULAR,
        fontSize: Size(14),
        color: col.INPUT_TEXT_LABLE_COL,
        fontWeight: '400',
    },

    mSty: {
        width: "100%",
        flexDirection: 'row',
        height: 40,
    },

    lBtn: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    rBtn_cSty: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    rBtn_mSty: {
        height: 25,
        aspectRatio: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 5,
        borderRadius: 100,
        overflow: 'hidden',
    },

    lBtn_mSty: {},
    lBtn_cSty: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
});