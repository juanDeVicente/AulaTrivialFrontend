import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrivialComponent } from './trivial/trivial.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { InitComponent } from './init/init.component';

const appRoutes: Routes = [
  {path: '', component: InitComponent},
  {path: 'trivial', component: TrivialComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TrivialComponent,
    InitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
