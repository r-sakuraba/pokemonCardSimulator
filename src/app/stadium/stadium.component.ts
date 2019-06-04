import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.scss']
})
export class StadiumComponent implements OnInit {

  @Input() selectedCard: SelectedCard;
  @Output() onClickStadium = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.stadium;
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickStadium.emit(index);
  }
}
