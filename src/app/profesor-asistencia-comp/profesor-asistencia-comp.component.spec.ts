import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfesorAsistenciaCompComponent } from './profesor-asistencia-comp.component';

describe('ProfesorAsistenciaCompComponent', () => {
  let component: ProfesorAsistenciaCompComponent;
  let fixture: ComponentFixture<ProfesorAsistenciaCompComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorAsistenciaCompComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorAsistenciaCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
