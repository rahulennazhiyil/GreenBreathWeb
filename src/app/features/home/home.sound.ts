import { Injectable, inject } from '@angular/core';
import { AudioService } from '../../core/audio/audio.service';

@Injectable()
export class HomeSound {
  private readonly audioService = inject(AudioService);
  private hasInteracted = false;

  init(): void {
    // Ambient breathing / wind sound
    // We would typically load a sound here.
    // this.audioService.loadSound('breath', 'assets/sounds/breath.mp3');
    // Since we don't have assets, we can't really play anything, but we'll setup the structure.

    // Fade in after user interaction
    const interactionHandler = () => {
      if (!this.hasInteracted) {
        this.hasInteracted = true;
        this.audioService.initialize().then(() => {
             // this.audioService.playAmbient('breath');
             this.audioService.fadeIn(2000);
        });

        // Remove listeners
        window.removeEventListener('click', interactionHandler);
        window.removeEventListener('scroll', interactionHandler);
      }
    };

    window.addEventListener('click', interactionHandler);
    window.addEventListener('scroll', interactionHandler);
  }

  dispose(): void {
    // this.audioService.stopAmbient('breath');
    // or just let the audio service manage global state, but if the sound is specific to Home:
    // this.audioService.stopAmbient('breath');
  }
}
