/** @jsxImportSource react */

import { VolumePopover as VolumePopoverPrimitive, VolumeSlider } from '@videojs/react';

import { cn } from '@/lib/resolve-class-name';

import { MuteButton } from './mute-button';
import { ButtonTooltip } from './tooltip';

export function VolumePopover() {
  return (
    <VolumePopoverPrimitive.Root openOnHover delay={200} closeDelay={100} side="top">
      <ButtonTooltip delay={0} disabled sticky>
        <VolumePopoverPrimitive.Trigger render={<MuteButton />} />
      </ButtonTooltip>
      <VolumePopoverPrimitive.Popup
        className={cn(
          'bangle-vol-popup',
          'm-0 overflow-visible border-0 text-inherit',
          'media-transitioning:opacity-0 media-transitioning:blur-media-hidden-popup media-transitioning:scale-media-hidden-popup',
          'data-starting-style:transform-[translate(var(--media-popup-translate-x-distance,0),var(--media-popup-translate-y-distance,0))]',
          'data-ending-style:transform-none',
          'data-[side=top]:origin-bottom data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left',
          'data-[side=top]:[--media-popup-translate-y-distance:var(--media-popup-translate-distance)]',
          'data-[side=bottom]:[--media-popup-translate-y-distance:calc(var(--media-popup-translate-distance)*-1)]',
          'data-[side=left]:[--media-popup-translate-x-distance:var(--media-popup-translate-distance)]',
          'data-[side=right]:[--media-popup-translate-x-distance:calc(var(--media-popup-translate-distance)*-1)]',
          'before:pointer-events-auto before:absolute',
          'data-[side=top]:before:inset-x-0 data-[side=top]:before:top-full',
          'data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:bottom-full',
          'data-[side=left]:before:inset-y-0 data-[side=left]:before:left-full',
          'data-[side=right]:before:inset-y-0 data-[side=right]:before:right-full',
          'data-[side=top]:before:h-(--media-popup-side-offset) data-[side=bottom]:before:h-(--media-popup-side-offset)',
          'data-[side=left]:before:w-(--media-popup-side-offset) data-[side=right]:before:w-(--media-popup-side-offset)',
          'z-20 h-28 w-10 rounded-xl bg-media-popover px-2.5 py-3 text-media-popover-foreground',
          'shadow-none [--media-popup-side-offset:var(--media-popover-side-offset)] [--media-popover-side-offset:calc(var(--media-spacing)*9)]',
          'media-high-contrast:outline forced-colors:outline'
        )}
      >
        <VolumeSlider.Root
          className={
            '[--media-accent:var(--media-accent-color,var(--media-popover-foreground))] relative flex size-full cursor-pointer justify-center data-disabled:cursor-not-allowed data-disabled:opacity-40'
          }
          orientation="vertical"
          thumbAlignment="edge"
        >
          <VolumeSlider.Track
            className={cn(
              'bangle-vol-track absolute bottom-0 left-1/2 h-full w-5 transform-[translateX(-50%)] overflow-hidden rounded-md forced-colors:forced-color-adjust-none',
              'forced-colors:bg-[Canvas] forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]'
            )}
          >
            <VolumeSlider.Fill
              className={
                'bangle-vol-fill absolute bottom-0 left-0 h-[var(--media-slider-fill,0%)] w-full forced-colors:bg-[Highlight] forced-colors:forced-color-adjust-none'
              }
            />
          </VolumeSlider.Track>
          <VolumeSlider.Thumb
            className={cn(
              'bangle-thumb absolute bottom-[var(--media-slider-fill,0%)] left-1/2 size-4 transform-[translate(-50%,50%)] rounded-full',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
              'forced-colors:forced-color-adjust-none'
            )}
          />
         <VolumeSlider.Value className="bangle-vol-value" type="current" />
        </VolumeSlider.Root>
      </VolumePopoverPrimitive.Popup>
    </VolumePopoverPrimitive.Root>
  );
}