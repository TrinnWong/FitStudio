import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  template: `
    <ion-content [fullscreen]="true" class="verification-content">
      <div class="verification-wrapper">
        <div class="verification-card">
          <div class="icon-header">
            <ion-icon name="mail-open-outline"></ion-icon>
          </div>
          <h1>Verifica tu cuenta</h1>
          <p>Hemos enviado un código de verificación a: <br><strong>{{ email }}</strong></p>
          
          <div class="code-inputs">
            <input type="text" maxlength="6" placeholder="000000" [(ngModel)]="verificationCode" class="otp-input" [disabled]="loading">
          </div>

          <button class="btn-primary" (click)="onVerify()" [disabled]="loading || verificationCode.length < 6">
             {{ loading ? 'Verificando...' : 'Verificar Código' }}
          </button>
          
          <div class="footer">
            <p>¿No recibiste el código? <a (click)="resendCode()">Reenviar</a></p>
            <a (click)="goBack()" class="back-link">Volver al registro</a>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .verification-content {
      --background: #f4f7fa;
    }

    .verification-wrapper {
      display: flex;
      height: 100vh;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .verification-card {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      width: 100%;
      max-width: 450px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .icon-header {
      font-size: 4rem;
      color: #007bff;
      margin-bottom: 1.5rem;
    }

    h1 { font-size: 2rem; color: #333; margin-bottom: 1rem; }
    p { color: #666; margin-bottom: 2rem; line-height: 1.5; }

    .otp-input {
      width: 100%;
      padding: 1rem;
      font-size: 2rem;
      text-align: center;
      letter-spacing: 0.5rem;
      border: 2px solid #ddd;
      border-radius: 12px;
      margin-bottom: 2rem;
      outline: none;
      transition: border-color 0.3s;
    }
    .otp-input:focus { border-color: #007bff; }
    .otp-input:disabled { background: #f9f9f9; }

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
    }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }

    .footer {
      margin-top: 2rem;
    }
    .footer p { margin-bottom: 1rem; font-size: 0.95rem; }
    .footer a { color: #007bff; cursor: pointer; text-decoration: none; font-weight: 600; }
    .back-link { display: block; margin-top: 1rem; font-size: 0.9rem; color: #999 !important; font-weight: normal !important; }
  `]
})
export class VerificationPage {
  email = '';
  verificationCode = '';
  loading = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onVerify() {
    this.loading = true;
    console.log('Sending verification code for:', this.email);
    
    this.authService.verifyCode({ email: this.email, code: this.verificationCode }).subscribe({
      next: (res) => {
        console.log('Verification successful. Response:', res);
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          if (res.studioId) {
            localStorage.setItem('studioId', res.studioId);
          }
          console.log('Token saved. Navigating to /tabs...');
          this.router.navigateByUrl('/tabs').then(success => {
            if (success) {
              console.log('Navigation to /tabs successful');
            } else {
              console.error('Navigation to /tabs failed');
            }
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        } else {
          console.error('No token received in response');
          alert('Error: No se recibió un token de acceso.');
        }
      },
      error: (err) => {
        console.error('Verification API error:', err);
        const errorMsg = err.error?.message || 'Código inválido o expirado. Por favor intenta de nuevo.';
        alert('Error: ' + errorMsg);
      },
      complete: () => {
        this.loading = false;
        console.log('Verification process completed');
      }
    });
  }

  resendCode() {
    console.log('Resending code to:', this.email);
    // Logic for resending code could be added to AuthService
  }

  goBack() {
    this.router.navigate(['/register']);
  }
}
