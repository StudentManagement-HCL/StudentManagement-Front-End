import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditProfileComponent } from './student-edit-profile.component';

describe('StudentEditProfileComponent', () => {
  let component: StudentEditProfileComponent;
  let fixture: ComponentFixture<StudentEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEditProfileComponent]
    });
    fixture = TestBed.createComponent(StudentEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
