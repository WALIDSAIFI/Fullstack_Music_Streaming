import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrakComponent } from './addtrak.component';

describe('AddtrakComponent', () => {
  let component: AddtrakComponent;
  let fixture: ComponentFixture<AddtrakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtrakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtrakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
