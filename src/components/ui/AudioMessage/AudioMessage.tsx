import React, { useState } from "react";
import styles from "./AudioMessage.module.scss";
import playIcon from "@assets/icons/ui/audio/play.svg";
import downloadIcon from "@assets/icons/ui/audio/download.svg";
import closeIcon from "@assets/icons/ui/audio/close.svg";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";

interface AudioMessageProps {
  time: string;
  audioSrc: string;
}

const AudioMessage: React.FC<AudioMessageProps> = ({ time, audioSrc }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <div className={styles["audio-message"]}>
      <span className={styles["time"]}>{time}</span>
      <IconWrapper width={24} height={24}>
        <button className={styles["play-button"]}>
          <img src={playIcon} alt="Play" />
        </button>
      </IconWrapper>
      <div className={styles["progress-bar"]} />
      {isDownloading ? (
        <IconWrapper width={24} height={24}>
          <button
            className={styles["cancel-button"]}
            onClick={() => setIsDownloading(false)}
          >
            <img src={closeIcon} alt="Cancel" />
          </button>
        </IconWrapper>
      ) : (
        <IconWrapper width={24} height={24}>
          <button className={styles["download-button"]}>
            <img src={downloadIcon} alt="Download" />
          </button>
        </IconWrapper>
      )}
    </div>
  );
};

export default AudioMessage;
