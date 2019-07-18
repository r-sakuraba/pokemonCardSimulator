import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gx',
  templateUrl: './gx.component.html',
  styleUrls: ['./gx.component.scss']
})
export class GxComponent implements OnInit {

  gx_marker: boolean = true;

  onClickGX() {
    this.gx_marker = !this.gx_marker;
  }

  constructor() { }

  ngOnInit() {
  }

}
