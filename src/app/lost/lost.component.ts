import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.scss']
})
export class LostComponent implements OnInit {

  @Output() onClickLost = new EventEmitter<number>();

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickLost.emit(index);
  }
}
