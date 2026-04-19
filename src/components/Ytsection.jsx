import { useEffect,useRef } from 'react';
import { useNoteStore } from '../store/useNotes'


const Ytsection = () => {
  const playerRef = useRef(null);
  const {setPlayer,videoId} = useNoteStore();

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(playerRef.current, {
        height: "50vh",
        width: "100%",
        videoId: (videoId=="" ? localStorage.getItem("videoId") : videoId),
      });

      setPlayer(player);
    };
  }, [videoId]);

  return <div style={{height:"50vh",width:"100%"}} ref={playerRef}></div>;
};

export default Ytsection
