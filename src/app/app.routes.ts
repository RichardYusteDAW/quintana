import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },

    { path: 'shows', loadComponent: () => import('./pages/shows/shows.component').then(m => m.ShowsComponent) },
    { path: 'shows/family', loadComponent: () => import('./pages/shows/family-show/family-show.component').then(m => m.FamilyShowComponent) },
    { path: 'shows/close-up', loadComponent: () => import('./pages/shows/close-up-show/close-up-show.component').then(m => m.CloseUpShowComponent) },
    { path: 'shows/adults', loadComponent: () => import('./pages/shows/adults-show/adults-show.component').then(m => m.AdultsShowComponent) },
    { path: 'shows/corporate', loadComponent: () => import('./pages/shows/corporate-show/corporate-show.component').then(m => m.CorporateShowComponent) },

    { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
    { path: 'gallery/photos', loadComponent: () => import('./pages/gallery/photos/photos.component').then(m => m.PhotosComponent) },
    { path: 'gallery/videos', loadComponent: () => import('./pages/gallery/videos/videos.component').then(m => m.VideosComponent) },

    { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent) },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];