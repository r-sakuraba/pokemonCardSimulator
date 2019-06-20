import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card/card.component';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';
import { WindowRef } from '../window-ref.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  @Input() selectedCard: SelectedCard;

  inputTopN: number;
  nativeWindow: any;

  get deckTop(): Card {
    return Object.assign({}, this.service.deck[0], {showFront: false});
  }

  get isSelectedPlace() {
    return this.selectedCard.place === Place.deck;
  }

  constructor(private service: PokecaServiceService, private windowRef: WindowRef) {
    this.nativeWindow = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.service.shuffleDeck();
  }

  /**
   * シャッフル処理
   */
  shuffle(event: Event) {
    event.stopPropagation();
    this.service.shuffleDeck();
  }

  /**
   * ドロー処理
   */
  draw(event: Event) {
    event.stopPropagation();
    this.service.deckTopToHand();
    console.log( this.service.deck);
  }

  /**
   * サーチ処理？
   * @param event
   */
  search(event: Event) {
    event.stopPropagation();
    console.log('-- search --');
    this.inputTopN = 7;
    this.onClickShowTopN();
    localStorage.setItem('pokeca', JSON.stringify(this.service.stashCardList));
  }

  /**
   * 山札の上からN枚を取得(deck to stash)
   */
  onClickShowTopN() {
    this.service.deckToStash(this.inputTopN);
  }

  /**
   * 山札を取得(deck to stash)
   */
  onClickShowDeck() {
    this.service.deckToStash(this.service.deck.length);
  }
}
