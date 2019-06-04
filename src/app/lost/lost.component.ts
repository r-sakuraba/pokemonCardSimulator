import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.scss']
})
export class LostComponent implements OnInit {

  @Input() selectedCard: SelectedCard;
  @Output() onClickLost = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.lost;
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickLost.emit(index);
  }
}
