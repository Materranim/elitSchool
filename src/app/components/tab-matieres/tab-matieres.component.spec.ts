import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMatieresComponent } from './tab-matieres.component';

describe('TabMatieresComponent', () => {
  let component: TabMatieresComponent;
  let fixture: ComponentFixture<TabMatieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabMatieresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
