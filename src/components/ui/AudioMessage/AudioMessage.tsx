import React, { useState, useEffect } from "react";
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
  onPlayingChange: (playing: boolean) => void;
}

const AudioMessage: React.FC<AudioMessageProps> = ({
  time,
  record,
  partnershipId,
  onPlayingChange,
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

  useEffect(() => {
    onPlayingChange(isPlaying);
  }, [isPlaying, onPlayingChange]);

  // Tooltip для прогресс-бара
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
        <button
          onClick={handlePlayPause}
          className={`${styles.button} ${styles["button--play"]}`}
        >
          <IconWrapper width={24} height={24}>
            {isPlaying ? <PauseIcon /> : <img src={playIcon} alt="Play" />}
          </IconWrapper>
        </button>

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
              onPlayingChange(false);
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
            onPlayingChange(false);
          }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
    </div>
  );
};

export default AudioMessage;
