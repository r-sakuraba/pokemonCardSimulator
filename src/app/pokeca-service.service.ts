import { Injectable } from '@angular/core';
import { Card } from './card/card.component';
import { HttpClient } from '@angular/common/http';
import { Place } from './field/field.component';

const shuffleAlgo = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

@Injectable({
  providedIn: 'root',
})
export class PokecaServiceService {

  deck: Card[] = [];
  battle: Card[] = [];
  bench: Card[][] = [[]];
  trash: Card[] = [];
  side: Card[] = [];
  hand: Card[] = [];
  stadium: Card[] = [];
  use: Card[] = [];
  lost: Card[] = [];
  gx: boolean;
  stash: Card[] = [];

  static shuffle(cardArray: Card[]): Card[] {
    cardArray = shuffleAlgo(cardArray);
    return cardArray;
  }

  constructor(private http: HttpClient) {}

  generateDeck() {
    this.deck = [...Array(60).keys()].map(i => {
      i++;
      return {
        Id: i,
        frontImg:
          'https://www.pokemon-card.com/assets/images/card_images/large/SM4p/035679_T_RIRIE.jpg',
      } as Card;
    });
    this.http.get('/assets/deck/deck.dat').subscribe((data: {img: string, num: number}[]) => {
      let index = 0;
      console.log(data);
      data.forEach( _ => {
        for(let j = 0; j < _.num; j++){
          this.deck[index].frontImg = _.img;
          index++;
        }
      });
      console.log(this.deck);

    })
  }

  shuffleDeck() {
    this.deck = PokecaServiceService.shuffle(this.deck);
  }

  /**
   *  山札の一番上を手札に加える処理
   */
  deckTopToHand() {
    this.hand.push(this.deck.shift());
  }

  /**
   * 山札の上からN枚を取得(deck to stash)
   * num: 上から何枚
   */
  deckToStash(num: number) {
    this.stash = this.deck.splice(0, num);
  }

  PlaceToVariable(place: Place) {
    switch(place) {
      case Place.deck:
        return this.deck;
      case Place.battle:
        return this.battle;
      // case Place.bench:
      //   return this.bench;
      case Place.trash:
        return this.trash;
      case Place.side:
        return this.side;
      case Place.hand:
        return this.hand;
      case Place.stadium:
        return this.stadium;
      case Place.use:
        return this.use;
      case Place.lost:
        return this.lost;
      case Place.stash:
        return this.stash;
    }
  }

  moveAToB(placeA: Place,  placeB: Place) {
    const a = this.PlaceToVariable(placeA);
    const b = this.PlaceToVariable(placeB);
    b.push(...a.splice(0, a.length));
  }

  moveOneAToB(placeA: Place, aIndex: number,  placeB: Place) {
    const a = this.PlaceToVariable(placeA);
    const b = this.PlaceToVariable(placeB);
    b.push(...a.splice(aIndex, 1));
  }
  //--------------

  /**
   * stashから指定したインデックスを手札に
   * @param stashIndex 手札に加えたいインデックス
   */
  stashToHand(stashIndex: number) {
    this.hand.push(this.stash.splice(stashIndex, 1)[0]);
  }

  /**
   * stashから指定したインデックスを山札の上に
   * @param stashIndex 山札の上に加えたいインデックス
   */
  stashToDeckTop(stashIndex: number) {
    this.deck.unshift(this.stash.splice(stashIndex, 1)[0]);
  }

  /**
   * stashを山札の上に
   * @param stashIndex 山札の上に加えたいインデックス
   */
  stashToDeck() {
    this.deck.unshift(...this.stash);
    this.stash = [];
  }

  /**
   * handを山札の上に
   * @param stashIndex 山札の上に加えたいインデックス
   */
  handToDeck() {
    this.deck.unshift(...this.hand);
    this.hand = [];
  }
}
