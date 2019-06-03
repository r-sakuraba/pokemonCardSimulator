/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PokecaServiceService } from './pokeca-service.service';

describe('Service: PokecaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokecaServiceService]
    });
  });

  it('should ...', inject([PokecaServiceService], (service: PokecaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
