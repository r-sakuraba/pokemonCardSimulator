import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  @Output() onClickBattle = new EventEmitter<number>();

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

  onClick(e: Event, index: number) {
    e.stopPropagation();
    this.onClickBattle.emit(index);
  }
}
