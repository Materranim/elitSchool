import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabClasseComponent } from './tab-classe.component';

describe('TabClasseComponent', () => {
  let component: TabClasseComponent;
  let fixture: ComponentFixture<TabClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabClasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
