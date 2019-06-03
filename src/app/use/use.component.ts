import { Component, OnInit } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';

@Component({
  selector: 'app-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.scss']
})
export class UseComponent implements OnInit {

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

}
