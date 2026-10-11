import { createAudioPlayer } from 'expo-audio';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { createAudioController, type AudioPreferences, type SoundCue } from './controller';

type Controller = ReturnType<typeof createAudioController>;
const sources = {
  select: require('../../assets/audio/select.wav'),
  navigate: require('../../assets/audio/navigate.wav'),
  back: require('../../assets/audio/back.wav'),
  start: require('../../assets/audio/start.wav'),
  favorite: require('../../assets/audio/favorite.wav'),
  unfavorite: require('../../assets/audio/unfavorite.wav'),
  result: require('../../assets/audio/result.wav'),
};

// Expo's web player constructs HTMLAudioElement immediately. Create it in an
// effect so static HTML and its wallpaper can render without a browser Audio API.
export function useAppAudio(settings: AudioPreferences, ready: boolean, blocked: boolean) {
  const { musicEnabled, soundEnabled, volume } = settings;
  const live = useRef<Controller | null>(null);
  const options = useRef<Parameters<Controller['configure']>[0]>({});
  const api = useMemo(() => ({
    configure(next: Parameters<Controller['configure']>[0]) {
      options.current = { ...options.current, ...next };
      live.current?.configure(next);
    },
    interact(cue?: SoundCue) { live.current?.interact(cue); },
    play(cue: SoundCue) { return live.current?.play(cue) ?? Promise.resolve(); },
    refreshMusic() { live.current?.refreshMusic(); },
    stop() { live.current?.stop(); },
  }), []);

  useLayoutEffect(() => {
    api.configure({ musicEnabled, soundEnabled, volume, ready, blocked });
  }, [api, musicEnabled, soundEnabled, volume, ready, blocked]);

  useEffect(() => {
    const players: ReturnType<typeof createAudioPlayer>[] = [];
    try {
      const create = (source: number) => {
        const player = createAudioPlayer(source);
        players.push(player);
        return player;
      };
      const music = create(require('../../assets/audio/ambient.wav'));
      const cues = Object.fromEntries(Object.entries(sources).map(([cue, source]) => [cue, create(source)])) as Record<SoundCue, ReturnType<typeof createAudioPlayer>>;
      const controller = createAudioController(music, cues);
      live.current = controller;
      controller.configure({ ...options.current, foreground: document.visibilityState !== 'hidden' });
      let loaded = music.isLoaded;
      const subscription = music.addListener('playbackStatusUpdate', status => {
        if (!loaded && status.isLoaded) controller.refreshMusic();
        loaded = status.isLoaded;
      });
      const onVisibility = () => controller.configure({ foreground: document.visibilityState !== 'hidden' });
      document.addEventListener('visibilitychange', onVisibility);
      return () => {
        live.current = null;
        controller.stop();
        subscription.remove();
        document.removeEventListener('visibilitychange', onVisibility);
        players.forEach(player => player.remove());
      };
    } catch {
      live.current = null;
      players.forEach(player => player.remove());
      // The UI must still open when the browser cannot initialize audio.
    }
  }, []);
  return api;
}
