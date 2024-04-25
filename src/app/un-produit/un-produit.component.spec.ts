import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnProduitComponent } from './un-produit.component';

describe('UnProduitComponent', () => {
  let component: UnProduitComponent;
  let fixture: ComponentFixture<UnProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnProduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
