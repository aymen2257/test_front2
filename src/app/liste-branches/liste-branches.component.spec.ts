import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBranchesComponent } from './liste-branches.component';

describe('ListeBranchesComponent', () => {
  let component: ListeBranchesComponent;
  let fixture: ComponentFixture<ListeBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeBranchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
