import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { SceneManagerService } from '../../core/three/scene-manager.service';

/**
 * Home Scene - Rotating cube example
 * Demonstrates basic Three.js integration
 */
@Injectable({
  providedIn: 'root',
})
export class HomeSceneService {
  private cube: THREE.Mesh | null = null;
  private animationId: number | null = null;

  constructor(private sceneManager: SceneManagerService) {}

  /**
   * Load and initialize the home scene
   */
  load(): void {
    const scene = this.sceneManager.getScene();
    if (!scene) return;

    // Create a simple rotating cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0xa0e9ff,
      metalness: 0.5,
      roughness: 0.5,
    });

    this.cube = new THREE.Mesh(geometry, material);
    scene.add(this.cube);

    // Add some ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Start animation
    this.animate();

    console.log('✅ Home scene loaded');
  }

  /**
   * Animate the cube
   */
  private animate(): void {
    const animateFrame = () => {
      this.animationId = requestAnimationFrame(animateFrame);

      if (this.cube) {
        this.cube.rotation.x += 0.005;
        this.cube.rotation.y += 0.005;
      }
    };

    animateFrame();
  }

  /**
   * Update scene based on scroll position
   */
  updateScroll(scrollProgress: number): void {
    if (!this.cube) return;

    // Example: Scale cube based on scroll
    const scale = 1 + scrollProgress * 0.5;
    this.cube.scale.set(scale, scale, scale);
  }

  /**
   * Cleanup and dispose
   */
  dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    const scene = this.sceneManager.getScene();
    if (scene && this.cube) {
      scene.remove(this.cube);
      this.cube.geometry.dispose();
      (this.cube.material as THREE.Material).dispose();
      this.cube = null;
    }

    console.log('🗑️ Home scene disposed');
  }
}
