import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/user/home/home.component').then(m => m.HomeComponent) },

    { path: 'shows', loadComponent: () => import('./pages/user/shows/shows.component').then(m => m.ShowsComponent) },
    { path: 'shows/family', loadComponent: () => import('./pages/user/shows/family-show/family-show.component').then(m => m.FamilyShowComponent) },
    { path: 'shows/close-up', loadComponent: () => import('./pages/user/shows/close-up-show/close-up-show.component').then(m => m.CloseUpShowComponent) },
    { path: 'shows/adults', loadComponent: () => import('./pages/user/shows/adults-show/adults-show.component').then(m => m.AdultsShowComponent) },
    { path: 'shows/corporate', loadComponent: () => import('./pages/user/shows/corporate-show/corporate-show.component').then(m => m.CorporateShowComponent) },

    { path: 'gallery', loadComponent: () => import('./pages/user/gallery/gallery.component').then(m => m.GalleryComponent) },
    { path: 'gallery/photos', loadComponent: () => import('./pages/user/gallery/photos/photos.component').then(m => m.PhotosComponent) },
    { path: 'gallery/videos', loadComponent: () => import('./pages/user/gallery/videos/videos.component').then(m => m.VideosComponent) },

    { path: 'blog', loadComponent: () => import('./pages/user/blog/blog.component').then(m => m.BlogComponent) },
    { path: 'contact', loadComponent: () => import('./pages/user/contact/contact.component').then(m => m.ContactComponent) },

    { path: 'admin', loadComponent: () => import('./pages/admin/main/main.component').then(m => m.MainComponent), canActivate: [authGuard] },
    { path: 'admin/login', loadComponent: () => import('./pages/admin/login/login.component').then(m => m.LoginComponent) },
    { path: 'admin/photos', loadComponent: () => import('./pages/admin/main/admin-photos/admin-photos.component').then(m => m.AdminPhotosComponent), canActivate: [authGuard] },
    { path: 'admin/videos', loadComponent: () => import('./pages/admin/main/admin-videos/admin-videos.component').then(m => m.AdminVideosComponent), canActivate: [authGuard] },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];