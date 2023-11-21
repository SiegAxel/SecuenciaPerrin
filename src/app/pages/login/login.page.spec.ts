import { ComponentFixture, TestBed} from '@angular/core/testing'
import { AngularFireModule } from '@angular/fire/compat';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { LoginPage } from "./login.page";

describe('1. Página Login', () => {
  
  // Preparar ambiente de pruebas //
  let component: LoginPage; 
  let fixture: ComponentFixture<LoginPage>

  // Preparar los módulos necesarios //
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(),AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Cada testing unitario //
  it('1.1 Creación del componente Login', () => {
    expect(component).toBeTruthy();
  });

  it('1.2 Correo incorrecto', () => {
    const correo_usuario = component.usuario.get('email');
    correo_usuario?.setValue('uwu');
    expect(correo_usuario?.invalid).toBeTruthy();
  })

  it('1.3 Correo correcto', () => {
    const correo_usuario = component.usuario.get('email');
    correo_usuario?.setValue('ariel@duoc.cl');
    expect(correo_usuario?.valid).toBeTruthy();
  })

  it('1.4 Formularrio incorrecto', () => {
    const correo_usuario = component.usuario.get('email');
    const clave = component.usuario.controls['clave'];
    correo_usuario?.setValue('uwu');
    clave.setValue('Paltanoesaguacate');
    expect(component.usuario.invalid).toBeTruthy();
  })

  it('1.5 Formularrio correcto', () => {
    const correo_usuario = component.usuario.get('email');
    const clave = component.usuario.controls['clave'];
    correo_usuario?.setValue('ariel@duoc.cl');
    clave.setValue('Judas123');
    expect(component.usuario.valid).toBeTruthy();
  })

  it('1.6 Formulario llama al método Login', () => {
    const form = fixture.debugElement.query(By.css("form"));
    const btn = spyOn(component, 'login');

    form.triggerEventHandler('click', null);

    expect(btn).toHaveBeenCalled();
  })

  it('1.7 Devolver un valor: true', () => {
    const correo_usuario = component.usuario.get('email');
    const clave = component.usuario.controls['clave'];
    correo_usuario?.setValue('ariel@duoc.cl');
    clave.setValue('Judas123');

    component.login();

    expect(component.isCheck).toBeTrue();
  })

});
// Hasta aqui es standard // 