import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditScanHeaderComponent } from './audit-scan-header.component';

describe('AuditScanHeaderComponent', () => {
  let component: AuditScanHeaderComponent;
  let fixture: ComponentFixture<AuditScanHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditScanHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditScanHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
