import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevEnviromentComponent } from './dev-enviroment.component';

describe('DevEnviromentComponent', () => {
  let component: DevEnviromentComponent;
  let fixture: ComponentFixture<DevEnviromentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevEnviromentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevEnviromentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
