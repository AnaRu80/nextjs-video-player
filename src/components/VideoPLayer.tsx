"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import styles from "@/styles/VideoPlayer.module.scss";

interface VideoPlayerProps {
  videoUrl: string;
}

// 📌 Usamos `forwardRef` para que el `VideoPage.tsx` pueda controlar el video
const VideoPlayer = forwardRef(({ videoUrl }: VideoPlayerProps, ref) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  let player: videojs.Player | null = null;

  useEffect(() => {
    setIsMounted(true); // 🔹 Confirmamos que el componente está montado
  }, []);

  useEffect(() => {
    if (!isMounted || !videoRef.current) return;

    console.log("🎬 Inicializando Video.js con URL:", videoUrl);

    player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      responsive: true,
      fluid: true,
    });

    const fileType = videoUrl.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4";
    player.src({ src: videoUrl, type: fileType });

    return () => {
      player?.dispose();
    };
  }, [isMounted, videoUrl]);

  // 📌 Exponemos métodos `play`, `pause`, `seek`
  useImperativeHandle(ref, () => ({
    play: () => player?.play(),
    pause: () => player?.pause(),
    seekForward: () => player?.currentTime(player?.currentTime() + 10), // Adelantar 10s
    seekBackward: () => player?.currentTime(player?.currentTime() - 10), // Retroceder 10s
  }));

  return (
    <div className={styles.videoContainer}>
      <video ref={videoRef} className="video-js" />
    </div>
  );
});

export default VideoPlayer;
