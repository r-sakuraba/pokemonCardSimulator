import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Output() onClickHand = new EventEmitter<number>();

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickHand.emit(index);
  }

}
