import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackEndProvider } from '@services/backend.service';
import { JwtInterceptor } from '@interceptor/jwt.interceptor';
import { ErrorInterceptor } from '@interceptor/error.interceptor';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { InitLayoutComponent } from '@containers/index';
import { AlertModule } from '@components/alert/alert.module';
const APP_CONTAINERS = [InitLayoutComponent]

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackEndProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
