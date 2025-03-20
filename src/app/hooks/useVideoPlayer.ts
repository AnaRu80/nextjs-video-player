import { useRef, useState } from 'react';

export function useVideoPlayer() {
	const videoPlayerRef = useRef<any>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isEnded, setIsEnded] = useState(false);

	const togglePlay = () => {
		if (isEnded) {
			videoPlayerRef.current?.replay();
			setIsEnded(false);
		} else {
			isPlaying
				? videoPlayerRef.current?.pause()
				: videoPlayerRef.current?.play();
		}
		setIsPlaying(!isPlaying);
	};

	const onEnd = () => setIsEnded(true);

	return {
		videoPlayerRef,
		isPlaying,
		isEnded,
		togglePlay,
		onEnd,
	};
}
