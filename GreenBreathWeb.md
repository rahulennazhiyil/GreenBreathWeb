````md
# 🌿 GreenBreathWeb

**GreenBreathWeb** is a next-generation, immersive web experience built with **Angular 19+**, combining **3D visuals, motion design, scroll-driven storytelling, and ambient sound**.  
It blends **nature + technology** to create a calm, futuristic, and award-level web experience.

This README is **intentionally written for AI-integrated IDEs** (Antigravity, Cursor, VS Code Copilot, JetBrains AI) so that tooling clearly understands **architecture, conventions, and intent**.

---

## 🚀 Vision

Create a website that feels **alive and breathing**.

- Immersive 3D environments
- Cinematic motion & transitions
- Scroll-based storytelling
- Ambient, reactive sound design
- High performance & clean Angular architecture

---

## 🧠 Core Principles

- **Angular 19+ (Standalone-first)**
- **Modern Angular syntax only**
- **Feature-based architecture**
- **Experience-first design**
- **Strict separation of UI, Motion, 3D, and Sound**
- **Performance-driven (60fps target)**
- **Accessibility & graceful fallbacks**
- **AI-friendly codebase**

---

## 🆕 Angular 19+ Conventions Used (IMPORTANT)

GreenBreathWeb **does not follow legacy Angular patterns**.  
All code strictly follows **new Angular naming, syntax, and APIs**.

### 🔄 File Naming Convention (Angular 19+)

| Purpose                 | Legacy                | GreenBreathWeb (New) |
| ----------------------- | --------------------- | -------------------- |
| Root component class    | `app.component.ts`    | `app.ts`             |
| Root template           | `app.component.html`  | `app.html`           |
| Root styles             | `app.component.scss`  | `app.scss`           |
| Feature component class | `home.component.ts`   | `home.ts`            |
| Feature template        | `home.component.html` | `home.html`          |
| Feature styles          | `home.component.scss` | `home.scss`          |
| Routing                 | `*.routing.ts`        | `*.routes.ts`        |
| App config              | `environment.ts`      | `app.config.ts`      |

✅ Flat, readable, intention-revealing filenames  
❌ No `.component.*` suffix  
❌ No NgModules

---

## 🧱 Modern Angular Syntax Used

### ✅ Standalone Components Only

No `@NgModule` anywhere in the project.

```ts
@Component({
  standalone: true,
  selector: 'gbw-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}
```
````

---

### ✅ New Control Flow Syntax

Legacy directives like `*ngIf`, `*ngFor`, `*ngSwitch` are **NOT used**.

#### ✔ `@if`

```html
@if (isSoundEnabled()) {
<button>Mute</button>
}
```

#### ✔ `@for`

```html
@for (scene of scenes(); track scene.id) {
<gbw-scene-card [scene]="scene" />
}
```

#### ✔ `@switch`

```html
@switch (activeSection()) { @case ('home') { <gbw-home /> } @case ('impact') { <gbw-impact /> } }
```

---

### ✅ Signals-First State Management

- Signals for UI & reactive state
- RxJS only for:

  - Scroll streams
  - Animation timelines
  - Time-based orchestration

```ts
const soundEnabled = signal(false);
```

---

