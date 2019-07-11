import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Card } from '../card/card.component';
import { HttpClient } from '@angular/common/http';
import { PokecaServiceService } from '../pokeca-service.service';
import { WindowRef } from '../window-ref.service';
import { StashCard } from '../stash/stash.component';
import { Location } from '@angular/common';

export enum Place {
  deck = 'deck',
  deckUnder = 'deckUnder',
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
  nativeWindow: any;

  constructor(private service: PokecaServiceService, private windowRef: WindowRef, private changeDetectorRef: ChangeDetectorRef, private location: Location) {
    this.nativeWindow = windowRef.nativeWindow;
    this.nativeWindow.addEventListener('storage', this.storageChange.bind(this));
  }

  ngOnInit() {
    this.service.generateDeck();
    this.nativeWindow.open(this.location.prepareExternalUrl('/stash'), 'stashField', 'width=500,toolbar=yes,menubar=yes,scrollbars=yes');
  }

  onClick(clickPlace: Place, index?: number, benchIndex?: number) {
    console.log(clickPlace, index, benchIndex);
    if (this.selectedCard.place === clickPlace && this.selectedCard.benchIndex === benchIndex) {
      console.log('select cancel');
      this.selectedCard = {};
    } else if (this.selectedCard.place === undefined) {
      console.log(clickPlace, ' select');
      this.selectedCard = { place: clickPlace, index, benchIndex };
    } else {
      console.log(this.selectedCard, ' to ', clickPlace);
      if (this.selectedCard.index === undefined) {
        this.service.moveAToB(this.selectedCard.place, clickPlace, this.selectedCard.benchIndex, benchIndex);
      } else {
        this.service.moveOneAToB(this.selectedCard.place, this.selectedCard.index,  clickPlace, this.selectedCard.benchIndex, benchIndex);
      }
      this.selectedCard = {};
    }
  }

  onClickGx() {
    this.service.gx = !this.service.gx;
  }

  storageChange() {
    const stash: StashCard[] = JSON.parse(localStorage.getItem('pokeca'));
    stash.filter(_ => _.target !== Place.stash).forEach(stashCard => {
      this.service.moveOneAToB(Place.stash, this.service.stash.findIndex(_ => _.Id === stashCard.card.Id), stashCard.target);
    });
    this.changeDetectorRef.detectChanges();
    localStorage.setItem('pokeca', JSON.stringify(stash.filter(_ => _.target === Place.stash)));
  }
}
