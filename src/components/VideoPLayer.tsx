"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import styles from "@/styles/VideoPlayer.module.scss";

interface VideoPlayerProps {
  videoUrl: string;
  onEnd?: () => void;
}


const VideoPlayer = forwardRef(({ videoUrl, onEnd }: VideoPlayerProps, ref) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const playerRef = useRef<videojs.Player | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      responsive: true,
      fluid: true,
    });
    const player = playerRef.current;

    player.on("ready", () => {
      setIsReady(true);
      console.log("🎥 Video Ready");
    });
    player.on("ended", () => {
      console.log("⏹️ Video Finish");
      if (onEnd) {
        onEnd();
      }
    });

    const fileType = videoUrl.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4";
    player.src({ src: videoUrl, type: fileType });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [isMounted, videoUrl]);

  useImperativeHandle(ref, () => ({
    play: () => playerRef.current?.play(),
    pause: () => playerRef.current?.pause(),
    seekForward: () => playerRef.current?.currentTime(playerRef.current?.currentTime() + 10),
    seekBackward: () => playerRef.current?.currentTime(playerRef.current?.currentTime() - 10),
    replay: () => {
      playerRef.current?.currentTime(0);
      playerRef.current?.play();
    },
  }));

  return (
    <div className={styles.videoContainer}>
      <video ref={videoRef} className="video-js" />
    </div>
  );
});

export default VideoPlayer;
