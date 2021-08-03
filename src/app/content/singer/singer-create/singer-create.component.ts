import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {SingerService} from '../../../service/astist/singer.service';
import {Singer} from '../../../model/singer';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-artist-create',
  templateUrl: './singer-create.component.html',
  styleUrls: ['./singer-create.component.css']
})
export class SingerCreateComponent implements OnInit {
  singer: Singer = {};
  isSubmitted = false;
  selectedImage = null;

  constructor(private storage: AngularFireStorage,
              private singerService: SingerService) {
  }

  ngOnInit() {
  }

  uploadFile() {
    if (this.selectedImage != null) {
      const filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.singer.imageUrl = url;
          });
        })).subscribe();
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.singer.imageUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.uploadFile();
    } else {
      this.selectedImage = null;
    }
  }

  create() {
  }
}
