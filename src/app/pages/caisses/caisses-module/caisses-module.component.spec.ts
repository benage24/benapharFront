import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissesModuleComponent } from './caisses-module.component';

describe('CaissesModuleComponent', () => {
  let component: CaissesModuleComponent;
  let fixture: ComponentFixture<CaissesModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaissesModuleComponent]
    });
    fixture = TestBed.createComponent(CaissesModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
