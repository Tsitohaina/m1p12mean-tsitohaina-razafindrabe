import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentMechanicComponent } from './list-appointment-mechanic.component';

describe('ListAppointmentMechanicComponent', () => {
  let component: ListAppointmentMechanicComponent;
  let fixture: ComponentFixture<ListAppointmentMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAppointmentMechanicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAppointmentMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
