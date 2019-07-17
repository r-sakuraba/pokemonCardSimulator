import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Card } from '../card/card.component';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';
import { WindowRef } from '../window-ref.service';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  @ViewChild('deck', { static: false }) public deck: ContextMenuComponent;

  @Input() selectedCard: SelectedCard;
  @Output() clickContextMenuEvent = new EventEmitter<void>();

  inputTopN: number;
  inputUnderN: number;
  nativeWindow: any;
  searchCount: number;
  drawCount: number;

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
  shuffle() {
    this.service.shuffleDeck();
    this.clickContextMenuEvent.emit();
  }

  /**
   * ドロー処理
   */
  draw(drawCount: number) {
    // event.stopPropagation();
    for (let index = 0; index < drawCount; index++) {
      this.service.deckTopToHand();
    }
    console.log( this.service.deck);
    this.clickContextMenuEvent.emit();
  }

  /**
   * サーチ処理？
   * @param event
   */
  search(count: number) {
    console.log('-- search --');
    this.inputTopN = count;
    this.onClickShowTopN();
    localStorage.setItem('pokeca', JSON.stringify(this.service.stashCardList));
    this.clickContextMenuEvent.emit();
  }

  /**
   * サーチ処理？
   * @param event
   */
  searchDeck() {
    console.log('-- search --');
    this.onClickShowDeck();
    localStorage.setItem('pokeca', JSON.stringify(this.service.stashCardList));
    this.clickContextMenuEvent.emit();
  }

  /**
   * サーチ処理？
   * @param event
   */
  underSearch(count: number) {
    console.log('-- search --');
    this.inputUnderN = count;
    this.onClickShowUnderN();
    localStorage.setItem('pokeca', JSON.stringify(this.service.stashCardList));
    this.clickContextMenuEvent.emit();
  }

  /**
   * 山札の上からN枚を取得(deck to stash)
   */
  onClickShowTopN() {
    this.service.deckToStash(this.inputTopN);
  }

  /**
   * 山札の下からN枚を取得(deck to stash)
   */
  onClickShowUnderN() {
    this.service.deckUnderToStash(this.inputUnderN);
  }

  /**
   * 山札を取得(deck to stash)
   */
  onClickShowDeck() {
    this.service.deckToStash(this.service.deck.length);
  }

  /**
   * 山札を取得(deck to stash)
   */
  deckToSide() {
    this.service.deckToSide(6);
  }
}
