import React, { useEffect, useRef, useState } from "react";
import styles from "./AudioMessage.module.scss";
import playIcon from "@assets/icons/ui/audio/play.svg";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import DownloadIcon from "@components/ui/icons/DownloadIcon";
import CloseIcon from "@components/ui/icons/CloseIcon";
import PauseIcon from "@components/ui/icons/PauseIcon";
import { apiClient } from "@/api/axiosInstance";
import { formatDuration } from "@/utils/formatDuration";

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
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Для tooltip:
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [hoverTime, setHoverTime] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipX, setTooltipX] = useState<number>(0);

  const fetchAudio = async () => {
    setIsFetching(true);
    try {
      const url = `/getRecord?record=${record}&partnership_id=${partnershipId}`;
      const response = await apiClient.post<Blob>(url, null, {
        responseType: "blob",
      });
      setIsFetching(false);
      if (response.status !== 200) {
        console.error(`Ошибка: ${response.status}`);
        return;
      }
      const blob = response.data;
      const objectUrl = URL.createObjectURL(blob);
      setAudioUrl(objectUrl);
      return objectUrl;
    } catch (error) {
      setIsFetching(false);
      console.error("Ошибка при получении записи:", error);
    }
  };

  const handlePlayPause = async () => {
    if (!audioUrl) {
      if (isFetching) return;
      const url = await fetchAudio();
      if (!url) return;
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "record.mp3";
    link.click();
  };

  const handleCancel = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setProgress(0);
    setAudioUrl("");
    setVisible(false);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  // Когда аудио загружено, узнаём его полную длину
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // При первом получении audioUrl автоматически запускаем воспроизведение
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Auto play error:", err));
    }
  }, [audioUrl]);

  // Функция для вычисления времени по позиции мыши на прогресс-баре
  const calculateHoverTime = (clientX: number) => {
    if (!progressBarRef.current || duration === 0) return 0;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left; // расстояние от левого края
    const ratio = offsetX / rect.width;
    const hoverSec = ratio * duration;
    return hoverSec > duration ? duration : hoverSec < 0 ? 0 : hoverSec;
  };

  // При движении мыши показываем tooltip с подсказкой
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowTooltip(true);
    const hoverSec = calculateHoverTime(e.clientX);
    setHoverTime(hoverSec);
    setTooltipX(e.clientX - e.currentTarget.getBoundingClientRect().left);
  };

  // Скрываем tooltip, если мышь покидает прогресс-бар
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // При клике на прогресс-бар перематываем аудио
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const newTime = calculateHoverTime(e.clientX);
    audioRef.current.currentTime = newTime;
    if (!isPlaying) {
      // Если было на паузе, запустим сразу проигрывание
      audioRef.current.play();
      setIsPlaying(true);
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
            onClick={handleCancel}
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
            setIsPlaying(false);
            setProgress(0);
          }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
    </div>
  );
};

export default AudioMessage;
