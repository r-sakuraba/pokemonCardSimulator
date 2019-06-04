import { Component, OnInit, Input } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard, Place } from '../field/field.component';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.scss']
})
export class StadiumComponent implements OnInit {

  @Input() selectedCard: SelectedCard;

  get isSelectedPlace() {
    return this.selectedCard.place === Place.stadium;
  }

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

}
