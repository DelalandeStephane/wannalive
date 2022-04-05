import { ComponentFixture, TestBed } from '@angular/core/testing';

import {profilComponent } from './profil.component';

describe('profilComponent', () => {
  let component: profilComponent;
  let fixture: ComponentFixture<profilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ profilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(profilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
