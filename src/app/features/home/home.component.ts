import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../core/animation/animation.service';
import { HomeSceneService } from '../../experience/scenes/home-scene.service';

/**
 * Home Feature Component
 * Landing page with immersive 3D scene
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="line">Where Technology</span>
            <span class="line">Breathes with Nature</span>
          </h1>
          <p class="hero-subtitle">
            An immersive web experience blending 3D visuals, motion design, and ambient sound
          </p>
          <button class="cta-button" (click)="scrollToExperience()">
            Begin Experience
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" stroke-width="2" />
            </svg>
          </button>
        </div>
      </section>

      <section class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>Scroll to explore</span>
      </section>
    </div>
  `,
  styles: [
    `
      .home-container {
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
      }

      .hero {
        text-align: center;
        padding: 2rem;
        max-width: 1200px;
      }

      .hero-content {
        opacity: 0;
        transform: translateY(30px);
      }

      .hero-title {
        font-size: clamp(2.5rem, 8vw, 6rem);
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #a0e9ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        .line {
          display: block;
          opacity: 0;
          transform: translateY(20px);
        }
      }

      .hero-subtitle {
        font-size: clamp(1rem, 2vw, 1.5rem);
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 2.5rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        opacity: 0;
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        font-size: 1.125rem;
        font-weight: 600;
        color: #000;
        background: linear-gradient(135deg, #a0e9ff 0%, #ffffff 100%);
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(160, 233, 255, 0.4);
        }

        &:active {
          transform: translateY(-1px);
        }

        svg {
          transition: transform 0.3s ease;
        }

        &:hover svg {
          transform: translateY(3px);
        }
      }

      .scroll-indicator {
        position: absolute;
        bottom: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        opacity: 0;
        animation: fadeInBounce 1s ease-out 2s forwards;

        .scroll-line {
          width: 2px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5));
          animation: scrollLineMove 2s ease-in-out infinite;
        }

        span {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      }

      @keyframes fadeInBounce {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes scrollLineMove {
        0%,
        100% {
          transform: translateY(-10px);
          opacity: 0;
        }
        50% {
          transform: translateY(10px);
          opacity: 1;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly animationService = inject(AnimationService);
  private readonly homeScene = inject(HomeSceneService);

  ngOnInit(): void {
    // Load home scene
    this.homeScene.load();

    // Animate hero content
    this.animateHero();
  }

  private animateHero(): void {
    const timeline = this.animationService.createTimeline('hero-intro');

    timeline
      .to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
      .to(
        '.hero-title .line',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        '.hero-subtitle',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        '.cta-button',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      );
  }

  scrollToExperience(): void {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.animationService.killTimeline('hero-intro');
    this.homeScene.dispose();
  }
}
