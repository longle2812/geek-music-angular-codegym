import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderStartComponent } from './shared/loader-start/loader-start.component';
import { SlideMenuComponent } from './shared/slide-menu/slide-menu.component';
import {HeaderComponent} from './shared/header/header.component';
import { SingerCreateComponent } from './content/singer/singer-create/singer-create.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoaderStartComponent,
    SlideMenuComponent,
    HeaderComponent,
    SingerCreateComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        FormsModule
    ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
