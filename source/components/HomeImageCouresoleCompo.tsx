import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import useZuStore from "store/useZuStore";
import { defStyObjType, NewsItemType } from "types";
import { _HEIGHT, _WIDTH, bSpace } from "utils";
import { useThemeX } from "hooks";
import { FlatList } from "react-native-gesture-handler";
import { Size } from "functions";
import ImageCourasoleItemCompo from "./Home/ImageCourasoleItemCompo";

type P = {
    data?: Array<NewsItemType>;
    autoPlayInterval?: number;
    onPress?: (i?: NewsItemType) => void;
    onCategoryPress?: (i?: NewsItemType) => void;
}

const HomeImageCouresoleCompo = ({ data = [], autoPlayInterval = 5000, onPress = () => { }, onCategoryPress = () => { } }: P) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const { defStyOBJ, col } = useThemeX();
    const style = styleFN(defStyOBJ);
    const { appServices } = useZuStore();
    const flatListRef = useRef<FlatList>(null);

    const renderItem = useCallback(({ item, index }: { item: NewsItemType, index: number }) => {
        return (<ImageCourasoleItemCompo
            title={item?.title} categoryTitle={item?.category}
            imageMediaUrl={item?.media} onCategoryPress={() => onCategoryPress(item)} onPress={() => onPress(item)} />);
    }, [appServices?.assetURL, onCategoryPress]);

    const handleMomentumScrollEnd = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / _WIDTH);
        setCurrentIndex(index);
    };

    return (
        <View
            id="carousel-component"
            style={{
                width: _WIDTH,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={handleMomentumScrollEnd}
                showsHorizontalScrollIndicator={false}
                bounces={false}
            />
        </View>
    );
}

export default HomeImageCouresoleCompo;

const styleFN = ({ font, col }: defStyObjType) => StyleSheet.create({
    item_main: {
        width: _WIDTH - (bSpace),
        marginHorizontal: bSpace / 2,
        padding: bSpace,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: col.SECONDARY,
        marginVertical: bSpace / 2
    },
    item_image_main: {
        height: Size(250),
        width: "100%",
        borderRadius: 10,
        overflow: 'hidden',
    },
    item_image: {
        flex: 1,
    },
    title: {
        fontFamily: font.BOLD,
        fontSize: Size(20),
        color: col.TEXT_COL,
        paddingTop: Size(5),
        lineHeight: Size(30),
    },
    catagory_and_btn_cover: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Size(35),
        alignItems: 'center',
        paddingTop: 5,
    },
    categotyCover: {
        height: "100%",
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: col.OUTLINE03,
        backgroundColor: col.PRIMARY,
        paddingHorizontal: bSpace,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categotyTitle: {
        fontFamily: font.BOLD,
        fontSize: Size(16),
        color: col.WHITE,
    },
    right_arrow_btn: {
        aspectRatio: 1,
        height: "100%",
        borderRadius: 100,
        borderColor: col.PRIMARY
    }

});