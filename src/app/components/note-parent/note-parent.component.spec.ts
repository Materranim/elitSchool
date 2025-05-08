import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteParentComponent } from './note-parent.component';

describe('NoteParentComponent', () => {
  let component: NoteParentComponent;
  let fixture: ComponentFixture<NoteParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
