import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card/card.component';
import { SelectedCard, Place } from '../field/field.component';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.scss']
})
export class BenchComponent implements OnInit {
  @Input() bench: Card[];
  @Input() benchIndex: number;
  @Input() selectedCard: SelectedCard;
  @Output() onClickBench = new EventEmitter<number>();

  get isSelectedPlace() {
    return (
      this.selectedCard.place === Place.bench &&
      (this.selectedCard.benchIndex === this.benchIndex || this.selectedCard.benchIndex === undefined)
    );
  }
  constructor() {}

  ngOnInit() {}

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickBench.emit(index);
  }
}
