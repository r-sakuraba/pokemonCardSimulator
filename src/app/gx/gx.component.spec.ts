import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GxComponent } from './gx.component';

describe('GxComponent', () => {
  let component: GxComponent;
  let fixture: ComponentFixture<GxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
