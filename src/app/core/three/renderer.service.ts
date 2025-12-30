import { Injectable, inject, signal } from '@angular/core';
import * as THREE from 'three';
import { APP_CONFIG } from '../config/app.config';

/**
 * Singleton service managing the WebGL renderer
 * Ensures only one renderer instance across the entire app
 */
@Injectable({
  providedIn: 'root',
})
export class RendererService {
  private renderer: THREE.WebGLRenderer | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private animationFrameId: number | null = null;

  // Signals for reactive state
  readonly isInitialized = signal(false);
  readonly isRendering = signal(false);

  /**
   * Initialize the WebGL renderer with a canvas element
   */
  initialize(canvas: HTMLCanvasElement): void {
    if (this.renderer) {
      console.warn('Renderer already initialized');
      return;
    }

    this.canvas = canvas;

    // Create WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: APP_CONFIG.renderer.alpha,
      antialias: APP_CONFIG.performance.antialias,
      powerPreference: APP_CONFIG.performance.powerPreference,
      preserveDrawingBuffer: APP_CONFIG.renderer.preserveDrawingBuffer,
      failIfMajorPerformanceCaveat: APP_CONFIG.renderer.failIfMajorPerformanceCaveat,
    });

    // Configure renderer
    this.renderer.setPixelRatio(APP_CONFIG.performance.pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.isInitialized.set(true);

    console.log('✅ WebGL Renderer initialized');
  }

  /**
   * Get the renderer instance
   */
  getRenderer(): THREE.WebGLRenderer | null {
    return this.renderer;
  }

  /**
   * Handle window resize
   */
  resize(width: number, height: number): void {
    if (!this.renderer) return;
    this.renderer.setSize(width, height);
  }

  /**
   * Start the render loop
   */
  startRenderLoop(renderCallback: () => void): void {
    if (this.isRendering()) return;

    this.isRendering.set(true);

    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      renderCallback();
    };

    animate();
  }

  /**
   * Stop the render loop
   */
  stopRenderLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isRendering.set(false);
  }

  /**
   * Cleanup and dispose renderer
   */
  dispose(): void {
    this.stopRenderLoop();

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    this.canvas = null;
    this.isInitialized.set(false);

    console.log('🗑️ Renderer disposed');
  }
}
