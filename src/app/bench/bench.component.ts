import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { Card } from '../card/card.component';
import { SelectedCard, Place } from '../field/field.component';
import { CardType } from '../card/card.component';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.scss']
})
export class BenchComponent implements OnInit {
  @Input() bench: Card[];
  @Input() benchType: Card[];
  @Input() benchIndex: number;
  @Input() selectedCard: SelectedCard;
  @Output() onClickBench = new EventEmitter<number>();

  get isSelectedPlace() {
    return (
      this.selectedCard.place === Place.bench &&
      (this.selectedCard.benchIndex === this.benchIndex || this.selectedCard.benchIndex === undefined)
    );
  }

  get notPokemon() {
    return this.service.bench.filter(_ => _.type !== CardType.pokemon);
  }

  get pokemon() {
    return this.service.bench.filter(_ => _.type === CardType.pokemon);
  }

  constructor(private service: PokecaServiceService) {}

  ngOnInit() {}

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickBench.emit(index);
  }

  getClassType(type: CardType) {
    switch (type) {
      case CardType.pokemon:
        return 'bench_card--pokemon';
      case CardType.trainers:
        return 'bench_card--tool';
      case CardType.energy:
        return 'bench_card--energie';
    }
  }
}
