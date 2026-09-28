import { ScrollViewStyleReset } from 'expo-router/html';
import { Asset } from 'expo-asset';
import type { PropsWithChildren } from 'react';

const wallpaper = Asset.fromModule(require('../../assets/images/game-background.webp')).uri;

// This is server-rendered: the page is dark even before JavaScript starts.
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030814" />
        <link rel="preload" as="image" href={wallpaper} fetchPriority="high" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: 'html,body{margin:0;background:#030814;color-scheme:dark}#root{background:transparent}' }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
