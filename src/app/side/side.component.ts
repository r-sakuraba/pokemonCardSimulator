import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  @ViewChild('side', { static: false }) public side: ContextMenuComponent;

  @Input() selectedCard: SelectedCard;
  @Output() onClickSide = new EventEmitter<number>();

  get isSelectedPlace() {
    return this.selectedCard.place === Place.side;
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickSide.emit(index);
  }

  /**
   * シャッフル処理
   */
  shuffle() {
    this.service.shuffleSide();
  }

  /**
   * 裏返し処理
   * @param index 裏返したいカードのインデックス
   */
  turnOver(index: number) {
    this.service.turnOverSide(index);
  }

  /**
   * サーチ処理？
   * @param event
   */
  sideToStash() {
    this.service.SideToStash(this.service.side.length);
    localStorage.setItem('pokeca', JSON.stringify(this.service.stashCardList));
  }
}
