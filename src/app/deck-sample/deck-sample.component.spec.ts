/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeckSampleComponent } from './deck-sample.component';

describe('DeckSampleComponent', () => {
  let component: DeckSampleComponent;
  let fixture: ComponentFixture<DeckSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
