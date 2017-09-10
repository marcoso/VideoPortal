import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';
import { FormsModule, FormGroup, ReactiveFormsModule }  from '@angular/forms';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

import { AppComponent }  from './app.component';
import { AppRoutingModule, RoutingComponents } from './routes/app-routing.module';
import { AuthGuard } from './core/auth-guard';
import { AuthService } from './core/auth-service';
import { RatingService } from './rating/rating-service';
import { TruncatePipe } from './core/pipes/truncate.pipe';
import { RatingComponent } from './rating/rating.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Main module of our application, it adds the main component to index page and declares reusable components, routing and pipes to be used in the app
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [
    AppComponent,    
    RoutingComponents,
    TruncatePipe,
    RatingComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    RatingService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }