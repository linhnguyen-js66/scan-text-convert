import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';

export default function useAppState() {
  const [currentAppState, setCurrentAppState] = useState(AppState.currentState);

  const appStateChange = useCallback((appState: unknown) => {
    setCurrentAppState(appState);
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', appStateChange);
  }, []);

  return {
    currentAppState,
    setCurrentAppState,
  };
}
