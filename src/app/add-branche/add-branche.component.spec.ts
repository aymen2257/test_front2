import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrancheComponent } from './add-branche.component';

describe('AddBrancheComponent', () => {
  let component: AddBrancheComponent;
  let fixture: ComponentFixture<AddBrancheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBrancheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
