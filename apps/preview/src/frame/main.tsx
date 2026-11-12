import { I18nProvider } from '@videojs/react/i18n';
import gsap from 'gsap';
import { type CSSProperties, StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/skin.css';
import './preview.css';
import { playbackProps, playerStyles } from '../shell/params';
import { initialParams, onParamsChange } from './frame';
import { Player } from './player';

function Preview() {
  const [params, setParams] = useState(initialParams);

  useEffect(() => onParamsChange(setParams), []);

   // The player slides up gently when the page opens.
  useEffect(() => {
    const el = document.querySelector('.preview-player');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      el,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)', delay: 0.2, clearProps: 'transform,opacity' }
    );
    return () => {
      tween.kill();
      gsap.set(el, { clearProps: 'transform,opacity' });
    };
  }, []);

  return (
    // The provider loads Video.js's built-in translations for the selected language.
    <I18nProvider locale={params.locale}>
      <div className="preview-player" style={playerStyles(params) as CSSProperties}>
        <Player media={playbackProps(params)} />
      </div>
    </I18nProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview />
  </StrictMode>
);