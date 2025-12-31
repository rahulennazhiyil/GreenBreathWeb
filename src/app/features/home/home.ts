import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScene } from './home.scene';
import { HomeMotion } from './home.motion';
import { HomeSound } from './home.sound';

/**
 * Home Feature Component
 * Landing page with immersive 3D scene
 */
@Component({
  selector: 'gbw-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  providers: [HomeScene, HomeMotion, HomeSound]
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private readonly scene = inject(HomeScene);
  private readonly motion = inject(HomeMotion);
  private readonly sound = inject(HomeSound);

  ngOnInit(): void {
    // Scene can be loaded early as it targets the global canvas which is always there
    this.scene.load();
    this.sound.init();
  }

  ngAfterViewInit(): void {
    // Motion targets DOM elements, so it must wait for view init
    this.motion.init();
  }

  scrollToExperience(): void {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.scene.dispose();
    this.motion.dispose();
    this.sound.dispose();
  }
}
