import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificarPage } from './justificar.page';

describe('JustificarPage', () => {
  let component: JustificarPage;
  let fixture: ComponentFixture<JustificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
