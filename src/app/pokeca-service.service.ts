import { Injectable } from '@angular/core';
import { Card, CardType } from './card/card.component';
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
  bench: Card[][] = [[], [], [], [], []];
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
          const jpgString = _.img.split('/');
          this.deck[index].type = jpgString[jpgString.length - 1].split('_')[1] as CardType;
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

  PlaceToVariable(place: Place, benchIndex?: number) {
    switch(place) {
      case Place.deck:
        return this.deck;
      case Place.battle:
        return this.battle;
      case Place.bench:
        return this.bench[benchIndex];
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

  moveAToB(placeA: Place, placeB: Place, aBenchIndex?: number, bBenchIndex?: number) {
    const a = this.PlaceToVariable(placeA, aBenchIndex);
    const b = this.PlaceToVariable(placeB, bBenchIndex);
    b.push(...a.splice(0, a.length));
    if (placeB === Place.battle || placeB === Place.bench) {
      b.sort((prev, next) => {
        return this.typeToSortNumber(prev.type) - this.typeToSortNumber(next.type);
      });
    }
  }

  moveOneAToB(placeA: Place, aIndex: number,  placeB: Place, aBenchIndex?: number, bBenchIndex?: number) {
    const a = this.PlaceToVariable(placeA, aBenchIndex);
    const b = this.PlaceToVariable(placeB, bBenchIndex);
    if (placeB === Place.battle || placeB === Place.bench) {
      const card = a.splice(aIndex, 1)[0];
      if (card.type === CardType.pokemon) {
        b.unshift(card);
      } else {
        b.push(card);
      }
      b.sort((prev, next) => {
        return this.typeToSortNumber(prev.type) - this.typeToSortNumber(next.type);
      });
    } else {
      b.push(...a.splice(aIndex, 1));
    }
  }

  private typeToSortNumber(type: CardType): number {
    switch (type) {
      case CardType.pokemon:
        return 1;
      case CardType.trainers:
        return 2;
      case CardType.energy:
        return 3;
    }
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
