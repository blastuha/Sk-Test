// AudioMessage.tsx
import React, { useState } from "react";
import styles from "./AudioMessage.module.scss";
import playIcon from "@assets/icons/ui/audio/play.svg";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import DownloadIcon from "@components/ui/icons/DownloadIcon";
import CloseIcon from "@components/ui/icons/CloseIcon";
import PauseIcon from "@components/ui/icons/PauseIcon";
import { formatDuration } from "@/utils/formatDuration";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface AudioMessageProps {
  time: string;
  record: string;
  partnershipId: string;
}

const AudioMessage: React.FC<AudioMessageProps> = ({
  time,
  record,
  partnershipId,
}) => {
  const [visible, setVisible] = useState<boolean>(true);

  const {
    audioUrl,
    isPlaying,
    progress,
    audioRef,
    handlePlayPause,
    handleDownload,
    handleCancel,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useAudioPlayer({ record, partnershipId });

  // tooltip
  const [hoverTime, setHoverTime] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipX, setTooltipX] = useState<number>(0);
  const progressBarRef = React.useRef<HTMLDivElement | null>(null);

  const calculateHoverTime = (clientX: number) => {
    if (!progressBarRef.current || !audioRef.current) return 0;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const ratio = offsetX / rect.width;
    const hoverSec = ratio * audioRef.current.duration;
    return hoverSec > audioRef.current.duration
      ? audioRef.current.duration
      : hoverSec < 0
      ? 0
      : hoverSec;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowTooltip(true);
    const hoverSec = calculateHoverTime(e.clientX);
    setHoverTime(hoverSec);
    setTooltipX(e.clientX - e.currentTarget.getBoundingClientRect().left);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const newTime = calculateHoverTime(e.clientX);
    audioRef.current.currentTime = newTime;
    if (!isPlaying) {
      audioRef.current.play();
    }
  };

  if (!visible) return null;

  return (
    <div className={styles["audio-message"]}>
      <span className={styles["audio-message__time"]}>{time}</span>
      <div className={styles["audio-message__player"]}>
        <IconWrapper width={24} height={24}>
          <button
            className={`${styles.button} ${styles["button--play"]}`}
            onClick={handlePlayPause}
          >
            {isPlaying ? <PauseIcon /> : <img src={playIcon} alt="Play" />}
          </button>
        </IconWrapper>

        <div
          className={styles["audio-message__progress-bar"]}
          ref={progressBarRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleProgressClick}
        >
          <div
            className={styles["audio-message__progress"]}
            style={{ width: `${progress}%` }}
          />
          {showTooltip && (
            <div
              className={styles["audio-message__tooltip"]}
              style={{ left: tooltipX }}
            >
              {formatDuration(hoverTime)}
            </div>
          )}
        </div>
      </div>

      <div className={styles["audio-message__controls"]}>
        <button
          onClick={handleDownload}
          className={`${styles.button} ${styles["button--download"]}`}
          disabled={!audioUrl}
        >
          <DownloadIcon className={styles["download-icon"]} />
        </button>
        {isPlaying && (
          <button
            onClick={() => {
              handleCancel();
              setVisible(false);
            }}
            className={`${styles.button} ${styles["button--cancel"]}`}
          >
            <CloseIcon className={styles["cancel-icon"]} />
          </button>
        )}
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => {
            setVisible(true);
          }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
    </div>
  );
};

export default AudioMessage;
