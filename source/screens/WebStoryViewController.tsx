import React, { useState } from 'react'
import { MasterView, ScrLoader, WebViewX } from 'components';
import { WEB_STORY_DETAIL_URL } from 'utils';
import { useThemeX } from 'hooks';

const WebStoryViewController = ({ route, navigation }: any) => {
    const _item = route?.params?.item;
    const [loading, setLoading] = useState<boolean>(true);
    const { col } = useThemeX();
    return (<MasterView title={_item?.title} fixed bgCol={col.BLACK} >
        <WebViewX
            url={`${WEB_STORY_DETAIL_URL}${_item?.url}`}
            setLoading={setLoading}
        />
        <ScrLoader absolute loading={loading} />
    </MasterView>);
}

export default WebStoryViewController