### ✅ Functional Providers & Config

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()],
};
```

---

## 🛠️ Tech Stack

### Frontend

- Angular 19+ (Standalone APIs)
- TypeScript
- Signals + RxJS

### 3D & Motion

- Three.js (WebGL)
- GSAP + ScrollTrigger
- Web Animations API

### Audio

- Web Audio API
- Ambient & interaction-based sound

### Styling

- SCSS
- CSS Variables
- GPU-friendly animations

---

## 📁 Project Structure (Modern Angular)

```
src/
│
├── app/
│   ├── core/                     # App-wide singletons
│   │   ├── audio/                # Audio engine & context
│   │   ├── three/                # Three.js renderer & scene manager
│   │   ├── animation/            # Scroll & GSAP orchestration
│   │   ├── config/               # App configuration
│   │   └── services/
│   │
│   ├── shared/                   # Reusable UI & utilities
│   │   ├── components/
│   │   ├── directives/
│   │   └── utils/
│   │
│   ├── experience/               # Immersive experience layer
│   │   ├── canvas/               # WebGL canvas host
│   │   ├── scenes/               # 3D scenes
│   │   ├── effects/              # Fog, particles, lighting
│   │   ├── motion/               # Scroll-driven animation logic
│   │   └── sound/                # Scene-specific sound logic
│   │
│   ├── features/                 # Lazy-loaded sections
│   │   ├── home/
│   │   │   ├── home.ts
│   │   │   ├── home.html
│   │   │   ├── home.scss
│   │   │   ├── home.scene.ts
│   │   │   ├── home.motion.ts
│   │   │   └── home.sound.ts
│   │   ├── about/
│   │   ├── impact/
│   │   ├── story/
│   │   └── cta/
│   │
│   ├── layout/                   # App shell
│   │   ├── header/
│   │   ├── footer/
│   │   ├── navigation/
│   │   └── sound-toggle/
│   │
│   ├── state/                    # Global state
│   │   ├── experience.store.ts
│   │   ├── audio.store.ts
│   │   └── scroll.store.ts
│   │
│   ├── app.ts
│   ├── app.html
│   ├── app.scss
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets/
│   ├── models/
│   ├── textures/
│   ├── sounds/
│   └── shaders/
│
├── styles/
│   ├── base/
│   ├── themes/
│   ├── animations/
│   └── variables.scss
│
└── main.ts
```

---

## 🧩 Architecture Overview

### UI Layer

- Standalone components
- Pure presentation
- Zero business logic

### Experience Layer (Core Innovation)

- Single WebGL canvas
- Scene lifecycle management
- Scroll & interaction driven

### Motion Layer

- GSAP timelines
- Scroll → animation mapping
- Scene-aware transitions

### Sound Layer

- Central AudioContext
- Ambient loops
- Interaction-based sound effects
- Global mute & fade control

### State Layer

- Signals for UI state
- RxJS for time-based & scroll streams

---

## 🎮 3D & Scene Lifecycle

1. App initializes WebGL canvas
2. Scene manager loads active scene
3. Models & textures lazy-loaded
4. RAF loop starts only when needed
5. Scroll updates camera & animations
6. Scene disposed on route change

---

## 🔊 Sound Design Strategy

- Sound starts **only after user interaction**
- Scroll subtly modulates volume & filters
- Global sound toggle
- Accessibility-first defaults (muted)

---

## ⚡ Performance Strategy

- Lazy-loaded routes, scenes, and assets
- Single shared WebGL renderer
- requestAnimationFrame paused when inactive
- Reduced-motion preference support
- Progressive enhancement for low-end devices

---

## 🧭 Routing Strategy

- Feature-based lazy loading
- Routes control scenes, motion, and sound
- Clean and minimal URLs

---

## 📱 Responsiveness & Accessibility

- Desktop-first immersive experience
- Mobile-optimized interactions
- Keyboard navigation
- ARIA-friendly components
- Motion reduction support

---

## 🏗️ Development Rules (Strict)

- ✅ Standalone Components only
- ✅ New Angular control flow syntax
- ❌ No NgModules
- ❌ No legacy directives
- ❌ No `.component.*` files
- ✅ Clear separation of concerns
- ✅ AI-friendly, readable code

---

## 🌱 Future Enhancements

- WebXR / AR experiences
- Shader-based breathing effects
- Real-time environmental data
- AI-driven motion personalization

---

## 🏆 Quality Target

- Awwwards-level experience
- Recruiter-impressive architecture
- Production-ready Angular 19+ codebase

---

## 📄 License

MIT License

---

**GreenBreathWeb**
_An immersive web experience where technology breathes with nature._

```

---

If you want next, I can:
- Create **Antigravity / Cursor rules files**
- Generate a **Day-1 working Angular 19 starter**
- Validate AI-generated code against this README
- Help you start **Phase-1 implementation cleanly**

Just say the word 🌿🚀
```
