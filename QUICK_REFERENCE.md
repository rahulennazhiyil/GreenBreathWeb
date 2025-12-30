# 🚀 GreenBreathWeb - Quick Reference

## Common Commands

```bash
# Development
ng serve                    # Start dev server
ng serve --open            # Start and open browser
ng serve --port 4300       # Custom port

# Build
ng build                   # Development build
ng build --configuration production  # Production build

# Testing
ng test                    # Run unit tests
ng test --code-coverage    # With coverage

# Generate
ng g c features/my-feature --standalone  # New component
ng g s core/services/my-service          # New service
```

---

## Adding a New 3D Scene

### 1. Create Scene Service

```typescript
// src/app/experience/scenes/my-scene.service.ts
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { SceneManagerService } from '../../core/three/scene-manager.service';

@Injectable({ providedIn: 'root' })
export class MySceneService {
  private mesh: THREE.Mesh | null = null;

  constructor(private sceneManager: SceneManagerService) {}

  load(): void {
    const scene = this.sceneManager.getScene();
    if (!scene) return;

    // Create your 3D objects
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xa0e9ff });
    this.mesh = new THREE.Mesh(geometry, material);

    scene.add(this.mesh);
  }

  dispose(): void {
    const scene = this.sceneManager.getScene();
    if (scene && this.mesh) {
      scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      (this.mesh.material as THREE.Material).dispose();
      this.mesh = null;
    }
  }
}
```

### 2. Use in Component

```typescript
import { MySceneService } from '../../experience/scenes/my-scene.service';

export class MyComponent implements OnInit, OnDestroy {
  private readonly myScene = inject(MySceneService);

  ngOnInit(): void {
    this.myScene.load();
  }

  ngOnDestroy(): void {
    this.myScene.dispose();
  }
}
```

---

## Adding Animations

### GSAP Timeline

```typescript
import { AnimationService } from '../../core/animation/animation.service';

export class MyComponent implements OnInit, OnDestroy {
  private readonly animationService = inject(AnimationService);

  ngOnInit(): void {
    const timeline = this.animationService.createTimeline('my-animation');

    timeline
      .to('.element1', { opacity: 1, duration: 1 })
      .to('.element2', { y: 0, duration: 0.8 }, '-=0.5')
      .to('.element3', { scale: 1, duration: 0.6 });
  }

  ngOnDestroy(): void {
    this.animationService.killTimeline('my-animation');
  }
}
```

### ScrollTrigger

```typescript
ngOnInit(): void {
  this.animationService.createScrollTrigger({
    trigger: '.my-section',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    onEnter: () => console.log('Entered'),
    onLeave: () => console.log('Left'),
  });
}
```

---

## Working with Audio

### Load and Play Sound

```typescript
import { AudioService } from '../../core/audio/audio.service';

export class MyComponent implements OnInit {
  private readonly audioService = inject(AudioService);

  async ngOnInit(): Promise<void> {
    // Load sound
    await this.audioService.loadSound('ambient', '/assets/sounds/ambient.mp3');
  }

  playAmbient(): void {
    this.audioService.playAmbient('ambient');
  }

  playEffect(): void {
    this.audioService.playEffect('click');
  }

  toggleMute(): void {
    this.audioService.toggleMute();
  }
}
```

---

## Routing

### Add New Route

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'my-feature',
    loadComponent: () =>
      import('./features/my-feature/my-feature.component').then((m) => m.MyFeatureComponent),
  },
];
```

---

## Styling Patterns

### Using CSS Variables

```scss
.my-component {
  color: var(--color-text);
  background: var(--color-bg);
  padding: var(--spacing-md);
  transition: var(--transition-base);
}
```

### Responsive Typography

```scss
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

### GPU-Accelerated Animations

```scss
.animated-element {
  // Good - uses GPU
  transform: translateX(100px);
  opacity: 0.5;

  // Avoid - triggers layout
  // left: 100px;
  // width: 50%;
}
```

---

## Performance Tips

### 1. Dispose Three.js Resources

```typescript
dispose(): void {
  // Geometry
  mesh.geometry.dispose();

  // Material
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach(m => m.dispose());
  } else {
    mesh.material.dispose();
  }

  // Texture
  material.map?.dispose();
}
```

### 2. Throttle Scroll Events

```typescript
fromEvent(window, 'scroll')
  .pipe(throttleTime(16)) // ~60fps
  .subscribe(() => {
    // Handle scroll
  });
```

### 3. Use OnPush Change Detection

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

---

## Debugging

### Enable Debug Mode

```typescript
// app.config.ts
export const APP_CONFIG = {
  dev: {
    enableDebugMode: true,
    showFPS: true,
    enableGUI: true,
  },
};
```

### Three.js Helpers

```typescript
// Add axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Add grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);
```

---

## Accessibility Checklist

- [ ] All interactive elements have `aria-label`
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Reduced motion respected
- [ ] Color contrast meets WCAG AA
- [ ] Semantic HTML used

---

## File Naming Conventions

```
✅ my-component.component.ts
✅ my-service.service.ts
✅ my-scene.service.ts
✅ app.config.ts

❌ MyComponent.ts
❌ my_component.ts
❌ myComponent.ts
```

---

## Git Workflow (Recommended)

```bash
# Feature branch
git checkout -b feature/my-feature

# Commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature
```

### Commit Message Format

```
feat: add new 3D scene
fix: resolve memory leak in scene disposal
docs: update README
style: format code
refactor: improve animation service
perf: optimize render loop
test: add unit tests for audio service
```

---

## Troubleshooting

### TypeScript Errors

```bash
# Restart TS server in VS Code
Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

### Build Errors

```bash
# Clear cache
rm -rf node_modules .angular
npm install
```

### Three.js Not Rendering

1. Check canvas is in DOM
2. Verify renderer initialized
3. Check scene has objects
4. Ensure camera positioned correctly
5. Verify render loop running

---

## Useful Resources

- [Angular Docs](https://angular.dev)
- [Three.js Docs](https://threejs.org/docs)
- [GSAP Docs](https://greensock.com/docs)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

**Quick Reference v1.0** | GreenBreathWeb
