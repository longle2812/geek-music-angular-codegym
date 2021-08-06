import {Component, OnInit} from '@angular/core';
import {QueueService} from '../../service/queue/queue.service';
import {SongService} from '../../service/song/song.service';
const {jPlayerPlaylist} = require('../../../assets/js/plugins/player/jplayer.playlist.min');

declare var $: any;

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  queue: any;
  myPlaylist = new jPlayerPlaylist;

  constructor(private queueService: QueueService,
              private songService: SongService) {
    this.loadScript('assets/js/plugins/player/jquery.jplayer.min');
    this.loadScript('/assets/js/plugins/player/jplayer.playlist.min');
    $('#jquery_jplayer_1').jPlayer('destroy');
    this.queue = [];
    $(() => {
      'use strict';
      if ($('.audio-player').length) {
        var myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
        this.myPlaylist = new jPlayerPlaylist({
          jPlayer: '#jquery_jplayer_1',
          cssSelectorAncestor: '#jp_container_1'
        }, this.queue, {
          swfPath: 'js/plugins',
          supplied: 'oga, mp3',
          wmode: 'window',
          useStateClassSkin: true,
          autoBlur: false,
          smoothPlayBar: true,
          keyEnabled: true,
          playlistOptions: {
            autoPlay: false,
            shuffleOnLoop: true,
          }
        });
        $('#jquery_jplayer_1').on($.jPlayer.event.ready + ' ' + $.jPlayer.event.play, (event) => {
          var current = this.myPlaylist.current;
          var playlist = this.myPlaylist.playlist;
          $.each(playlist, function(index, obj) {
            if (index == current) {
              $('.jp-now-playing').html('<div class=\'jp-track-name\'><span class=\'que_img\'><img style=\'width: 50px; height: 50px\' id=\'jp_playing_img\' src=\'' + obj.image + '\'></span><div class=\'que_data\'><span id=\'jp_playing_title\'>' + obj.title + '</span> <div class=\'jp-artist-name\'> <span id=\'jp_playing_artist\'>' + obj.artist + '</span></div></div></div>');
            }
          });
          $('.que_close').click(() => {
            console.log('1');
            // myPlaylist.remove(0);
          });
          $('.knob-wrapper').mousedown(() => {
            $(window).mousemove((e) => {
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
          }).mouseup(() => {
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
          $('.jp-play-bar').mousedown((e) => {
            timeDrag = true;
            updatebar(e.pageX);

          });
          $(document).mouseup((e) => {
            if (timeDrag) {
              timeDrag = false;
              updatebar(e.pageX);
            }
          });
          $(document).mousemove((e) => {
            if (timeDrag) {
              updatebar(e.pageX);
            }
          });
          var updatebar = (x) => {
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
          $('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click', () => {
            $('#playlist-wrap').fadeToggle();
            $('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
          });
          $('.hide_player').unbind().on('click', () => {
            $('.audio-player').toggleClass('is_hidden');
            $(this).html($(this).html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE');
          });
          $('body').unbind().on('click', '.audio-play-btn', function() {
            $('.audio-play-btn').removeClass('is_playing');
            $(this).addClass('is_playing');
            var playlistId = $(this).data('playlist-id');
            this.myPlaylist.play(playlistId);
          });
        });
      }
    });
    ;
  }

  ngOnInit() {
    this.queueService.currentQueueRequest.subscribe(
      (queue) => {
        if (queue.title === 'reset'){
          this.myPlaylist.remove();
        }
        else if (queue.title === 'delete'){
          let i = 0;
          while ( i < this.queue.length){
            if (this.queue[i].id == queue.songId){
              this.queue.splice(i, 1);
              break;
            }
            i++;
          }
          let tempQueue = [];
          for (let i = 0; i < this.queue.length; i++){
            const myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
            const songUpdate = {
              image: this.queue[i].imgUrl,
              title: this.queue[i].name,
              artist: this.queue[i].author,
              mp3: this.queue[i].mp3Url,
              option: myPlayListOtion
            };
            tempQueue.push(songUpdate);
          }
          this.myPlaylist.setPlaylist(tempQueue);
          $('#jp_playing_artist').text('');
          $('#jp_playing_img').attr('src','assets/images/album/album.jpg');
          $('#jp_playing_title').text('');
          this.myPlaylist.play(0);
        }
        else if (queue.song !== undefined) {
          this.songService.getSongById(queue.songId).subscribe(
            song => {
              let isExist = false;
              let index = -1;
              for (let i = 0; i < this.queue.length; i++){
                if (this.queue[i].id == queue.songId) {
                  isExist = true;
                  index = i;
                }
              }
              if (!isExist){
                if (queue.title === 'add' && queue.songId !== -1){
                  this.queue.push(song);
                  this.myPlaylist.add(queue.song);
                  console.log(this.queue);
                }
                if (queue.title === 'play' && queue.songId !== -1){
                  this.myPlaylist.add(queue.song,[true]);
                  this.queue.push(song);
                }
              }
              else {
                this.myPlaylist.play(index);
              }
            }
          )
        }

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

}
