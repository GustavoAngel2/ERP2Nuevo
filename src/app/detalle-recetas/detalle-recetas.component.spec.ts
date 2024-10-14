import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRecetasComponent } from './detalle-recetas.component';

describe('DetalleRecetasComponent', () => {
  let component: DetalleRecetasComponent;
  let fixture: ComponentFixture<DetalleRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleRecetasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
