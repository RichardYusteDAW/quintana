import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPhotosComponent } from './admin-photos.component';

describe('AdminPhotosComponent', () => {
  let component: AdminPhotosComponent;
  let fixture: ComponentFixture<AdminPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
