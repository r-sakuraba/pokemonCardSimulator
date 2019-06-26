import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';
import { WindowRef } from '../window-ref.service';
import { Card } from '../card/card.component';

export interface StashCard {
  target: Place;
  card: Card;
}
@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss']
})
export class StashComponent implements OnInit {

  selectedCard: SelectedCard = {};
  @Output() onClickStash = new EventEmitter<number>();
  nativeWindow: any;
  stash: StashCard[];

  get isSelectedPlace() {
    return this.selectedCard.place === Place.stash;
  }

  constructor(private service: PokecaServiceService, private windowRef: WindowRef, private changeDetectorRef: ChangeDetectorRef) {
    this.nativeWindow = windowRef.nativeWindow;
    this.nativeWindow.addEventListener('storage', this.storageChange.bind(this));
  }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    if (this.selectedCard.index === index) {
      this.stash[index].target = Place.hand;
      localStorage.setItem('pokeca', JSON.stringify(this.stash));
      this.selectedCard = {};
    }
    this.selectedCard = { place: Place.stash, index: index };
  }

  storageChange() {
    console.log('storage cahnge');
    this.stash = JSON.parse(localStorage.getItem('pokeca'));
    console.log(this.stash);
    this.changeDetectorRef.detectChanges();
  }

}
