import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngScrappyComponent } from './ang-scrappy.component';

describe('AngScrappyComponent', () => {
  let component: AngScrappyComponent;
  let fixture: ComponentFixture<AngScrappyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngScrappyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngScrappyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
