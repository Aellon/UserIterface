import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeGraphComponent } from './whole-graph.component';

describe('WholeGraphComponent', () => {
  let component: WholeGraphComponent;
  let fixture: ComponentFixture<WholeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
