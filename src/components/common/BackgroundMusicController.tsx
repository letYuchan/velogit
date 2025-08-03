import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { getAudioFileUrls } from '@/utils';

const musicList = getAudioFileUrls();
const getRandomTrack = () => {
    const index = Math.floor(Math.random() * musicList.length);
    return musicList[index];
};

const BackgroundMusicController = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTrackName, setCurrentTrackName] = useState('');

    useEffect(() => {
        const filePath = getRandomTrack();
        const audio = new Audio(filePath);
        audio.volume = volume;
        audioRef.current = audio;
        setCurrentTrackName(filePath.split('/').pop()?.replace('.mp3', '') || '');

        const handleEnded = () => {
            const nextFilePath = getRandomTrack();
            const nextTrack = new Audio(nextFilePath);
            nextTrack.volume = volume;
            nextTrack.addEventListener('ended', handleEnded);
            audioRef.current = nextTrack;
            setCurrentTrackName(nextFilePath.split('/').pop()?.replace('.mp3', '') || '');
            if (isPlaying) {
                nextTrack.play().catch(err => {
                    console.warn('Autoplay blocked (next track):', err);
                });
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            const shouldBeMuted = volume === 0;
            audioRef.current.muted = shouldBeMuted;
            setIsMuted(shouldBeMuted);
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(err => {
                    console.warn('Autoplay blocked:', err);
                });
        }
    };

    const toggleMute = () => {
        if (!audioRef.current) return;

        const newMuted = !isMuted;
        audioRef.current.muted = newMuted;
        setIsMuted(newMuted);

        if (!newMuted && volume === 0) {
            setVolume(0.5);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    return (
        <div className='flex flex-wrap items-center justify-start gap-3 text-foreground'>
            <button onClick={togglePlay} title='Play/Pause'>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={toggleMute} title='Mute/Unmute'>
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
                type='range'
                min='0'
                max='1'
                step='0.01'
                value={volume}
                onChange={handleVolumeChange}
                className='w-24 accent-primary'
                title='Volume'
            />
            {currentTrackName && (
                <span className='text-muted-foreground font-mono text-sm'>{currentTrackName}</span>
            )}
        </div>
    );
};

export default BackgroundMusicController;
