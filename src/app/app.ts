import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasComponent } from './experience/canvas/canvas.component';
import { SoundToggleComponent } from './layout/sound-toggle/sound-toggle.component';
import { AnimationService } from './core/animation/animation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CanvasComponent, SoundToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly animationService = inject(AnimationService);

  ngOnInit(): void {
    // Initialize animation/scroll service
    this.animationService.initialize();
  }
}
