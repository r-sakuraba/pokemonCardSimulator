import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';
import { CardType } from '../card/card.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  battle_damage: number = 0;

  readonly cardType = CardType;

  @Input() selectedCard: SelectedCard;
  @Output() onClickBattle = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.battle;
  }

  get notEnergy() {
    return this.service.battle.filter(_ => _.type !== CardType.energy);
  }

  get energy() {
    return this.service.battle.filter(_ => _.type === CardType.energy);
  }
  constructor(private service: PokecaServiceService) {}

  ngOnInit() {}

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickBattle.emit(index);
  }

  getClassType(type: CardType) {
    switch (type) {
      case CardType.pokemon:
        return 'battle_card--pokemon';
      case CardType.trainers:
        return 'battle_card--tool';
      case CardType.energy:
        return 'battle_card--energie';
    }
  }

  getStyle(type: CardType) {
    switch (type) {
      case CardType.energy:
        return 'battle_card--energie';
    }
  }
}
