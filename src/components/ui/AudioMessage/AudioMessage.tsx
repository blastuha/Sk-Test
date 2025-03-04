import React, { useRef, useState } from "react";
import styles from "./AudioMessage.module.scss";
import playIcon from "@assets/icons/ui/audio/play.svg";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import DownloadIcon from "@components/ui/icons/DownloadIcon";
import CloseIcon from "@components/ui/icons/CloseIcon";

interface AudioMessageProps {
  time: string;
  audioSrc: string;
}

const AudioMessage: React.FC<AudioMessageProps> = ({ time, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!audioSrc) return;
    const link = document.createElement("a");
    link.href = audioSrc;
    link.download = "record.mp3";
    link.click();
  };

  return (
    <div className={styles["audio-message"]}>
      <span className={styles["audio-message__time"]}>{time}</span>

      {/* Плеер */}
      <div className={styles["audio-message__player"]}>
        <IconWrapper width={24} height={24}>
          <button
            className={`${styles.button} ${styles["button--play"]}`}
            onClick={handlePlayPause}
            disabled={!audioSrc}
          >
            <img src={playIcon} alt="Play" />
          </button>
        </IconWrapper>
        <div className={styles["audio-message__progress-bar"]} />
      </div>

      <div className={styles["audio-message__controls"]}>
        {/* Кнопка Download */}
        <button
          onClick={() => {
            setIsDownloading(true);
            handleDownload();
          }}
          className={`${styles.button} ${styles["button--download"]}`}
          disabled={!audioSrc}
        >
          <DownloadIcon className={styles["download-icon"]} />
        </button>

        {/* Кнопка Cancel (появляется только если isDownloading === true) */}
        {isDownloading && (
          <button
            onClick={() => setIsDownloading(false)}
            className={`${styles.button} ${styles["button--cancel"]}`}
          >
            <CloseIcon className={styles["cancel-icon"]} />
          </button>
        )}
      </div>

      {/* Невидимый <audio>, который мы воспроизводим */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioMessage;
