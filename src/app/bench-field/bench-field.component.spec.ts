import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchFieldComponent } from './bench-field.component';

describe('BenchFieldComponent', () => {
  let component: BenchFieldComponent;
  let fixture: ComponentFixture<BenchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
