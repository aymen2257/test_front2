import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiyTokenComponent } from './verifiy-token.component';

describe('VerifiyTokenComponent', () => {
  let component: VerifiyTokenComponent;
  let fixture: ComponentFixture<VerifiyTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifiyTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifiyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
