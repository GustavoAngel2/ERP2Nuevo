import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentInputComponent } from './silent-input.component';

describe('SilentInputComponent', () => {
  let component: SilentInputComponent;
  let fixture: ComponentFixture<SilentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SilentInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SilentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
