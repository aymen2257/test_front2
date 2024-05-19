import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamtionuserComponent } from './reclamtionuser.component';

describe('ReclamtionuserComponent', () => {
  let component: ReclamtionuserComponent;
  let fixture: ComponentFixture<ReclamtionuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReclamtionuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamtionuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
