import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditscanComponent } from './auditscan.component';

describe('AuditscanComponent', () => {
  let component: AuditscanComponent;
  let fixture: ComponentFixture<AuditscanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditscanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
