import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { RendererService } from '../../core/three/renderer.service';
import { SceneManagerService } from '../../core/three/scene-manager.service';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

/**
 * WebGL Canvas Component
 * Hosts the Three.js renderer and manages the render loop
 */
@Component({
  selector: 'app-canvas',
  standalone: true,
  template: `
    <canvas
      #webglCanvas
      class="webgl-canvas"
      [class.initialized]="rendererService.isInitialized()"
    ></canvas>
  `,
  styles: [
    `
      .webgl-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;

        &.initialized {
          opacity: 1;
        }
      }
    `,
  ],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('webglCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly rendererService = inject(RendererService);
  private readonly sceneManager = inject(SceneManagerService);

  ngOnInit(): void {
    // Initialize scene manager
    this.sceneManager.initialize();
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;

    // Initialize renderer
    this.rendererService.initialize(canvas);

    // Start render loop
    this.rendererService.startRenderLoop(() => this.render());

    // Handle window resize
    fromEvent(window, 'resize')
      .pipe(throttleTime(100))
      .subscribe(() => this.onResize());
  }

  /**
   * Main render function
   */
  private render(): void {
    const renderer = this.rendererService.getRenderer();
    const scene = this.sceneManager.getScene();
    const camera = this.sceneManager.getCamera();

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  /**
   * Handle window resize
   */
  private onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.rendererService.resize(width, height);
    this.sceneManager.resize(width, height);
  }

  ngOnDestroy(): void {
    this.rendererService.stopRenderLoop();
  }
}
