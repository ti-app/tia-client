import { Font } from 'expo';

const cacheFonts = (fonts) => {
  return (fonts.map(font => Font.loadAsync(font)));
}

export default async function loadAssetsAsync () {
  const fontAssets = cacheFonts([
    {'fontawesome': require('../../assets/fonts/FontAwesome.ttf')}
  ]);

  await Promise.all(fontAssets);
}