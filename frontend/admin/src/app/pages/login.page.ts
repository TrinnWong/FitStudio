import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  template: `
    <ion-content [fullscreen]="true">
      <div class="login-wrapper">
        <!-- Hero Section (Left) -->
        <div class="hero-section">
          <div class="logo-top">
             <img src="assets/logo.png" alt="FitStudio Logo" class="logo-img">
             <span class="logo-text">FitStudio</span>
          </div>
          <div class="hero-content">
             <img src="assets/login-hero.png" alt="Exercise" class="hero-img">
          </div>
        </div>

        <!-- Form Section (Right) -->
        <div class="form-section">
          <div class="form-container">
            <h1>Login to FitStudio Admin</h1>
            <p class="subtitle">Sign in to your account</p>

            <div class="input-group">
              <label>Email address</label>
              <input type="email" placeholder="Email address" [(ngModel)]="email">
            </div>

            <div class="input-group">
              <label>Password</label>
              <input type="password" placeholder="Password" [(ngModel)]="password">
            </div>

            <button class="btn-primary" (click)="onLogin()" [disabled]="loading">
              {{ loading ? 'Logging in...' : 'Log in' }}
            </button>

            <div class="form-footer">
              <a (click)="onResetPassword()">Reset password</a>
              <p>Don't have an account? <a (click)="onRegister()">Get started</a></p>
            </div>
          </div>
          
          <div class="footer-links">
             <a routerLink="/terms">Términos de uso</a>
             <a routerLink="/privacy">Política de privacidad</a>
             <a routerLink="/cookies">Política de cookies</a>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      height: 100vh;
      width: 100%;
    }

    .hero-section {
      flex: 1.2;
      background: #f4f7fa;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .logo-top {
      position: absolute;
      top: 2rem;
      left: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-img { width: 32px; }
    .logo-text { font-weight: bold; font-size: 1.5rem; color: #1a1a1a; }

    .hero-img {
      max-width: 90%;
      object-fit: contain;
    }

    .form-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      position: relative;
    }

    .form-container {
      width: 100%;
      max-width: 400px;
    }

    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #333; }
    .subtitle { color: #666; margin-bottom: 2rem; }

    .input-group {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    label { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; color: #444; }
    input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s;
    }
    input:focus { border-color: #007bff; }

    .btn-primary {
      width: 100%;
      padding: 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
      transition: background 0.3s;
    }
    .btn-primary:hover { background: #0056b3; }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }

    .form-footer {
      margin-top: 1.5rem;
      text-align: left;
    }
    .form-footer a { color: #007bff; cursor: pointer; text-decoration: none; font-size: 0.9rem; }
    .form-footer p { margin-top: 1rem; font-size: 0.9rem; color: #666; }

    .footer-links {
      position: absolute;
      bottom: 1rem;
      display: flex;
      gap: 1.5rem;
    }
    .footer-links a { color: #999; font-size: 0.8rem; text-decoration: none; }

    @media (max-width: 992px) {
      .hero-section { display: none; }
    }
  `]
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.showMessage('Validación', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    this.loading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login success', res);
        localStorage.setItem('token', res.token);
        if (res.studioId) {
          localStorage.setItem('studioId', res.studioId);
        }
        this.router.navigate(['/tabs']);
      },
      error: async (err) => {
        console.error('Login error', err);
        this.loading = false;
        const errorMsg = err.error?.message || 'Correo o contraseña incorrectos. Por favor intenta de nuevo.';
        await this.showMessage('Error de acceso', errorMsg);
      },
      complete: () => this.loading = false
    });
  }

  async showMessage(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Entendido'],
      cssClass: 'premium-alert'
    });
    await alert.present();
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onResetPassword() {
    console.log('Reset password');
  }
}
