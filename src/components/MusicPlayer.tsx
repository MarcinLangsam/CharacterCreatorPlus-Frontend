import React, { useEffect, useRef, useState } from "react";

const MusicPlayer: React.FC = () => {
    const tracks = [
        {id: 1, title: "BG - Main Theme.mp3"},
        {id: 2, title: "BG 2 ToB - Main Theme.mp3"},
        {id: 3, title: "BG 3 - Who Are You.mp3"},
        {id: 4, title: "BG 3 - Song Of Balduran.mp3"},
        {id: 5, title: "BG 3 - Nightsong.mp3"},
        {id: 6, title: "BG 3 - Main Theme.mp3"},
        {id: 7, title: "BG 2 - Romance 1.mp3"},
        {id: 8, title: "BG 2 - Romance 2.mp3"},
        {id: 9, title: "BG 2 - The Good.mp3"},
        {id: 10, title: "BG 2 ToB - Grove Of The Ancients.mp3"},
        {id: 11, title: "BG 3 - I Want To Live.mp3"},
        {id: 12, title: "BG 3 - Main Theme Part II.mp3"},
        {id: 13, title: "BG 3 - The Power.mp3"},
        //{id: 14, title: "BG 2 - Main Theme.mp3"}, ZA GŁOŚNO XD
    ]

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlayPause = async () => {
        if (!audioRef.current) return;
      
        try {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            await audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
        } catch (error) {
          console.error("Error toggling play/pause:", error);
        }
      };
      

    const playNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        setIsPlaying(false);
    }

    const playPreviousTrack = () => {
        setCurrentTrackIndex((prevIndex) => (
            prevIndex === 0 ? tracks.length - 1 : prevIndex -1
        ));
        setIsPlaying(false);
    }

    const handleTrackChange = () => {
        if(!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.load();
        if(isPlaying) {
            audioRef.current.play();
        }
    };

    useEffect(() => {
        handleTrackChange();
    }, [currentTrackIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            playNextTrack();
            setIsPlaying(true)
        };

        audio.addEventListener("ended", handleEnded);
        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    return(
        <div className="music-player">
            <div className="track-info">
                <h2>{tracks[currentTrackIndex]?.title || "Brak utworu"}</h2>
                <div className="controls">
                    <button onClick={playPreviousTrack}>{"<"}</button>
                    <button onClick={togglePlayPause}>
                    {isPlaying ? "Pauza" : "Odtwarzaj"}
                    </button>
                    <button onClick={playNextTrack}>{">"}</button>
                </div>
            </div>

            <audio ref={audioRef}>
            <source src={`http://localhost:3000/Music/${tracks[currentTrackIndex].title}`} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        </div>
    )
}

export default MusicPlayer;