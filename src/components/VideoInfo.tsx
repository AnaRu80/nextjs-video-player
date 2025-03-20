import styles from "@/styles/VideoInfo.module.scss";
import { extractTitleFromURL } from "@/app/utils/general";

export default function VideoInfo({ video }: { video: any }) {
  return (
    <div >
      <h1 className={styles.videoTitle}>{extractTitleFromURL(video.url)}</h1>
      <div className={styles.userInfo}>
        <a href={video.user.url} target="_blank" rel="noopener noreferrer">
          <h2>User: {video.user.name}</h2>
        </a>
      </div>
    </div>
  );
}
