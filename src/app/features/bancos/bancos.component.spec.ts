import { ComponentFixture, TestBed } from '@angular/core/testing';

import { bancosComponent } from './bancos.component';

describe('bancosComponent', () => {
  let component: bancosComponent;
  let fixture: ComponentFixture<bancosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [bancosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(bancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
