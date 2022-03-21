import {useState, useEffect} from 'react';
import {registerThemes} from 'react-native-themed-styles';
import {EmitterKey, initTheme} from '.';
import emitter from '../utils/hooks/emitter';
import {DARK_THEME, LIGHT_THEME} from './colorTheme';

const light = LIGHT_THEME;
const dark = DARK_THEME;

export const styleSheetFactory = registerThemes({light, dark}, () => {
  const [colorScheme, setColorScheme] = useState(initTheme.mode);

  useEffect(() => {
    const listener = emitter.addListener(EmitterKey.CHANGE_APP_THEME, theme => {
      setColorScheme(theme);
      initTheme.mode = theme;
    });

    return () => {
      listener.remove();
    };
  }, []);

  return ['light', 'dark'].includes(colorScheme) ? colorScheme : 'light';
});
