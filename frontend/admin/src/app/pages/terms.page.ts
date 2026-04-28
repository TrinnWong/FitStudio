import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/register"></ion-back-button>
        </ion-buttons>
        <ion-title>Términos y Condiciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="terms-container">
        <h1>Términos y Condiciones de Uso - FitStudio</h1>
        <p>Bienvenido a FitStudio. Al utilizar nuestra plataforma, usted acepta los siguientes términos y condiciones:</p>
        
        <h2>1. Uso de la Plataforma</h2>
        <p>FitStudio es una herramienta de gestión para centros de fitness. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.</p>

        <h2>2. Pagos y Suscripciones</h2>
        <p>Los pagos realizados a través de la plataforma están sujetos a las políticas de nuestro procesador de pagos (Stripe). FitStudio no almacena información de tarjetas de crédito.</p>

        <h2>3. Privacidad de Datos</h2>
        <p>Respetamos su privacidad y la de sus clientes. Los datos recopilados se utilizan únicamente para el funcionamiento del servicio y no serán vendidos a terceros.</p>

        <h2>4. Responsabilidad</h2>
        <p>FitStudio no se hace responsable por lesiones o incidentes ocurridos dentro de su establecimiento. La plataforma es únicamente una herramienta administrativa.</p>

        <h2>5. Modificaciones</h2>
        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado de la plataforma implica la aceptación de los nuevos términos.</p>
      </div>
    </ion-content>
  `,
  styles: [`
    .terms-container {
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    h1 { color: var(--ion-color-primary); }
    h2 { margin-top: 2rem; color: var(--ion-color-secondary); }
  `]
})
export class TermsPage {}
