import { Component, OnInit, Input, Output } from '@angular/core';

export interface Card {
  Id: number;
  showFront: boolean;
  frontImg: string;
  backImg?: string;
}

enum PokemonStatus {
  asleep = 'ねむり',
  confused = 'こんらん',
  paralyzed = 'マヒ',
}

interface PokemonCard extends Card {
  damage: number;
  status: PokemonStatus;
  isPoisoned: boolean;
  isBurned: boolean;
}

interface EnergyCard extends Card {}

interface TrainersCard extends Card {}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit() {
    this.card.showFront = this.card.Id % 2 === 0;
  }
}
