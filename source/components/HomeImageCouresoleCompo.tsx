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