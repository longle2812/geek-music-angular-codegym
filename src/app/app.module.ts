import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderStartComponent } from './shared/loader-start/loader-start.component';
import { SlideMenuComponent } from './shared/slide-menu/slide-menu.component';
import {HeaderComponent} from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor} from './helper/error-interceptor';
import {JwtInterceptor} from './helper/jwt-interceptor';
import { DeleteSongPopupComponent } from './shared/delete-song-popup/delete-song-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderStartComponent,
    SlideMenuComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    DeleteSongPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
