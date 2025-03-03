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
      <span className={styles["audio-message__time"]}>{time}</span>

      <div className={styles["audio-message__player"]}>
        <IconWrapper width={24} height={24}>
          <button
            className={
              styles["audio-message__button audio-message__button--play"]
            }
          >
            <img src={playIcon} alt="Play" />
          </button>
        </IconWrapper>
        <div className={styles["audio-message__progress-bar"]} />
      </div>

      <div className={styles["audio-message__controls"]}>
        <IconWrapper width={24} height={24}>
          <button
            className={
              styles["audio-message__button audio-message__button--cancel"]
            }
            onClick={() => setIsDownloading(false)}
          >
            <img src={closeIcon} alt="Cancel" />
          </button>
        </IconWrapper>

        <IconWrapper width={24} height={24}>
          <button
            className={
              styles["audio-message__button audio-message__button--download"]
            }
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </IconWrapper>
      </div>
    </div>
  );
};

export default AudioMessage;
