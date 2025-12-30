import { Injectable, signal } from '@angular/core';
import * as THREE from 'three';
import { APP_CONFIG } from '../config/app.config';

/**
 * Manages Three.js scenes and camera
 * Handles scene switching and camera updates
 */
@Injectable({
  providedIn: 'root',
})
export class SceneManagerService {
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;

  // Active scene identifier
  readonly activeScene = signal<string | null>(null);

  /**
   * Initialize the scene and camera
   */
  initialize(): void {
    if (this.scene) {
      console.warn('Scene already initialized');
      return;
    }

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.002);

    // Create camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(
      APP_CONFIG.camera.fov,
      aspect,
      APP_CONFIG.camera.near,
      APP_CONFIG.camera.far
    );

    this.camera.position.set(
      APP_CONFIG.camera.initialPosition.x,
      APP_CONFIG.camera.initialPosition.y,
      APP_CONFIG.camera.initialPosition.z
    );

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    console.log('✅ Scene and Camera initialized');
  }

  /**
   * Get the current scene
   */
  getScene(): THREE.Scene | null {
    return this.scene;
  }

  /**
   * Get the camera
   */
  getCamera(): THREE.PerspectiveCamera | null {
    return this.camera;
  }

  /**
   * Update camera aspect ratio on resize
   */
  resize(width: number, height: number): void {
    if (!this.camera) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Clear the scene (remove all objects)
   */
  clearScene(): void {
    if (!this.scene) return;

    while (this.scene.children.length > 0) {
      const object = this.scene.children[0];
      this.scene.remove(object);

      // Dispose geometries and materials
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material?.dispose();
        }
      }
    }
  }

  /**
   * Load a new scene by identifier
   */
  loadScene(sceneId: string): void {
    this.clearScene();
    this.activeScene.set(sceneId);
    console.log(`🎬 Loading scene: ${sceneId}`);

    // Scene-specific loading logic will be handled by individual scene services
  }

  /**
   * Cleanup and dispose
   */
  dispose(): void {
    this.clearScene();
    this.scene = null;
    this.camera = null;
    this.activeScene.set(null);

    console.log('🗑️ Scene Manager disposed');
  }
}
