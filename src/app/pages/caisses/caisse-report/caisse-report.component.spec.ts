import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseReportComponent } from './caisse-report.component';

describe('CaisseReportComponent', () => {
  let component: CaisseReportComponent;
  let fixture: ComponentFixture<CaisseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaisseReportComponent]
    });
    fixture = TestBed.createComponent(CaisseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
