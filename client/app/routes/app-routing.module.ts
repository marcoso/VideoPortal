import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../core/login.component';
import { AuthGuard } from '../core/auth-guard';
import { VideoDetailComponent } from '../videos/video-detail.component';
import { VideoListComponent } from '../videos/video-list.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'videoList'},
	{ path: 'login',  component: LoginComponent },	
	{ path: 'videoDetail/:id', component: VideoDetailComponent, canActivate: [AuthGuard] },
	{ path: 'videoList', component: VideoListComponent, canActivate: [AuthGuard] },
];

// Module that handle routing in our application so we can navigate through components
@NgModule ({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}

export const RoutingComponents = [
	LoginComponent, 	
	VideoDetailComponent, 
	VideoListComponent
]