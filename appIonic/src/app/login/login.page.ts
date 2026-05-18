import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { UserService } from '../services/user.service';

// Página Login (Taller 3, Parte 2, p.13-21 del PDF)
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Formulario reactivo (p.17 del PDF). Lo tipamos como FormGroup
  // para mantener compatibilidad con el código del PDF (formLogin: any).
  formLogin!: FormGroup;

  // Mensaje de error que se mostrará en el <ion-alert> (p.20-21 del PDF)
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSrv: UserService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    // FormGroup con dos FormControl (p.17 del PDF):
    // - email: required + validador de e-mail
    // - password: required + mínimo 6 caracteres
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Taller 4, p.8 del PDF: deshabilitamos el menú lateral en la página de login.
  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'principal');
  }

  // Manejador del botón Entrar (p.20 del PDF)
  doLogin() {
    const email = this.formLogin.get('email')!.value;
    const password = this.formLogin.get('password')!.value;

    const user = this.userSrv.login(email, password);
    if (user != null) {
      this.router.navigateByUrl('tabs');
    } else {
      this.error = 'Error, credenciales incorrectas';
    }
  }
}
