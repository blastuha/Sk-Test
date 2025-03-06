import { useState, useRef, useEffect } from "react";
import { apiClient } from "@/api/axiosInstance";

interface UseAudioPlayerProps {
  record: string;
  partnershipId: string;
}

export const useAudioPlayer = ({
  record,
  partnershipId,
}: UseAudioPlayerProps) => {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchAudio = async (): Promise<string | void> => {
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
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Автозапуск при изменении audioUrl
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Auto play error:", err));
    }
  }, [audioUrl]);

  return {
    audioUrl,
    isPlaying,
    isFetching,
    progress,
    duration,
    audioRef,
    handlePlayPause,
    handleDownload,
    handleCancel,
    handleTimeUpdate,
    handleLoadedMetadata,
  };
};
