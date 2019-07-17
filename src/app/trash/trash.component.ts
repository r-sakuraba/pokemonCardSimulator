import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  @ViewChild('trash', { static: false }) public trash: ContextMenuComponent;

  @Input() selectedCard: SelectedCard;
  @Output() onClickTrash = new EventEmitter<number>();
  @Output() clickContextMenuEvent = new EventEmitter<void>();

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

  /**
   * stashに移動
   * @param stash
   */
  trashToStash() {
    this.service.trashToStash(this.service.trash.length);
    localStorage.setItem('pokeca', JSON.stringify(this.service.stashCardList));
    this.clickContextMenuEvent.emit();
  }
}
