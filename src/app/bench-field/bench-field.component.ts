import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';
import { SelectedCard } from '../field/field.component';

@Component({
  selector: 'app-bench-field',
  templateUrl: './bench-field.component.html',
  styleUrls: ['./bench-field.component.scss']
})
export class BenchFieldComponent implements OnInit {
  @Input() selectedCard: SelectedCard;
  @Output() onClickBench = new EventEmitter<[number, number]>();

  constructor(private service: PokecaServiceService) {}

  ngOnInit() {

  }

}
