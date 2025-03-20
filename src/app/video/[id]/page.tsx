"use client";

import { useParams, useRouter } from "next/navigation";
import { useVideo } from "@/app/hooks/useVideo";
import { useVideoPlayer } from "@/app/hooks/useVideoPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import styles from "@/styles/VideoPage.module.scss";
import { extractTitleFromURL } from '@/app/utils/general';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaArrowLeft, FaRedo } from "react-icons/fa";

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { video, isLoading, error } = useVideo(id);
  const { videoPlayerRef, isPlaying, isEnded, togglePlay, onEnd } = useVideoPlayer(); // 🎯 Usamos el hook

  if (error) return <p>Error loading video</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  const videoUrl = video.video_files?.find((file: any) => file.file_type === "video/mp4")?.link || "";


  return (
    <div>
      <button className={styles.backButton} onClick={() => router.push("/")}>
        <FaArrowLeft size={20} />
      </button>
      <div className={styles.videoPage}>

        <div className={styles.videoContent}>
          {/* Sección del video a la izquierda */}
          <div className={styles.videoContainer}>
            <VideoPlayer ref={videoPlayerRef} videoUrl={videoUrl} onEnd={onEnd} />
          </div>

          <div className={styles.infoContainer}>
            <h1 className={styles.videoTitle}>{extractTitleFromURL(video.url)}</h1>
            <div className={styles.userInfo}>

              <a href={video.user.url} target="_blank" rel="noopener noreferrer">
                <h2>User: {video.user.name}</h2>
              </a>
            </div>

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


          </div>
        </div>
      </div>

      <div className={styles.videoPage}>

      </div>
    </div>
  );
}
