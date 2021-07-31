import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';


@NgModule({
  declarations: [HomeComponent, AlbumComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
  ]
})
export class ContentModule { }
