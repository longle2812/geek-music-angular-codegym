import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SongService} from '../song/song.service';
import {PlaylistService} from '../playlist/playlist.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  public currentQueueRequest: BehaviorSubject<any>;
  public currentRequest: Observable<any[]>;
  public currentQueueSubject: BehaviorSubject<any>;
  public currentQueueList: Observable<any[]>;
  newSong: any;

  constructor(private songService: SongService, private playlistService: PlaylistService) {
    const myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
    this.currentQueueRequest = new BehaviorSubject<any>({});
    this.currentRequest = this.currentQueueRequest.asObservable();
    this.currentQueueSubject = new BehaviorSubject<any>({});
    this.currentQueueList = this.currentQueueSubject.asObservable();
  }

  sendQueueRequest(request: any){
    const myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
    if (request.song != undefined){
      request.song = {
        image: request.song.imgUrl,
        title: request.song.name,
        artist: request.song.author,
        mp3: request.song.fileMp3,
        option: myPlayListOtion,
      };
      this.currentQueueRequest.next(request);
    }
    if (request.playlist != undefined){
      this.playlistService.getPlaylist(request.playlistId).subscribe(playlist => {
        request.songs = [];
        for (let i = 0; i < playlist.songs.length; i++){
          const song =  {
            image: playlist.songs[i].imgUrl,
            title: playlist.songs[i].name,
            artist: playlist.songs[i].author,
            mp3: playlist.songs[i].fileMp3,
            option: myPlayListOtion,
            songId: playlist.songs[i].id
          };
          request.songs.push(song);
        }
        this.currentQueueRequest.next(request);
      })
    }
  }

  resetQueue() {
    const request = {
      title: "reset"
    }
    this.currentQueueRequest.next(request);
  }
}
