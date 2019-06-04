import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { Place, SelectedCard } from '../field/field.component';

@Component({
  selector: 'app-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.scss']
})
export class UseComponent implements OnInit {

  @Input() selectedCard: SelectedCard;
  @Output() onClickUse = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.use;
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickUse.emit(index);
  }

}
