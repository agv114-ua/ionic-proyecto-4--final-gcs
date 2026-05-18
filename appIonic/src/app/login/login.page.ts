import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

// Pagina Login (Taller 3, Parte 2, p.13-21 del PDF + mejora de sesion persistente)
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Formulario reactivo (p.17 del PDF). Lo tipamos como FormGroup
  // para mantener compatibilidad con el codigo del PDF (formLogin: any).
  formLogin!: FormGroup;

  // Mensaje de error que se mostrara en el <ion-alert> (p.20-21 del PDF)
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSrv: UserService,
    private authSrv: AuthService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Taller 4, p.8 del PDF: deshabilitamos el menu lateral en la pagina de login.
  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'principal');
  }

  // Manejador del boton Entrar (p.20 del PDF) + persistencia en Storage.
  async doLogin() {
    const email = this.formLogin.get('email')!.value;
    const password = this.formLogin.get('password')!.value;

    const user = this.userSrv.login(email, password);
    if (user != null) {
      // Guarda la sesion para el AuthGuard / auto-login en la proxima visita.
      await this.authSrv.setSession(user);
      this.router.navigateByUrl('tabs');
    } else {
      this.error = 'Error, credenciales incorrectas';
    }
  }
}
