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

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {
  place: typeof Place = Place;
  selectedCard: {
    index?: number, 
    place?: Place
  } = {};

  constructor(private service: PokecaServiceService) {}

  ngOnInit() {
    this.service.generateDeck();
  }

  onClick(clickPlace: Place, index?: number) {
    console.log(clickPlace, index);
    switch (this.selectedCard.place) {
      case clickPlace:
        console.log('select cancel');
        this.selectedCard = {};
        break;
      case undefined:
        console.log(clickPlace, ' select');
        this.selectedCard = { place: clickPlace, index };
        break;
      default:
        console.log(this.selectedCard, ' to ', clickPlace);
        this.service.moveAToB(this.selectedCard.place, clickPlace, 1);
        this.selectedCard = {};
    }
  }
}
