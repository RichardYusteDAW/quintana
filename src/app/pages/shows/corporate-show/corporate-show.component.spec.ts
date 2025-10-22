import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateShowComponent } from './corporate-show.component';

describe('CorporateShowComponent', () => {
  let component: CorporateShowComponent;
  let fixture: ComponentFixture<CorporateShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
