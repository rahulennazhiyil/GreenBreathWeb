import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-impact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="impact-container">
      <h1>Environmental Impact</h1>
      <p>Coming soon...</p>
    </div>
  `,
  styles: [
    `
      .impact-container {
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
export class ImpactComponent {}
