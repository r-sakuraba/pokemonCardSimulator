import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  @Input() selectedCard: SelectedCard;
  @Output() onClickBattle = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.battle;
  }
  constructor(private service: PokecaServiceService) {}

  ngOnInit() {}

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickBattle.emit(index);
  }
}
