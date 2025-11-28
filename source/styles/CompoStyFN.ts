import { _WIDTH, Size } from "../functions";
import { StyleSheet } from "react-native";
import { bSpace, headerHeight } from "../utils";
import { defStyObjType } from "../types";
import { _COL } from "../colors";

const CompoStyFN = ({ font, col, bottom }: defStyObjType) => StyleSheet.create({
    rowACenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    w100CfRow: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    hw100: {
        height: "100%",
        width: "100%",
    },
    hDivider: {
        width: "100%",
        height: 1,
        backgroundColor: col.BLACK02
    },

    inputSty1: {

        height: "100%",
        fontSize: Size(16),
        color: col.BLACK,
        fontFamily: font.REGULAR,

        // dont increase padding,
        // if you remove then padding is incrase i android
        padding: 0
    },

    emptyListMSG_cSty: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    emptyListMSG_tSty: {
        fontFamily: font.REGULAR,
        fontSize: Size(14),
        color: col.TEXT_COL,
        textAlign: 'center',
    },

    /** 
     * ALERT BOX STYLES 
    **/
    alertBanner_abContainerSty: {
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: col.TOAST_OUTLINE,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: bottom + bSpace
    },
    alertBanner_containerSty: {
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: col.TOAST_OUTLINE,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
    },
    alertBanner_msg_tSty: {
        fontFamily: font.REGULAR,
        fontWeight: '400',
        fontSize: Size(13),
        color: col.TOAST_TEXT,
        maxWidth: _WIDTH * .7
    },

    /**
     * FILL CENTER ABSOLUTELY
     **/
    Absolute_h100w100Ctr: {
        height: "100%",
        width: "100%",
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default CompoStyFN;