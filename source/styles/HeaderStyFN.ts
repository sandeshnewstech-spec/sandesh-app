import { defStyObjType } from "../types";
import { StyleSheet } from "react-native";
import { bSpace, headerHeight } from "../utils";
import { Size } from "../functions";

const HeaderStyFN = ({ col, font, }: defStyObjType) => StyleSheet.create({

    imgSty: {

    },
    hSty: {
        backgroundColor: col.HEADER_BGCOL,
    },
    svgSty: {
        color: col.BLACK
    },
    textSty: {
        color: col.HEADER_TEXT_COL,
        fontFamily: font.BOLD,
        fontSize: Size(18)
    },
    mainSty: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: bSpace / 2,
    },
    textView: {
        flex: 1,
        justifyContent: 'center',
    },
    hBtnCSty: {
        backgroundColor: col.HEADER_SVG_BGCOL,
        height: headerHeight * .7,
        borderRadius: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hBtnMSty: {

    },

});

export default HeaderStyFN;