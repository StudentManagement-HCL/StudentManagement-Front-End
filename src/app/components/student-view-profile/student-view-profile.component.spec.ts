import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewProfileComponent } from './student-view-profile.component';

describe('StudentViewProfileComponent', () => {
  let component: StudentViewProfileComponent;
  let fixture: ComponentFixture<StudentViewProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentViewProfileComponent]
    });
    fixture = TestBed.createComponent(StudentViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
