import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APP_CONFIG } from '../config/app.config';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Manages scroll-driven animations and GSAP timelines
 * Orchestrates motion based on scroll position
 */
@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  // Scroll state
  readonly scrollProgress = signal(0);
  readonly scrollY = signal(0);
  readonly scrollDirection = signal<'up' | 'down'>('down');

  private lastScrollY = 0;
  private timelines: Map<string, gsap.core.Timeline> = new Map();
  private scrollTriggers: ScrollTrigger[] = [];

  /**
   * Initialize scroll tracking
   */
  initialize(): void {
    // Track scroll position
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(16), // ~60fps
        map(() => window.scrollY)
      )
      .subscribe((scrollY) => {
        this.scrollY.set(scrollY);

        // Calculate scroll progress (0 to 1)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        this.scrollProgress.set(progress);

        // Determine scroll direction
        const direction = scrollY > this.lastScrollY ? 'down' : 'up';
        this.scrollDirection.set(direction);
        this.lastScrollY = scrollY;
      });

    // Respect reduced motion preference
    if (APP_CONFIG.accessibility.respectReducedMotion) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.globalTimeline.timeScale(0);
        console.log('⚠️ Reduced motion enabled - animations disabled');
      }
    }

    console.log('✅ Animation service initialized');
  }

  /**
   * Create a GSAP timeline
   */
  createTimeline(id: string, config?: gsap.TimelineVars): gsap.core.Timeline {
    const timeline = gsap.timeline(config);
    this.timelines.set(id, timeline);
    return timeline;
  }

  /**
   * Get a timeline by ID
   */
  getTimeline(id: string): gsap.core.Timeline | undefined {
    return this.timelines.get(id);
  }

  /**
   * Create a scroll-triggered animation
   */
  createScrollTrigger(config: ScrollTrigger.Vars): ScrollTrigger {
    const trigger = ScrollTrigger.create(config);
    this.scrollTriggers.push(trigger);
    return trigger;
  }

  /**
   * Animate an element with GSAP
   */
  animate(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    return gsap.to(target, vars);
  }

  /**
   * Animate from current state
   */
  animateFrom(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    return gsap.from(target, vars);
  }

  /**
   * Set properties immediately (no animation)
   */
  set(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    return gsap.set(target, vars);
  }

  /**
   * Kill a timeline
   */
  killTimeline(id: string): void {
    const timeline = this.timelines.get(id);
    if (timeline) {
      timeline.kill();
      this.timelines.delete(id);
    }
  }

  /**
   * Kill all timelines
   */
  killAllTimelines(): void {
    this.timelines.forEach((timeline) => timeline.kill());
    this.timelines.clear();
  }

  /**
   * Refresh all ScrollTriggers (call after DOM changes)
   */
  refreshScrollTriggers(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Cleanup and dispose
   */
  dispose(): void {
    this.killAllTimelines();

    // Kill all scroll triggers
    this.scrollTriggers.forEach((trigger) => trigger.kill());
    this.scrollTriggers = [];

    ScrollTrigger.killAll();

    console.log('🗑️ Animation service disposed');
  }
}
