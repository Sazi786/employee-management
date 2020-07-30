import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSureComponent } from './tag-sure.component';

describe('TagSureComponent', () => {
  let component: TagSureComponent;
  let fixture: ComponentFixture<TagSureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
