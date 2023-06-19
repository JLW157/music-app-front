import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
interface IWaveFormProps {
    audio: string;
}

const Waveform = ({ audio }: IWaveFormProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(); // Update the type to allow null
    const [isPlaying, toggleIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        const waveSurferInstance = WaveSurfer.create({
            container: containerRef.current!,
            responsive: true,
            cursorWidth: 0,
            barWidth: 4,
            height: 90,
            barRadius: 4,
            barHeight: 5,
        });

        waveSurferInstance.load(audio);

        waveSurferInstance.on("ready", () => {
            waveSurferRef.current = waveSurferInstance;
        });

        return () => {
            waveSurferInstance.destroy();
        };
    }, [audio]);

    return <>
        <button
            onClick={() => {
                waveSurferRef.current?.playPause()
                toggleIsPlaying(waveSurferRef?.current?.isPlaying()!)
            }}
            type="button"
        >
            {isPlaying ? 'pause' : 'play'}
        </button>
        <div ref={containerRef} />
    </>
};

export default Waveform;
