import { Injectable, inject } from '@angular/core';
import * as THREE from 'three';
import { SceneManagerService } from '../../core/three/scene-manager.service';

@Injectable()
export class HomeScene {
  private readonly sceneManager = inject(SceneManagerService);

  private sphere: THREE.Mesh | null = null;
  private animationId: number | null = null;

  load(): void {
    const scene = this.sceneManager.getScene();
    if (!scene) return;

    // Subtle fog
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    // Floating sphere / Earth-like object
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x2E8B57, // Sea Green
      metalness: 0.1,
      roughness: 0.8,
      emissive: 0x001100,
      emissiveIntensity: 0.2
    });

    this.sphere = new THREE.Mesh(geometry, material);
    scene.add(this.sphere);

    // Soft green lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft white
    scene.add(ambientLight);

    const greenLight = new THREE.PointLight(0x00ff00, 1, 100);
    greenLight.position.set(5, 5, 5);
    scene.add(greenLight);

    const backLight = new THREE.DirectionalLight(0xa0e9ff, 0.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    // Start breathing animation
    this.animate();

    console.log('🌿 Home scene loaded');
  }

  // Allow external control for scroll interactions
  getSphere(): THREE.Mesh | null {
    return this.sphere;
  }

  private animate(): void {
    const animateFrame = () => {
      this.animationId = requestAnimationFrame(animateFrame);

      if (this.sphere) {
        // Base rotation (slow idle)
        this.sphere.rotation.y += 0.0005;

        // Breathing effect (scale)
        const time = Date.now() * 0.001;
        const scale = 1 + Math.sin(time) * 0.02;
        this.sphere.scale.set(scale, scale, scale);
      }
    };

    animateFrame();
  }

  dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    const scene = this.sceneManager.getScene();
    if (scene && this.sphere) {
      scene.remove(this.sphere);
      this.sphere.geometry.dispose();
      (this.sphere.material as THREE.Material).dispose();
      this.sphere = null;
    }

    if (scene) {
        scene.fog = null;
    }

    console.log('🍂 Home scene disposed');
  }
}
