import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../../service/playlist/playlist.service';
import {NotificationService} from '../../../../service/notification/notification.service';
declare var $: any;
@Component({
  selector: 'app-popup-delete-playlist',
  templateUrl: './popup-delete-playlist.component.html',
  styleUrls: ['./popup-delete-playlist.component.css']
})
export class PopupDeletePlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadScript('/assets/js/delete-song.js');
  }

  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  deletePlaylist(element: HTMLAnchorElement) {
    const playlistId = element.getAttribute('data-playlistId');
    console.log('playlist id -->',playlistId);
    this.playlistService.delete(Number(playlistId)).subscribe(() =>{
      $('#delete-playlist-confirm').modal('hide');
      this.notificationService.showSuccessMessage("delete success")
    },
      () =>{
      this.notificationService.showErrorMessage("delete error")
      });
  }
}
