import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/audio/audio.service';

/**
 * Sound Toggle Component
 * Allows users to enable/disable and mute/unmute audio
 */
@Component({
  selector: 'app-sound-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sound-toggle">
      @if (!audioService.isEnabled()) {
        <button
          class="sound-btn"
          (click)="enableSound()"
          aria-label="Enable sound"
          title="Enable sound"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
          <span>Enable Sound</span>
        </button>
      } @else {
        <button
          class="sound-btn"
          (click)="toggleMute()"
          [attr.aria-label]="audioService.isMuted() ? 'Unmute' : 'Mute'"
          [title]="audioService.isMuted() ? 'Unmute' : 'Mute'"
        >
          @if (audioService.isMuted()) {
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          } @else {
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          }
        </button>
      }
    </div>
  `,
  styles: [
    `
      .sound-toggle {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 1000;
      }

      .sound-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }

        svg {
          stroke-width: 2;
        }

        span {
          @media (max-width: 768px) {
            display: none;
          }
        }
      }
    `,
  ],
})
export class SoundToggleComponent {
  readonly audioService = inject(AudioService);

  async enableSound(): Promise<void> {
    await this.audioService.initialize();
  }

  toggleMute(): void {
    this.audioService.toggleMute();
  }
}
