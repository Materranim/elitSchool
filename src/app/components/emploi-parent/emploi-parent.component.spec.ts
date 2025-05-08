import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiParentComponent } from './emploi-parent.component';

describe('EmploiParentComponent', () => {
  let component: EmploiParentComponent;
  let fixture: ComponentFixture<EmploiParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploiParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
