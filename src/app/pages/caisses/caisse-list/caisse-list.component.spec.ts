import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseListComponent } from './caisse-list.component';

describe('CaisseListComponent', () => {
  let component: CaisseListComponent;
  let fixture: ComponentFixture<CaisseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaisseListComponent]
    });
    fixture = TestBed.createComponent(CaisseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
