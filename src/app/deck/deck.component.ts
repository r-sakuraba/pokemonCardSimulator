import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card/card.component';
import { PokecaServiceService } from '../pokeca-service.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  inputTopN: number;

  get deckTop(): Card {
    return Object.assign({}, this.service.deck[0], {showFront: false});
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
    this.service.shuffleDeck();
  }

  /**
   * シャッフル処理
   */
  shuffle() {
    this.service.shuffleDeck();
  }

  /**
   * ドロー処理
   */
  draw() {
    this.service.deckTopToHand();
    console.log( this.service.deck);
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
