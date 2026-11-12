/** @jsxImportSource react */

import { Slider as SliderPrimitive } from '@videojs/react';
import { TimeSlider as TimeSliderPrimitive } from '@videojs/react';

import { cn } from '@/lib/resolve-class-name';

export function TimeSlider({ audio = false, renderThumbnail }: ThumbnailSlot & { audio?: boolean } = {}) {
  return (
    <div className={'w-full'}>
      <TimeSliderPrimitive.Root
        className={cn(
          'bangle-root group/slider relative flex h-6 min-w-12 flex-1 cursor-pointer items-center',
          'before:absolute before:inset-x-0 before:-inset-y-3 before:content-[""]',
          'data-disabled:cursor-not-allowed data-disabled:opacity-40 forced-colors:data-disabled:text-[GrayText] forced-colors:data-disabled:opacity-100',
          audio && 'bangle-audio'
        )}
        thumbAlignment="edge"
      >
        <TimeSliderPrimitive.Chapters
          className={'relative flex size-full items-center'}
          renderChapter={(props) => (
            <div
              className={cn(
                'absolute inset-0 flex items-center clip-media-chapter-x',
                '[--media-chapter-inset-start:0.5] [--media-chapter-inset-end:0.5]',
                'first-of-type:[--media-chapter-inset-start:0] last-of-type:[--media-chapter-inset-end:0]'
              )}
              {...props}
            >
              <TimeSliderPrimitive.Track className={'bangle-track absolute inset-x-0 isolate h-3.5'}>
                <TimeSliderPrimitive.Buffer className={'bangle-buffer'} />
                <TimeSliderPrimitive.Fill className={'bangle-fill'} />
              </TimeSliderPrimitive.Track>
            </div>
          )}
        ></TimeSliderPrimitive.Chapters>
        <TimeSliderPrimitive.Thumb
          className={cn(
            'bangle-thumb absolute left-[var(--media-slider-fill,0%)] size-5 transform-[translateX(-50%)] rounded-full',
            'group-data-dragging/slider:left-(--media-slider-pointer)',
            'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
            'forced-colors:forced-color-adjust-none'
          )}
        />

        <TimeSliderPrimitive.Preview
          className={cn(
            'pointer-events-none bottom-[calc(100%+var(--media-spacing)*3)] grid max-w-39 origin-bottom justify-items-center gap-1',
            'opacity-0 group-data-disabled/slider:hidden',
            'group-data-pointing/slider:opacity-100',
            'group-data-dragging/slider:opacity-100'
          )}
        >
          {renderThumbnail && (
  <SliderPrimitive.Thumbnail.Root className={'block max-w-39 overflow-hidden rounded-md bg-media-background'}>
    <SliderPrimitive.Thumbnail.Image render={renderThumbnail} className={'block'} />
  </SliderPrimitive.Thumbnail.Root>
)}
          <div className={'bangle-tip flex w-full min-w-0 justify-center px-2 py-1 media-high-contrast:outline forced-colors:outline'}>
            <div className={'flex max-w-full min-w-0 items-center gap-2'}>
              <TimeSliderPrimitive.Value className={'shrink-0 tabular-nums'} type="pointer" />
              <TimeSliderPrimitive.ChapterTitle className={'min-w-0 truncate opacity-70 empty:hidden'} />
            </div>
          </div>
        </TimeSliderPrimitive.Preview>
      </TimeSliderPrimitive.Root>
    </div>
  );
}

export interface ThumbnailSlot {
  /** Draws the storyboard frame in the slider preview in place of the one the skin renders. */
  renderThumbnail?: SliderPrimitive.Thumbnail.ImageProps['render'];
}