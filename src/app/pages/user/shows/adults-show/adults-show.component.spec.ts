import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultsShowComponent } from './adults-show.component';

describe('AdultsShowComponent', () => {
  let component: AdultsShowComponent;
  let fixture: ComponentFixture<AdultsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdultsShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdultsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
