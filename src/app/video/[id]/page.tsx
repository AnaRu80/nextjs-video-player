"use client";

import { useParams } from "next/navigation";
import { useVideo } from "@/app/hooks/useVideo";
import { useRef } from "react";
import VideoPlayer from "@/components/VideoPLayer";
import styles from "@/styles/VideoPage.module.scss";
import { extractTitleFromURL } from '@/app/utils/general';

export default function VideoPage() {
  const params = useParams();
  const id = params?.id as string;
  const { video, isLoading, error } = useVideo(id);
  const videoPlayerRef = useRef<any>(null);

  console.log("🎥 Video recibido en VideoPage:", video);
  console.log("🎬 Archivos de video disponibles:", video?.video_files);

  // 🔹 Filtrar solo MP4
  const videoUrl = video?.video_files?.find(
    (file: any) => file.file_type === "video/mp4"
  )?.link || "";

  console.log("🎥 URL del video a reproducir:", videoUrl);

  if (error) return <p>Error loading video</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!video || !videoUrl) return <p>Video not found</p>;

  return (
    <div className={styles.videoPage}>
      {/* Contenedor principal de dos columnas */}
      <div className={styles.videoContent}>
        {/* Sección del video a la izquierda */}
        <div className={styles.videoContainer}>
          <VideoPlayer ref={videoPlayerRef} videoUrl={videoUrl} />
        </div>

        {/* Sección de información a la derecha */}
        <div className={styles.infoContainer}>
          <h1 className={styles.videoTitle}>{extractTitleFromURL(video.url)}</h1>
          <div className={styles.userInfo}>
            <h2>UserName: {video.user.name}</h2>
            <a href={video.user.url} target="_blank" rel="noopener noreferrer">
              Ver Perfil
            </a>
          </div>
          {/* Controles del video estilo Spotify */}
          <div className={styles.videoControls}>
            <button onClick={() => videoPlayerRef.current?.seekBackward()}>⏮️</button>
            <button onClick={() => videoPlayerRef.current?.play()}>▶️</button>
            <button onClick={() => videoPlayerRef.current?.pause()}>⏸️</button>
            <button onClick={() => videoPlayerRef.current?.seekForward()}>⏭️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
