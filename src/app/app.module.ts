import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BaseNavComponent } from './core/base-nav/base-nav.component';
import { FeatureComponent } from './feature/feature.component';

import { AppRoutingModule } from 'app/app-routing/app-routing.module';
import { DraggableModule } from './draggable/draggable.module';
import { Global } from './core/global';


@NgModule({
  declarations: [
    AppComponent,
    BaseNavComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DraggableModule
  ],
  providers: [Global],
  bootstrap: [AppComponent]
})
export class AppModule { }
