import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabReclamationComponent } from './tab-reclamation.component';

describe('TabReclamationComponent', () => {
  let component: TabReclamationComponent;
  let fixture: ComponentFixture<TabReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
