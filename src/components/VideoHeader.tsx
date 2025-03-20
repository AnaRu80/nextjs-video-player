import { FaArrowLeft } from "react-icons/fa";
import styles from "@/styles/VideoHeader.module.scss";

export default function VideoHeader({ router }: { router: any }) {
  return (
    <button className={styles.backButton} onClick={() => router.push("/")}>
      <FaArrowLeft size={20} />
    </button>
  );
}
