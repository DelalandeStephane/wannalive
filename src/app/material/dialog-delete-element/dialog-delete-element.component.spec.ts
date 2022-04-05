import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteElementComponent } from './dialog-delete-element.component';

describe('DialogDeleteElementComponent', () => {
  let component: DialogDeleteElementComponent;
  let fixture: ComponentFixture<DialogDeleteElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
