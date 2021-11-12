import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// use ReactiveFormsModule Only when using Template Driven Forms
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataDrivenComponent } from "./data-driven/data-driven.component";

@NgModule({
  declarations: [
    AppComponent,
    DataDrivenComponent
  ],
  // to use Forms we must have FormsModule OR ReactiveFormsModule Here
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
