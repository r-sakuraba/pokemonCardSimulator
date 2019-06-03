import { Component, OnInit } from '@angular/core';
import { PokecaServiceService } from '../pokeca-service.service';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.scss']
})
export class LostComponent implements OnInit {

  constructor(private service: PokecaServiceService) { }

  ngOnInit() {
  }

}
