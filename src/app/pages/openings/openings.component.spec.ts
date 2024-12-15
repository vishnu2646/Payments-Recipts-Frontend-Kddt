import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningsComponent } from './openings.component';

describe('OpeningsComponent', () => {
  let component: OpeningsComponent;
  let fixture: ComponentFixture<OpeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpeningsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
