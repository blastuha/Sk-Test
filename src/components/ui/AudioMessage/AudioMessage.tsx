import React, { useState } from "react";
import styles from "./AudioMessage.module.scss";
import playIcon from "@assets/icons/ui/audio/play.svg";
import downloadIcon from "@assets/icons/ui/audio/download.svg";
import closeIcon from "@assets/icons/ui/audio/close.svg";

interface AudioMessageProps {
  time: string;
  audioSrc: string;
}

const AudioMessage: React.FC<AudioMessageProps> = ({ time, audioSrc }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      const link = document.createElement("a");
      link.href = audioSrc;
      link.download = "audio_message.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000); // Симуляция загрузки
  };

  return (
    <div className={styles["audio-message"]}>
      <span className={styles["time"]}>{time}</span>
      <button className={styles["play-button"]}>
        <img src={playIcon} alt="Play" />
      </button>
      <div className={styles["progress-bar"]} />
      {isDownloading ? (
        <button
          className={styles["cancel-button"]}
          onClick={() => setIsDownloading(false)}
        >
          <img src={closeIcon} alt="Cancel" />
        </button>
      ) : (
        <button className={styles["download-button"]} onClick={handleDownload}>
          <img src={downloadIcon} alt="Download" />
        </button>
      )}
    </div>
  );
};

export default AudioMessage;
