import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  @Input() selectedCard: SelectedCard;
  @Output() onClickTrash = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.trash;
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickTrash.emit(index);
  }

}
