import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListMessageComponent } from './admin-list-message.component';

describe('AdminListMessageComponent', () => {
  let component: AdminListMessageComponent;
  let fixture: ComponentFixture<AdminListMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
