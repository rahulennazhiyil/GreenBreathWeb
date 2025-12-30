import { Injectable, signal } from '@angular/core';
import { APP_CONFIG } from '../config/app.config';

/**
 * Manages Web Audio API context and sound playback
 * Handles ambient sounds and interaction-based effects
 */
@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGainNode: GainNode | null = null;
  private ambientGainNode: GainNode | null = null;
  private effectsGainNode: GainNode | null = null;

  private ambientSources: Map<string, AudioBufferSourceNode> = new Map();
  private audioBuffers: Map<string, AudioBuffer> = new Map();

  // Reactive state
  readonly isEnabled = signal<boolean>(APP_CONFIG.audio.enabled);
  readonly isMuted = signal<boolean>(false);
  readonly masterVolume = signal<number>(APP_CONFIG.audio.masterVolume);

  /**
   * Initialize the audio context (must be called after user interaction)
   */
  async initialize(): Promise<void> {
    if (this.audioContext) {
      console.warn('Audio context already initialized');
      return;
    }

    try {
      this.audioContext = new AudioContext();

      // Create gain nodes for volume control
      this.masterGainNode = this.audioContext.createGain();
      this.ambientGainNode = this.audioContext.createGain();
      this.effectsGainNode = this.audioContext.createGain();

      // Connect gain nodes
      this.ambientGainNode.connect(this.masterGainNode);
      this.effectsGainNode.connect(this.masterGainNode);
      this.masterGainNode.connect(this.audioContext.destination);

      // Set initial volumes
      this.masterGainNode.gain.value = APP_CONFIG.audio.masterVolume;
      this.ambientGainNode.gain.value = APP_CONFIG.audio.ambientVolume;
      this.effectsGainNode.gain.value = APP_CONFIG.audio.effectsVolume;

      this.isEnabled.set(true);

      console.log('✅ Audio context initialized');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  /**
   * Load an audio file
   */
  async loadSound(id: string, url: string): Promise<void> {
    if (!this.audioContext) {
      console.warn('Audio context not initialized');
      return;
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      this.audioBuffers.set(id, audioBuffer);
      console.log(`🔊 Loaded sound: ${id}`);
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error);
    }
  }

  /**
   * Play an ambient sound (looping)
   */
  playAmbient(id: string): void {
    if (!this.audioContext || !this.ambientGainNode || this.isMuted()) return;

    const buffer = this.audioBuffers.get(id);
    if (!buffer) {
      console.warn(`Sound ${id} not loaded`);
      return;
    }

    // Stop existing source if playing
    this.stopAmbient(id);

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(this.ambientGainNode);
    source.start(0);

    this.ambientSources.set(id, source);
  }

  /**
   * Stop an ambient sound
   */
  stopAmbient(id: string): void {
    const source = this.ambientSources.get(id);
    if (source) {
      source.stop();
      source.disconnect();
      this.ambientSources.delete(id);
    }
  }

  /**
   * Play a one-shot sound effect
   */
  playEffect(id: string): void {
    if (!this.audioContext || !this.effectsGainNode || this.isMuted()) return;

    const buffer = this.audioBuffers.get(id);
    if (!buffer) {
      console.warn(`Sound ${id} not loaded`);
      return;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.effectsGainNode);
    source.start(0);
  }

  /**
   * Toggle mute
   */
  toggleMute(): void {
    const newMuteState = !this.isMuted();
    this.isMuted.set(newMuteState);

    if (this.masterGainNode) {
      this.masterGainNode.gain.value = newMuteState ? 0 : this.masterVolume();
    }
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.masterVolume.set(clampedVolume);

    if (this.masterGainNode && !this.isMuted()) {
      this.masterGainNode.gain.value = clampedVolume;
    }
  }

  /**
   * Fade in audio
   */
  fadeIn(duration: number = APP_CONFIG.audio.fadeInDuration): void {
    if (!this.audioContext || !this.masterGainNode) return;

    const currentTime = this.audioContext.currentTime;
    this.masterGainNode.gain.setValueAtTime(0, currentTime);
    this.masterGainNode.gain.linearRampToValueAtTime(
      this.masterVolume(),
      currentTime + duration / 1000
    );
  }

  /**
   * Fade out audio
   */
  fadeOut(duration: number = APP_CONFIG.audio.fadeOutDuration): void {
    if (!this.audioContext || !this.masterGainNode) return;

    const currentTime = this.audioContext.currentTime;
    this.masterGainNode.gain.setValueAtTime(this.masterVolume(), currentTime);
    this.masterGainNode.gain.linearRampToValueAtTime(0, currentTime + duration / 1000);
  }

  /**
   * Cleanup and dispose
   */
  dispose(): void {
    // Stop all ambient sounds
    this.ambientSources.forEach((source) => {
      source.stop();
      source.disconnect();
    });
    this.ambientSources.clear();

    // Close audio context
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.masterGainNode = null;
    this.ambientGainNode = null;
    this.effectsGainNode = null;
    this.audioBuffers.clear();

    console.log('🗑️ Audio service disposed');
  }
}
