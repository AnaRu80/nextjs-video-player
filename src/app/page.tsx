import Image from "next/image";
import styles from "./page.module.css";
import VideoList from '@/components/VideoList';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Video Streaming App</h1>
          <VideoList />
        </div>
      </main>
      <footer className={styles.footer}>
        {/* TODO FOOTER */}
      </footer>
    </div>
  );
}
