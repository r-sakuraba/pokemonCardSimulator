import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.component';
import { HttpClient } from '@angular/common/http';
import { PokecaServiceService } from '../pokeca-service.service';

export enum Place {
  deck = 'deck',
  battle = 'battle',
  bench = 'bench',
  trash = 'trash',
  side = 'side',
  hand = 'hand',
  stadium = 'stadium',
  use = 'use',
  lost = 'lost',
  stash = 'stash',
}

export class SelectedCard {
  index?: number;
  place?: Place;
  benchIndex?: number;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {
  place: typeof Place = Place;
  selectedCard: SelectedCard = {};

  constructor(private service: PokecaServiceService) {}

  ngOnInit() {
    this.service.generateDeck();
  }

  onClick(clickPlace: Place, index?: number, benchIndex?: number) {
    console.log(clickPlace, index, benchIndex);
    switch (this.selectedCard.place) {
      case clickPlace:
        console.log('select cancel');
        this.selectedCard = {};
        break;
      case undefined:
        console.log(clickPlace, ' select');
        this.selectedCard = { place: clickPlace, index, benchIndex };
        break;
      default:
        console.log(this.selectedCard, ' to ', clickPlace);
        if (this.selectedCard.index === undefined) {
          this.service.moveAToB(this.selectedCard.place, clickPlace, this.selectedCard.benchIndex, benchIndex);
        } else {
          this.service.moveOneAToB(this.selectedCard.place, this.selectedCard.index,  clickPlace, this.selectedCard.benchIndex, benchIndex);
        }
        this.selectedCard = {};
    }
  }
}
