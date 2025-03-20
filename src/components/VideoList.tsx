"use client"
import { useVideos } from "@/app/hooks/useVideos";
import { extractTitleFromURL } from '@/app/utils/general';
import Link from "next/link";

export default function VideoList() {
  const { videos, isLoading, error } = useVideos();

  if (error) return <p>Error loading videos</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!videos.length) return <p>No videos found</p>;

  return (
    <div className="video-list">
      {videos.map((video: any) => (
        <div key={video.id} className="video-card">
          <img src={video.image} alt={video.url} />
          <div className="video-info">
            <h3>{extractTitleFromURL(video.url)}</h3>
            <Link href={`/video/${video.id}`}>See clip</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
