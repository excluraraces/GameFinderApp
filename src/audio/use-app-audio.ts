import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { createAudioController, type AudioPreferences } from './controller';

export function useAppAudio(settings: AudioPreferences, ready: boolean, blocked: boolean) {
  const { musicEnabled, soundEnabled, volume } = settings;
  const music = useAudioPlayer(require('../../assets/audio/ambient.wav'));
  const select = useAudioPlayer(require('../../assets/audio/select.wav'));
  const navigate = useAudioPlayer(require('../../assets/audio/navigate.wav'));
  const back = useAudioPlayer(require('../../assets/audio/back.wav'));
  const start = useAudioPlayer(require('../../assets/audio/start.wav'));
  const favorite = useAudioPlayer(require('../../assets/audio/favorite.wav'));
  const unfavorite = useAudioPlayer(require('../../assets/audio/unfavorite.wav'));
  const result = useAudioPlayer(require('../../assets/audio/result.wav'));
  const [modeReady, setModeReady] = useState(false);
  const controller = useMemo(() => createAudioController(music, {
    select, navigate, back, start, favorite, unfavorite, result,
  }), [music, select, navigate, back, start, favorite, unfavorite, result]);

  useEffect(() => {
    let mounted = true;
    void setAudioModeAsync({
      playsInSilentMode: false,
      shouldPlayInBackground: false,
      interruptionMode: 'mixWithOthers',
      allowsRecording: false,
    }).then(() => { if (mounted) setModeReady(true); }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useLayoutEffect(() => {
    controller.configure({ musicEnabled, soundEnabled, volume, ready: ready && modeReady, blocked });
  }, [controller, musicEnabled, soundEnabled, volume, ready, modeReady, blocked]);

  useEffect(() => {
    let loaded = music.isLoaded;
    if (loaded) controller.refreshMusic();
    const subscription = music.addListener("playbackStatusUpdate", status => {
      if (status.isLoaded && !loaded) controller.refreshMusic();
      loaded = status.isLoaded;
    });
    return () => subscription.remove();
  }, [controller, music]);

  useEffect(() => {
    const foreground = () => AppState.currentState === 'active' &&
      (Platform.OS !== 'web' || typeof document === 'undefined' || document.visibilityState !== 'hidden');
    const update = () => controller.configure({ foreground: foreground() });
    update();
    const subscription = AppState.addEventListener('change', update);
    if (Platform.OS === 'web' && typeof document !== 'undefined') document.addEventListener('visibilitychange', update);
    return () => {
      subscription.remove();
      if (Platform.OS === 'web' && typeof document !== 'undefined') document.removeEventListener('visibilitychange', update);
      controller.stop();
    };
  }, [controller]);
  return controller;
}
