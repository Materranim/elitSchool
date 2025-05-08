import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiStudentComponent } from './emploi-student.component';

describe('EmploiStudentComponent', () => {
  let component: EmploiStudentComponent;
  let fixture: ComponentFixture<EmploiStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploiStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
