import { ref, watch, computed } from 'vue'

export interface TrackInfo {
    url: string
    title: string
    artist: string
    source: string
}

// Estado global con 4 canciones
const tracks: TrackInfo[] = [
    { 
        url: '/audio/track1.mp3', 
        title: 'Cielo Violeta', 
        artist: 'FiftySounds', 
        source: 'fiftysounds.com' 
    },
    { 
        url: '/audio/track2.mp3', 
        title: 'City Life', 
        artist: 'Spiring', 
        source: 'freetouse.com' 
    },
    { 
        url: '/audio/track3.mp3', 
        title: 'Sunshine', 
        artist: 'Sunova', 
        source: 'freetouse.com' 
    },
    { 
        url: '/audio/track4.mp3', 
        title: 'Island', 
        artist: 'Luke Bergs', 
        source: 'freetouse.com' 
    }
]

const currentTrackIndex = ref(0)
const isPlaying = ref(false)
const isMuted = ref(true)
const volume = ref<number[]>([50])
let audio: HTMLAudioElement | null = null

export function useMusic() {
    // Variable computada para saber qué canción suena ahora
    const currentTrack = computed(() => tracks[currentTrackIndex.value])

    // Inicializacion
    if (!audio && typeof window !== 'undefined') {
        audio = new Audio()
        const currentVol = volume.value[0] ?? 50
        audio.volume = currentVol / 100
        audio.muted = true 

        // Cargamos la primera pista
        loadTrack(currentTrackIndex.value)

        // Autoplay silencioso
        audio.play().then(() => {
            isPlaying.value = true
        }).catch(() => {})
        
        audio.addEventListener('ended', nextTrack)
    }

    function updateChromePlayer(index: number) {
        const track = tracks[index]
        if (track && 'mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: track.title,
                artist: track.artist,
                album: 'Portfolio Mencía Li'
            })
            
            // Permitimos cambiar desde Chrome/Teclado
            navigator.mediaSession.setActionHandler('nexttrack', nextTrack)
            navigator.mediaSession.setActionHandler('previoustrack', prevTrack)
        }
    }

    function loadTrack(index: number) {
        if (!audio) return
        const track = tracks[index]
        if (track) {
            audio.src = track.url
            audio.load()
            updateChromePlayer(index)
        }
    }

    function togglePlay() {
        if (!audio) return
        if (isPlaying.value) {
            audio.pause()
        } else {
            audio.play().catch(() => {})
        }
        isPlaying.value = !isPlaying.value
    }

    function toggleMute() {
        if (!audio) return
        isMuted.value = !isMuted.value
        audio.muted = isMuted.value
    }

    function nextTrack() {
        if (!audio) return
        if (tracks.length === 1) {
            audio.currentTime = 0
            if (isPlaying.value) audio.play()
            return
        }
        currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length
        loadTrack(currentTrackIndex.value)
        if (isPlaying.value) audio.play().catch(() => {})
    }

    function prevTrack() {
        if (!audio) return
        
        // Si la canción lleva más de 3 segundos, reiniciarla
        if (audio.currentTime > 3) {
            audio.currentTime = 0
            return
        }

        if (tracks.length === 1) {
            audio.currentTime = 0
            if (isPlaying.value) audio.play()
            return
        }

        // Si no, volver a la anterior (bucle circular)
        currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.length) % tracks.length
        loadTrack(currentTrackIndex.value)
        
        if (isPlaying.value) audio.play().catch(() => {})
    }

    // REACTIVIDAD DEL VOLUMEN
    watch(volume, (newVolume) => {
        if (audio) {
            const vol = newVolume[0] ?? 0
            audio.volume = vol / 100
            
            if (vol === 0 && !isMuted.value) {
                isMuted.value = true
                audio.muted = true
            } else if (vol > 0 && isMuted.value) {
                isMuted.value = false
                audio.muted = false
            }
        }
    }, { deep: true })

    return {
        isPlaying,
        isMuted,
        volume,
        currentTrack,
        togglePlay,
        toggleMute,
        nextTrack,
        prevTrack
    }
}