import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTickerFormComponent } from './stock-ticker-form.component';

describe('StockTickerFormComponent', () => {
  let component: StockTickerFormComponent;
  let fixture: ComponentFixture<StockTickerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTickerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
