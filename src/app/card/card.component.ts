import { Component, OnInit, Input, Output } from '@angular/core';

export interface Card {
  Id: number;
  showFront: boolean;
  frontImg?: string;
  backImg?: string;
  type: CardType;
}

export enum CardType {
  pokemon = 'P',
  trainers = 'T',
  energy = 'E',
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
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() selected: boolean;

  constructor() {}

  ngOnInit() {
    this.card.showFront = this.card.Id % 2 === 0;
    this.card.showFront = true;
  }
}
