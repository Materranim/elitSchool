import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationParentComponent } from './reclamation-parent.component';

describe('ReclamationParentComponent', () => {
  let component: ReclamationParentComponent;
  let fixture: ComponentFixture<ReclamationParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
