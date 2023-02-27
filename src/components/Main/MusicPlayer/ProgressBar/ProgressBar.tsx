import "./ProgressBar.css";

const ProgressBar = ({ audioRef, currentTime, duration, setCurrentTime, setDuration }: progressProps) => {
    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(event.target.value);
            setCurrentTime(Number(event.target.value));
        }
    };
    return <>
        <div className="audio-controls">
            <input
                type="range"
                className="audio-progress"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleRangeChange}
            />
            <div className="audio-time">
                <p>{formatTime(currentTime)}</p>
                <p>{formatTime(duration)}</p>
            </div>
        </div>
    </>
};

export default ProgressBar;

interface progressProps {
    audioRef: React.RefObject<HTMLAudioElement>;
    currentTime: number,
    duration: number,
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};