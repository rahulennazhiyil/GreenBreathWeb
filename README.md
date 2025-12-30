# 🌿 GreenBreathWeb

**GreenBreathWeb** is a next-generation, immersive web experience built with **Angular 19+**, combining **3D visuals, motion design, scroll-driven storytelling, and ambient sound**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Build for production
ng build

# Run tests
ng test
```

Visit `http://localhost:4200` to see the app in action.

---

## 📦 Tech Stack

### Core

- **Angular 19+** - Standalone Components architecture
- **TypeScript** - Type-safe development
- **RxJS + Signals** - Reactive state management

### 3D & Motion

- **Three.js** - WebGL 3D rendering
- **GSAP + ScrollTrigger** - Advanced animations
- **Web Animations API** - Native browser animations

### Audio

- **Web Audio API** - Spatial and ambient sound

### Styling

- **SCSS** - Advanced CSS with variables
- **CSS Custom Properties** - Dynamic theming
- **GPU-optimized animations** - 60fps target

---

## 🏗️ Architecture

### Core Principles

1. **Separation of Concerns** - UI, 3D, Motion, and Sound are isolated
2. **Single Responsibility** - Each service has one clear purpose
3. **Performance First** - Single WebGL renderer, lazy loading, optimized RAF loop
4. **Accessibility** - Reduced motion support, keyboard navigation, ARIA labels

### Key Services

#### `RendererService`

- Manages the single WebGL renderer instance
- Handles render loop and window resize
- Located: `src/app/core/three/renderer.service.ts`

#### `SceneManagerService`

- Controls Three.js scenes and camera
- Manages scene switching and cleanup
- Located: `src/app/core/three/scene-manager.service.ts`

#### `AudioService`

- Web Audio API context management
- Ambient sounds and effects
- Volume control and fade transitions
- Located: `src/app/core/audio/audio.service.ts`

#### `AnimationService`

- GSAP timeline orchestration
- Scroll tracking and ScrollTrigger integration
- Respects reduced motion preferences
- Located: `src/app/core/animation/animation.service.ts`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # App-wide singletons
│   │   ├── audio/              # Sound engine
│   │   ├── three/              # WebGL renderer & scene manager
│   │   ├── animation/          # GSAP & scroll orchestration
│   │   ├── config/             # App configuration
│   │   └── services/           # Shared services
│   │
│   ├── experience/             # Immersive experience layer
│   │   ├── canvas/             # WebGL canvas component
│   │   ├── scenes/             # Individual 3D scenes
│   │   ├── effects/            # Particles, fog, lighting
│   │   ├── motion/             # Scroll-driven animations
│   │   └── sound/              # Scene-specific sounds
│   │
│   ├── features/               # Lazy-loaded feature modules
│   │   ├── home/               # Landing page
│   │   ├── about/              # About section
│   │   ├── impact/             # Environmental impact
│   │   └── story/              # Story section
│   │
│   ├── layout/                 # App shell components
│   │   ├── header/
│   │   ├── footer/
│   │   ├── navigation/
│   │   └── sound-toggle/       # Audio control
│   │
│   ├── shared/                 # Reusable components
│   │   ├── components/
│   │   ├── directives/
│   │   └── utils/
│   │
│   └── state/                  # Global state management
│
├── assets/                     # Static assets
│   ├── models/                 # GLTF/GLB 3D models
│   ├── textures/               # Texture images
│   ├── sounds/                 # Audio files
│   └── shaders/                # Custom GLSL shaders
│
└── styles/                     # Global styles
    ├── base/
    ├── themes/
    └── animations/
```

---

## 🎮 3D Scene Lifecycle

1. **App Initialization**

   - WebGL canvas created
   - Renderer service initialized
   - Scene manager ready

2. **Route Navigation**

   - Scene manager loads appropriate scene
   - 3D models and textures lazy-loaded
   - RAF loop starts

3. **Scroll Interaction**

   - Scroll position tracked
   - Camera and objects animated
   - ScrollTriggers activated

4. **Route Change**
   - Current scene disposed
   - Resources cleaned up
   - New scene loaded

---

## 🔊 Audio Strategy

- **User Interaction Required** - Audio context initialized only after user gesture
- **Disabled by Default** - Accessibility-first approach
- **Ambient Sounds** - Looping background audio
- **Effects** - One-shot interaction sounds
- **Global Controls** - Mute toggle and volume control
- **Fade Transitions** - Smooth audio transitions

---

## ⚡ Performance Optimizations

### Implemented

- ✅ Single shared WebGL renderer
- ✅ Lazy-loaded routes and components
- ✅ RAF loop only when needed
- ✅ Reduced motion support
- ✅ Optimized pixel ratio (max 2x)
- ✅ Proper resource disposal

### Best Practices

- Use `OnPush` change detection where possible
- Lazy load 3D models and textures
- Dispose Three.js objects properly
- Throttle scroll events
- Use CSS transforms for animations

---

## 🎨 Styling Guidelines

### CSS Variables

All colors, spacing, and transitions are defined as CSS custom properties in `styles.scss`.

### Responsive Design

- Desktop-first approach
- Fluid typography with `clamp()`
- Mobile-optimized interactions

### Animations

- GPU-accelerated (transform, opacity)
- Respect `prefers-reduced-motion`
- 60fps target

---

## ♿ Accessibility

- **Keyboard Navigation** - All interactive elements accessible
- **ARIA Labels** - Proper semantic HTML and ARIA attributes
- **Reduced Motion** - Respects user preferences
- **Focus Indicators** - Clear focus states
- **Color Contrast** - WCAG AA compliant

---

## 🧪 Testing

```bash
# Run unit tests
ng test

# Run e2e tests
ng e2e

# Check coverage
ng test --code-coverage
```

---

## 🚀 Deployment

```bash
# Build for production
ng build --configuration production

# Preview production build
npx http-server dist/greenbreath-web
```

---

## 📝 Development Guidelines

### Component Creation

```bash
# Create a new feature component
ng generate component features/my-feature --standalone

# Create a shared component
ng generate component shared/components/my-component --standalone
```

### Service Creation

```bash
# Create a core service
ng generate service core/services/my-service
```

### Adding 3D Scenes

1. Create scene service in `experience/scenes/`
2. Load models in `ngOnInit`
3. Add to scene via `SceneManagerService`
4. Dispose resources in `ngOnDestroy`

### Adding Animations

1. Use `AnimationService` for GSAP timelines
2. Create ScrollTriggers for scroll-based animations
3. Clean up timelines in component destroy

---

## 🌱 Future Enhancements

- [ ] WebXR / AR support
- [ ] Shader-based breathing effects
- [ ] Real-time environmental data visualization
- [ ] AI-driven motion personalization
- [ ] Progressive Web App (PWA)
- [ ] Internationalization (i18n)

---

## 🏆 Quality Targets

- ✅ **Awwwards-level** visual design
- ✅ **Production-ready** Angular architecture
- ✅ **60fps** performance target
- ✅ **Accessibility** compliant
- ✅ **Type-safe** TypeScript
- ✅ **Clean code** principles

---

## 📄 License

MIT License

---

**GreenBreathWeb**  
_An immersive web experience where technology breathes with nature._

Built with ❤️ using Angular 19+
