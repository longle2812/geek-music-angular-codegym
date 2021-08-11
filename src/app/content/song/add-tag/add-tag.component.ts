import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LabelService} from '../../../service/label/label.service';
import {UserService} from '../../../service/user/user.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {Label} from '../../../model/label';
import {SongService} from '../../../service/song/song.service';
import {Song} from '../../../model/song';

declare var $: any;

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  song: Song;
  labels: Label[] = [];

  constructor(private activatedRoute: ActivatedRoute, private labelService: LabelService,
              private userService: UserService, private notificationService: NotificationService,
              private router: Router, private songService: SongService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getSong(id);
      this.getLabels();
    });
  }

  ngOnInit() {
    $(document).ready(() => {
      $('#label').select2();
    });
  }

  addTag() {
    if (this.userService.currentUser.id !== this.song.user.id) {
      this.notificationService.showErrorMessage('You do not have permission to add tags');
      this.router.navigateByUrl('');
    } else {
      const labelId = $('#label').val();
      console.log(labelId);
      if (labelId.length === 0) {
        this.notificationService.showErrorMessage('Must choose at least 1 tag');
      } else {
        const labelList: Label[] = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < labelId.length; i++) {
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < this.labels.length; j++) {
            // tslint:disable-next-line:triple-equals
            if (labelId[i] == this.labels[j].id) {
              labelList.push(this.labels[j]);
            }
          }
        }
        this.labelService.addTagsToSong(labelList, this.song.id).subscribe(() => {
          alert('Success');
        }, e => {
          alert('Error');
        });
      }

    }

  }

  getSong(id: number) {
    this.songService.findSongById(id).subscribe(song => {
      this.song = song;
    });
  }

  getLabels() {
    this.labelService.getAllLabel().subscribe(labels => {
      this.labels = labels;
    });
  }
}
