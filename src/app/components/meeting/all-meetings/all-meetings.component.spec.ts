import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMeetingsComponent } from './all-meetings.component';

describe('AllMeetingsComponent', () => {
  let component: AllMeetingsComponent;
  let fixture: ComponentFixture<AllMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
