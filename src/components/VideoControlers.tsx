import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRedo } from "react-icons/fa";
import styles from "@/styles/VideoPage.module.scss";

interface VideoControlsProps {
  videoPlayerRef: any;
  isPlaying: boolean;
  isEnded: boolean;
  togglePlay: () => void;
}

export default function VideoControls({ videoPlayerRef, isPlaying, isEnded, togglePlay }: VideoControlsProps) {
  return (
    <div className={styles.videoControls}>
      <button className={styles.controlButton} onClick={() => videoPlayerRef.current?.seekBackward()}>
        <FaStepBackward size={30} />
      </button>
      <button className={styles.playButton} onClick={togglePlay}>
        {isEnded ? <FaRedo size={40} /> : isPlaying ? <FaPause size={40} /> : <FaPlay size={40} />}
      </button>
      <button className={styles.controlButton} onClick={() => videoPlayerRef.current?.seekForward()}>
        <FaStepForward size={30} />
      </button>
    </div>
  );
}
