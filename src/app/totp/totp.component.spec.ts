import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotpComponent } from './totp.component';

describe('TotpComponent', () => {
  let component: TotpComponent;
  let fixture: ComponentFixture<TotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
