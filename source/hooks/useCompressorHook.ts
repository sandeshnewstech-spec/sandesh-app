import { Image, getImageMetaData } from 'react-native-compressor';
import { CompressorOptions } from 'react-native-compressor/lib/typescript/Image';
import { getImageMetaDataType } from '../types';

const useCompressorHook = () => {

    const imageCOMPRESS = async (uri: string, params?: CompressorOptions) => await Image.compress(uri, params);

    const imageMETADATA = async (uri: string): Promise<getImageMetaDataType> => await getImageMetaData(uri);

    return ({ imageCOMPRESS, imageMETADATA });
}

export default useCompressorHook