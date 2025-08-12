import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
interface BackgroundMusicControllerProps {
    musicList: string[];
}

const BackgroundMusicController = ({ musicList }: BackgroundMusicControllerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTrackName, setCurrentTrackName] = useState('');
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const getRandomTrack = () => {
        const index = Math.floor(Math.random() * musicList.length);
        return musicList[index];
    };

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

    useEffect(() => {
        const filePath = getRandomTrack();
        const audio = new Audio(filePath);
        audio.volume = volume;
        audioRef.current = audio;
        setCurrentTrackName(filePath.split('/').pop()?.replace('.mp3', '') || '');

        const handleAudioEndedAndPlayNext = () => {
            const nextFilePath = getRandomTrack();
            const nextTrack = new Audio(nextFilePath);
            nextTrack.volume = volume;
            nextTrack.addEventListener('ended', handleAudioEndedAndPlayNext);
            audioRef.current = nextTrack;
            setCurrentTrackName(nextFilePath.split('/').pop()?.replace('.mp3', '') || '');
            if (isPlaying) {
                nextTrack.play().catch(err => {
                    console.warn('Autoplay blocked (next track):', err);
                });
            }
        };

        audio.addEventListener('ended', handleAudioEndedAndPlayNext);

        return () => {
            audio.removeEventListener('ended', handleAudioEndedAndPlayNext);
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

    if (musicList.length === 0) return null;

    return (
        <div className='flex flex-wrap items-center justify-start gap-3 text-foreground'>
            {/* Background music player */}
            <button onClick={togglePlay} title='Play/Pause'>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            {/* For mute */}
            <button onClick={toggleMute} title='Mute/Unmute'>
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            {/* Volume Control */}
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
            {/* Track Name */}
            {currentTrackName && (
                <span className='text-muted-foreground font-mono text-sm'>{currentTrackName}</span>
            )}
        </div>
    );
};

export default BackgroundMusicController;

/**
 * BackgroundMusicController
 * --------------------------
 * 기능:
 * - 배경 음악을 재생, 일시정지, 음소거, 볼륨 조절 가능
 * - 음악 목록 중 랜덤으로 트랙 선택 후 재생
 * - 현재 재생 중인 트랙이 끝나면 다음 랜덤 트랙 자동 재생
 *
 * Props:
 * - musicList: string[]
 *   → 재생 가능한 음악 파일 경로 배열
 *
 * 주요 상태(state):
 * - isPlaying: boolean → 현재 재생 중인지 여부
 * - isMuted: boolean → 음소거 상태 여부
 * - volume: number (0 ~ 1) → 현재 볼륨
 * - currentTrackName: string → 현재 재생 중인 트랙 이름
 *
 * 주요 로직:
 * - getRandomTrack(): 음악 목록에서 랜덤으로 파일 경로 반환
 * - togglePlay(): 재생/일시정지 전환
 * - toggleMute(): 음소거/해제 전환 (볼륨이 0이면 자동 0.5로 복원)
 * - handleVolumeChange(): 볼륨 조절 슬라이더 이벤트 처리
 * - useEffect #1: 컴포넌트 마운트 시 랜덤 트랙 초기 설정 및 자동 재생 종료 후 다음 곡 재생 이벤트 등록
 * - useEffect #2: 볼륨 변경 시 오디오 객체에 반영 및 음소거 상태 업데이트
 *
 * UI 요소:
 * - Play/Pause 버튼
 * - Mute/Unmute 버튼
 * - 볼륨 슬라이더(range input)
 * - 현재 재생 중인 곡명 표시
 */
