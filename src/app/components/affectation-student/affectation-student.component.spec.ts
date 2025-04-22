import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationStudentComponent } from './affectation-student.component';

describe('AffectationStudentComponent', () => {
  let component: AffectationStudentComponent;
  let fixture: ComponentFixture<AffectationStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
