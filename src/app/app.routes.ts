import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

import { AdminPhotosComponent } from './pages/admin/main/admin-photos/admin-photos.component';
import { AdminVideosComponent } from './pages/admin/main/admin-videos/admin-videos.component';
import { AdultsShowComponent } from './pages/user/shows/adults-show/adults-show.component';
import { BlogComponent } from './pages/user/blog/blog.component';
import { CloseUpShowComponent } from './pages/user/shows/close-up-show/close-up-show.component';
import { ContactComponent } from './pages/user/contact/contact.component';
import { CorporateShowComponent } from './pages/user/shows/corporate-show/corporate-show.component';
import { FamilyShowComponent } from './pages/user/shows/family-show/family-show.component';
import { GalleryComponent } from './pages/user/gallery/gallery.component';
import { HomeComponent } from './pages/user/home/home.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { MainComponent } from './pages/admin/main/main.component';
import { PhotosComponent } from './pages/user/gallery/photos/photos.component';
import { ShowsComponent } from './pages/user/shows/shows.component';
import { VideosComponent } from './pages/user/gallery/videos/videos.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },

    { path: 'shows', component: ShowsComponent },
    { path: 'shows/family', component: FamilyShowComponent },
    { path: 'shows/close-up', component: CloseUpShowComponent },
    { path: 'shows/adults', component: AdultsShowComponent },
    { path: 'shows/corporate', component: CorporateShowComponent },

    { path: 'gallery', component: GalleryComponent },
    { path: 'gallery/photos', component: PhotosComponent },
    { path: 'gallery/videos', component: VideosComponent },

    { path: 'blog', component: BlogComponent },
    { path: 'contact', component: ContactComponent },

    { path: 'admin', component: MainComponent, canActivate: [authGuard] },
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/photos', component: AdminPhotosComponent, canActivate: [authGuard] },
    { path: 'admin/videos', component: AdminVideosComponent, canActivate: [authGuard] },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];