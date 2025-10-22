import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseUpShowComponent } from './close-up-show.component';

describe('CloseUpShowComponent', () => {
  let component: CloseUpShowComponent;
  let fixture: ComponentFixture<CloseUpShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseUpShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseUpShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
