import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  public currentQueueSubject: BehaviorSubject<any[]>;
  public currentQueue: Observable<any[]>;
  newSong: any;

  constructor() {
    const myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
    this.currentQueueSubject = new BehaviorSubject<any[]>([{
      image: '/assets/images/weekly/song1.jpg',
      title: 'Test',
      artist: 'test',
      mp3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      option: myPlayListOtion
    }]);
    this.currentQueue = this.currentQueueSubject.asObservable();
  }

  addSongtoQueue(song: any){
    this.currentQueueSubject.next(song);
  }
}
