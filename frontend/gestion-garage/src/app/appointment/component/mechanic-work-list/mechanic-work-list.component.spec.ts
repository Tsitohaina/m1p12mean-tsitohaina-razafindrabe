import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicWorkListComponent } from './mechanic-work-list.component';

describe('MechanicWorkListComponent', () => {
  let component: MechanicWorkListComponent;
  let fixture: ComponentFixture<MechanicWorkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicWorkListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
