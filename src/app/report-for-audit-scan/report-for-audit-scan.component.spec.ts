import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportForAuditScanComponent } from './report-for-audit-scan.component';

describe('ReportForAuditScanComponent', () => {
  let component: ReportForAuditScanComponent;
  let fixture: ComponentFixture<ReportForAuditScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportForAuditScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportForAuditScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
