import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatieresComponent } from './add-matieres.component';

describe('AddMatieresComponent', () => {
  let component: AddMatieresComponent;
  let fixture: ComponentFixture<AddMatieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatieresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
