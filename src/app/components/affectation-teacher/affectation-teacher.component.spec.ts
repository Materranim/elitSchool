import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTeacherComponent } from './affectation-teacher.component';

describe('AffectationTeacherComponent', () => {
  let component: AffectationTeacherComponent;
  let fixture: ComponentFixture<AffectationTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
