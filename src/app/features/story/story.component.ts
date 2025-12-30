import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="story-container">
      <h1>Our Story</h1>
      <p>Coming soon...</p>
    </div>
  `,
  styles: [
    `
      .story-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        padding: 2rem;
      }

      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class StoryComponent {}
