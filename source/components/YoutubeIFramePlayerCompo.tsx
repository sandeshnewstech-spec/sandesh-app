
import YoutubePlayer, { YoutubeIframeProps } from "react-native-youtube-iframe";

const YoutubeIFramePlayer = (item: YoutubeIframeProps & { height: string | number | undefined }) => <YoutubePlayer {...item} />;

export default YoutubeIFramePlayer