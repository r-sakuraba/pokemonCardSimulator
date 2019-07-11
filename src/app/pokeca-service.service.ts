import { Injectable } from '@angular/core';
import { Card, CardType } from './card/card.component';
import { HttpClient } from '@angular/common/http';
import { Place } from './field/field.component';
import { StashCard } from './stash/stash.component';

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

  get stashCardList(): StashCard[] {
    return this.stash.map(_ => { return { target: Place.stash, card: _ } });
  }

  constructor(private http: HttpClient) {}

  generateDeck() {
    this.deck = [...Array(60).keys()].map(i => {
      i++;
      return {
        Id: i,
        frontImg:
          'https://www.pokemon-card.com/assets/images/card_images/large/SM4p/035679_T_RIRIE.jpg',
        showFront: false
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

  shuffleSide() {
    this.side = PokecaServiceService.shuffle(this.side);
  }

  /**
   * サイド裏返し処理
   * @param index 裏返すインデックス
   */
  turnOverSide(index: number) {
    this.side[index].showFront = !this.side[index].showFront;
  }

  /**
   *  山札の一番上を手札に加える処理
   */
  deckTopToHand() {
    const card = this.deck.shift();
    card.showFront = true;
    this.hand.push(card);
  }

  /**
   * 山札の上からN枚を取得(deck to stash)
   * num: 上から何枚
   */
  deckToStash(num: number) {
    const cards = this.deck.splice(0, num);
    cards.forEach(_ => _.showFront = true);
    this.stash = cards;
  }

  /**
   * 山札の下からN枚を取得(deck to stash)
   * num: 下から何枚
   */
  deckUnderToStash(num: number) {
    const cards = this.deck.splice(-num, num);
    cards.forEach(_ => _.showFront = true);
    this.stash = cards;
  }

  /**
   * 山札の上からN枚を取得(deck to side)
   * num: 上から何枚
   */
  deckToSide(num: number) {
    this.side = this.deck.splice(0, num);
    this.side.forEach(_ =>  _.showFront = false);
  }

  /**
   * 山札の上からN枚を取得(deck to stash)
   * num: 上から何枚
   */
  SideToStash(num: number) {
    const cards = this.side.splice(0, num);
    cards.forEach(_ => _.showFront = true);
    this.stash = cards;
  }

  /**
   * 山札の上からN枚を取得(deck to stash)
   * num: 上から何枚
   */
  trashToStash(num: number) {
    const cards = this.trash.splice(0, num);
    cards.forEach(_ => _.showFront = true);
    this.stash = cards;
  }

  PlaceToVariable(place: Place, benchIndex?: number) {
    switch(place) {
      case Place.deck:
      case Place.deckUnder:
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

  PlaceToShowFront(place: Place, benchIndex?: number): boolean {
    switch(place) {
      case Place.deck:
      case Place.side:
        return false;
      case Place.battle:
      case Place.bench:
      case Place.trash:
      case Place.hand:
      case Place.stadium:
      case Place.use:
      case Place.lost:
      case Place.stash:
        return true;
    }
  }

  moveAToB(placeA: Place, placeB: Place, aBenchIndex?: number, bBenchIndex?: number) {
    const a = this.PlaceToVariable(placeA, aBenchIndex);
    const b = this.PlaceToVariable(placeB, bBenchIndex);
    const cards = a.splice(0, a.length).map(_ => Object.assign(_, { showFront: this.PlaceToShowFront(placeB) }));
    if (placeB === Place.deck) {
      b.unshift(...cards);
    } else {
      b.push(...cards);
    }
    if (placeB === Place.battle || placeB === Place.bench) {
      b.sort((prev, next) => {
        return this.typeToSortNumber(prev.type) - this.typeToSortNumber(next.type);
      });
    }
  }

  moveOneAToB(placeA: Place, aIndex: number,  placeB: Place, aBenchIndex?: number, bBenchIndex?: number) {
    const a = this.PlaceToVariable(placeA, aBenchIndex);
    const b = this.PlaceToVariable(placeB, bBenchIndex);
    const card = Object.assign(a.splice(aIndex, 1)[0], { showFront: this.PlaceToShowFront(placeB)});
    if (placeB === Place.battle || placeB === Place.bench) {
      if (card.type === CardType.pokemon) {
        b.unshift(card);
      } else {
        b.push(card);
      }
      b.sort((prev, next) => {
        return this.typeToSortNumber(prev.type) - this.typeToSortNumber(next.type);
      });
    } else {
      if (placeB === Place.deck) {
        b.unshift(card);
      } else {
        b.push(card);
      }
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
