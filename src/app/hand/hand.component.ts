import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {
  @Input() selectedCard: SelectedCard;
  @Output() onClickHand = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.hand;
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickHand.emit(index);
  }
}
