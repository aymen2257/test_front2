import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInformationsComponent } from './update-informations.component';

describe('UpdateInformationsComponent', () => {
  let component: UpdateInformationsComponent;
  let fixture: ComponentFixture<UpdateInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
