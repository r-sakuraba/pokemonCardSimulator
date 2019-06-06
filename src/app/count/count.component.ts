import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {
  @Input() deckCount: number;
  @Input() handCount: number;
  constructor() { }

  ngOnInit() {
  }

}
