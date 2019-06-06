import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card/card.component';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.scss']
})
export class BenchComponent implements OnInit {

  @Input() bench: Card[];
  constructor() { }

  ngOnInit() {
  }

}
