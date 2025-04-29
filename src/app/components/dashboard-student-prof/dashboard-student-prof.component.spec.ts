import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentProfComponent } from './dashboard-student-prof.component';

describe('DashboardStudentProfComponent', () => {
  let component: DashboardStudentProfComponent;
  let fixture: ComponentFixture<DashboardStudentProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStudentProfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStudentProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
