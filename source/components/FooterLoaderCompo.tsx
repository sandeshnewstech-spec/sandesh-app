import React from 'react'
import Loaders from './XCompos/Loaders';

type P = {
    loading: boolean;
}

const FooterLoaderCompo = ({ loading }: P) => {
    if (!loading) return <></>;
    return (
        <Loaders
            loading={loading}
            type='samsung'
            size={30}
            style={{ width: "100%", height: 50, justifyContent: 'center' }}
        />
    )
}

export default FooterLoaderCompo