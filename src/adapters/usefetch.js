import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const getVideos = useCallback(async () => {
    const response = await fetch(url);
    const gList = await response.json();
    setVideos(gList.data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getVideos();
  }, [url, getVideos]);
  return { loading, videos };
};
