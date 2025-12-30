import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'impact',
    loadComponent: () =>
      import('./features/impact/impact.component').then((m) => m.ImpactComponent),
  },
  {
    path: 'story',
    loadComponent: () =>
      import('./features/story/story.component').then((m) => m.StoryComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
