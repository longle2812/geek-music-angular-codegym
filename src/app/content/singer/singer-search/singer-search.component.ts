import { Component, OnInit } from '@angular/core';
import {Singer} from '../../../model/singer';
import {SingerService} from '../../../service/singer/singer.service';

@Component({
  selector: 'app-singer-search',
  templateUrl: './singer-search.component.html',
  styleUrls: ['./singer-search.component.css']
})
export class SingerSearchComponent implements OnInit {
  singers: Singer[];
  constructor(private singerService: SingerService) {
    this.singerService.currentSearchSingerSubject.subscribe(singers => {
      this.singers = singers;
    });
  }

  ngOnInit() {
  }


}
