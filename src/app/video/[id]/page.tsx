"use client";

import { useParams, useRouter } from "next/navigation";
import { useVideo } from "@/app/hooks/useVideo";
import { useVideoPlayer } from "@/app/hooks/useVideoPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import styles from "@/styles/VideoPage.module.scss";
import VideoControls from '@/components/VideoControlers';
import VideoInfo from '@/components/VideoInfo';
import VideoHeader from '@/components/VideoHeader';

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { video, isLoading, error } = useVideo(id);
  const { videoPlayerRef, isPlaying, isEnded, togglePlay, onEnd } = useVideoPlayer();

  if (error) return <p>Error loading video</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  const videoUrl = video.video_files?.find((file: any) => file.file_type === "video/mp4")?.link || "";


  return (
    <div>
      <VideoHeader router={router} />
      <div className={styles.videoPage}>
        <div className={styles.videoContent}>
          <div className={styles.videoContainer}>
            <VideoPlayer ref={videoPlayerRef} videoUrl={videoUrl} onEnd={onEnd} />
          </div>
          <div className={styles.infoContainer}>
            <VideoInfo video={video} />
            <VideoControls
              videoPlayerRef={videoPlayerRef}
              isPlaying={isPlaying}
              isEnded={isEnded}
              togglePlay={togglePlay}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
