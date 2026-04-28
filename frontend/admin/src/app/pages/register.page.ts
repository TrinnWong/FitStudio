import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  template: `
    <ion-content [fullscreen]="true" class="register-content">
      <div class="register-wrapper">
        <!-- Main Form Card (Center) -->
        <div class="card-container">
          <div class="register-card">
            <h1>Obten tu cuenta gratuita</h1>
            <p class="subtitle">Tu cuenta gratuita para siempre te brinda acceso gratuito a las funciones principales para impulsar tu negocio.</p>
            <p class="no-risk">Sin riesgo. No se requiere tarjeta de crédito.</p>

            <div class="input-group">
              <label>Nombre completo</label>
              <input type="text" placeholder="Ej. Daniel Arturo Moreno Wong" [(ngModel)]="fullName">
            </div>

            <div class="input-group">
              <label>Nombre de tu Estudio</label>
              <input type="text" placeholder="Ej. FitStudio Center" [(ngModel)]="studioName">
            </div>

            <div class="input-group">
              <label>Correo electrónico</label>
              <input type="email" placeholder="email@ejemplo.com" [(ngModel)]="email">
            </div>

            <div class="input-group">
              <label>Contraseña</label>
              <input type="password" placeholder="••••••••" [(ngModel)]="password">
            </div>

            <button class="btn-primary" (click)="onRegister()" [disabled]="loading">
               {{ loading ? 'Enviando código...' : 'Empezar' }}
            </button>

            <div class="card-footer">
              <p>Al crear una cuenta, <a routerLink="/terms">aceptas los términos de servicio.</a></p>
              <p class="login-link">¿Ya tienes una cuenta? <a (click)="onLogin()">Inicia sesión</a></p>
            </div>
          </div>
        </div>

        <!-- Info Section (Right) -->
        <div class="info-section">
          <div class="info-content">
            <h3>Que obtienes gratis para siempre</h3>
            <ul>
              <li><ion-icon name="checkmark-outline"></ion-icon> Tu propio sitio web personalizable</li>
              <li><ion-icon name="checkmark-outline"></ion-icon> Reservas de clases ilimitadas</li>
              <li><ion-icon name="checkmark-outline"></ion-icon> Reservas de citas ilimitadas</li>
              <li><ion-icon name="checkmark-outline"></ion-icon> Pagos ilimitados</li>
              <li><ion-icon name="checkmark-outline"></ion-icon> Almacenamiento de videos de 5 GB</li>
            </ul>

            <div class="stats-section">
              <h3>Únete a miles de emprendedores de fitness y bienestar haciendo 6 cifras este año</h3>
              <div class="testimonials">
                <div class="testimonial">
                  <p>"Nunca pensé que cambiar de sistema pudiera ser tan rápido y fácil. Además, ¡a mis clientes les ENCANTA!"</p>
                  <div class="author">
                    <img src="assets/avatar1.png" alt="Yvonne">
                    <div>
                      <strong>Yvonne</strong>
                      <span>Feeling the fitness</span>
                    </div>
                  </div>
                </div>
                <div class="testimonial">
                  <p>"¡Finalmente una verdadera plataforma todo-en-uno! FitStudio me está ahorrando mucho tiempo y me está ayudando a hacer crecer mi negocio cada mes."</p>
                  <div class="author">
                    <img src="assets/avatar2.png" alt="George">
                    <div>
                      <strong>George</strong>
                      <span>Newschool Academy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .register-content {
      --background: #3b66bc;
    }

    .register-wrapper {
      display: flex;
      min-height: 100vh;
      width: 100%;
      padding: 2rem;
      gap: 4rem;
      align-items: center;
      justify-content: center;
    }

    .card-container {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .register-card {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    h1 { font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1rem; }
    .subtitle { color: #555; line-height: 1.5; margin-bottom: 0.5rem; }
    .no-risk { font-weight: bold; color: #444; margin-bottom: 2rem; }

    .input-group {
      margin-bottom: 1.2rem;
      display: flex;
      flex-direction: column;
    }

    label { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; color: #333; }
    input {
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
    }

    .btn-primary {
      width: 100%;
      padding: 1.1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
    }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }

    .card-footer {
      margin-top: 1.5rem;
      font-size: 0.85rem;
      color: #666;
    }
    .card-footer a { color: #007bff; text-decoration: none; cursor: pointer; }
    .login-link { margin-top: 1rem; font-size: 1rem; }

    .info-section {
      flex: 1;
      color: white;
    }

    .info-content {
      max-width: 500px;
    }

    h3 { font-size: 1.5rem; margin-bottom: 1.5rem; font-weight: bold; }
    ul { list-style: none; padding: 0; }
    li { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem; font-size: 1rem; }
    ion-icon { font-size: 1.2rem; }

    .stats-section {
      margin-top: 4rem;
    }

    .testimonials {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .testimonial {
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      padding: 1.5rem;
      border-radius: 12px;
    }

    .testimonial p { font-style: italic; margin-bottom: 1rem; }
    .author { display: flex; align-items: center; gap: 1rem; }
    .author img { width: 40px; height: 40px; border-radius: 50%; }
    .author strong { display: block; font-size: 0.9rem; }
    .author span { font-size: 0.8rem; color: #666; }

    @media (max-width: 992px) {
      .register-wrapper { flex-direction: column; padding: 1rem; gap: 2rem; }
      .card-container { justify-content: center; width: 100%; }
      .info-section { display: none; }
    }
  `]
})
export class RegisterPage {
  fullName = '';
  studioName = '';
  email = '';
  password = '';
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    this.loading = true;
    const userData = {
      fullName: this.fullName,
      studioName: this.studioName,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        console.log('Register request success', res);
        this.router.navigate(['/verification'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        console.error('Register error', err);
        alert('Error al registrarse: ' + (err.error?.message || 'Ocurrió un error inesperado'));
      },
      complete: () => this.loading = false
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
