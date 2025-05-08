import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfStudentComponent } from './prof-student.component';

describe('ProfStudentComponent', () => {
  let component: ProfStudentComponent;
  let fixture: ComponentFixture<ProfStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
