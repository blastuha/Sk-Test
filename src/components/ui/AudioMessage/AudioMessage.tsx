import React, { useEffect, useRef, useState } from "react";
import styles from "./AudioMessage.module.scss";
import playIcon from "@assets/icons/ui/audio/play.svg";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import DownloadIcon from "@/components/ui/icons/DownloadIcon";
import CloseIcon from "@/components/ui/icons/CloseIcon";
import PauseIcon from "@/components/ui/icons/PauseIcon";
import { apiClient } from "@/api/axiosInstance";

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
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Обновляем прогресс во время воспроизведения
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Auto play error:", err));
    }
  }, [audioUrl]);

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
        <div className={styles["audio-message__progress-bar"]}>
          <div
            className={styles["audio-message__progress"]}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className={styles["audio-message__controls"]}>
        <button
          onClick={() => {
            setIsDownloading(true);
            handleDownload();
          }}
          className={`${styles.button} ${styles["button--download"]}`}
          disabled={!audioUrl}
        >
          <DownloadIcon className={styles["download-icon"]} />
        </button>
        {isDownloading && (
          <button
            onClick={() => setIsDownloading(false)}
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
        />
      )}
    </div>
  );
};

export default AudioMessage;
