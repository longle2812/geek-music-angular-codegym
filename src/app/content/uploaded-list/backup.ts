import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';

const {jPlayerPlaylist} = require('../../../assets/js/plugins/player/jplayer.playlist.min');
declare var $: any;

@Component({
  selector: 'app-uploaded-list',
  templateUrl: './uploaded-list.component.html',
  styleUrls: ['./uploaded-list.component.css']
})
export class UploadedListComponent implements OnInit {
  songs: Song[] = [];
  currentUser: UserToken = {};
  genres: '';
  searchValue = '';

  constructor(private songService: SongService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.getAllSong();
  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    // this.loadScript('/assets/js/plugins/player/jquery.jplayer.min');
    // this.loadScript('/assets/js/plugins/player/jplayer.playlist.min');

  }

  getAllSong() {
    this.songService.getAllSongByUserId(this.currentUser.id).subscribe(
      songs => {
        this.songs = songs;
      }
    );
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

  search(searchValue: string) {
    if (searchValue === '') {
      this.getAllSong();
    } else {
      this.songService.getSongByNameOrAuthor(searchValue, this.currentUser.id).subscribe(
        songs => this.songs = songs,
        () => alert('Not found')
      );
    }
  }

  playMusic(song: Song) {
    $('#jquery_jplayer_1').jPlayer('setMedia', {
      image: song.imgUrl,
      title: song.name,
      artist: song.author,
      mp3: song.fileMp3,
    });

    $('#jquery_jplayer_1').jPlayer('play');
    setTimeout(() => {
      $('#jp_playing_artist').text(song.author);
      $('#jp_playing_img').attr('src', song.imgUrl);
      $('#jp_playing_title').text(song.name);
    }, 100);

    this.loadScript('/assets/js/plugins/player/jquery.jplayer.min');
    this.loadScript('/assets/js/plugins/player/jplayer.playlist.min');
    const myPlayListOtion = '<ul class="more_option"><li><a href="#">' +
      '<span class="opt_icon" title="Add To Favourites">' +
      '<span class="icon icon_fav"></span></span>' +
      '</a></li><li><a href="#"><span class="opt_icon" title="Add To Queue">' +
      '<span class="icon icon_queue"></span></span></a></li><li><a href="#">' +
      '<span class="opt_icon" title="Download Now"><span class="icon icon_dwn">' +
      '</span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist">' +
      '<span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share">' +
      '<span class="icon icon_share"></span></span></a></li></ul>';

    const myPlaylist = new jPlayerPlaylist({
      jPlayer: '#jquery_jplayer_1',
      cssSelectorAncestor: '#jp_container_1'
    }, [], {
      swfPath: 'js/plugins',
      supplied: 'oga, mp3',
      wmode: 'window',
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      playlistOptions: {
        autoPlay: false
      }
    });

    myPlaylist.add({
      image: song.imgUrl,
      title: song.name,
      artist: song.author,
      mp3: song.fileMp3,
      option: myPlayListOtion
    });

    $('#jquery_jplayer_1').on($.jPlayer.event.ready + ' ' + $.jPlayer.event.play, function(event) {
      const current = myPlaylist.current;
      const playlist = myPlaylist.playlist;
      $.each(playlist, function(index, obj) {
        if (index === current) {
          $('.jp-now-playing').html('<div class=\'jp-track-name\'><span class=\'que_img\'><img style=\'width: 50px; height: 50px\' id=\'jp_playing_img\' src=\'' + obj.image + '\'></span><div class=\'que_data\'><span id=\'jp_playing_title\'>' + obj.title + '</span> <div class=\'jp-artist-name\'> <span id=\'jp_playing_artist\'>' + obj.artist + '</span></div></div></div>');
        }
      });
      $('.que_close').click(() => {
        console.log('1');
        // myPlaylist.remove(0);
      });
      $('.knob-wrapper').mousedown(function() {
        $(window).mousemove(function(e) {
          var angle1 = getRotationDegrees($('.knob')),
            volume = angle1 / 270;

          if (volume > 1) {
            $('#jquery_jplayer_1').jPlayer('volume', 1);
          } else if (volume <= 0) {
            $('#jquery_jplayer_1').jPlayer('mute');
          } else {
            $('#jquery_jplayer_1').jPlayer('volume', volume);
            $('#jquery_jplayer_1').jPlayer('unmute');
          }
        });
        return false;
      }).mouseup(function() {
        $(window).unbind('mousemove');
      });


      function getRotationDegrees(obj) {
        var matrix = obj.css('-webkit-transform') ||
          obj.css('-moz-transform') ||
          obj.css('-ms-transform') ||
          obj.css('-o-transform') ||
          obj.css('transform');
        if (matrix !== 'none') {
          var values = matrix.split('(')[1].split(')')[0].split(',');
          var a = values[0];
          var b = values[1];
          var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
          var angle = 0;
        }
        return (angle < 0) ? angle + 360 : angle;
      }

      var timeDrag = false;
      $('.jp-play-bar').mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);

      });
      $(document).mouseup(function(e) {
        if (timeDrag) {
          timeDrag = false;
          updatebar(e.pageX);
        }
      });
      $(document).mousemove(function(e) {
        if (timeDrag) {
          updatebar(e.pageX);
        }
      });
      var updatebar = function(x) {
        var progress = $('.jp-progress');
        var position = x - progress.offset().left;
        var percentage = 100 * position / progress.width();
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        $('#jquery_jplayer_1').jPlayer('playHead', percentage);
        $('.jp-play-bar').css('width', percentage + '%');
      };
      $('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click', function() {
        $('#playlist-wrap').fadeToggle();
        $('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
      });
      $('.hide_player').unbind().on('click', function() {
        $('.audio-player').toggleClass('is_hidden');
        $(this).html($(this).html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE');
      });
      $('body').unbind().on('click', '.audio-play-btn', function() {
        $('.audio-play-btn').removeClass('is_playing');
        $(this).addClass('is_playing');
        var playlistId = $(this).data('playlist-id');
        myPlaylist.play(playlistId);
      });

    });


  }
}