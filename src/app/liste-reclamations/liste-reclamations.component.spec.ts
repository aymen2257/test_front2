import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReclamationsComponent } from './liste-reclamations.component';

describe('ListeReclamationsComponent', () => {
  let component: ListeReclamationsComponent;
  let fixture: ComponentFixture<ListeReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeReclamationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
