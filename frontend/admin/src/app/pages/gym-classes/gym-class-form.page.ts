import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GymClassService } from '../../services/gym-class.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gym-class-form',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  template: `
    <ion-content class="ion-padding form-bg">
      <div class="form-header">
        <a (click)="goBack()" class="back-link">
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>{{ isEdit ? 'Editar clase' : 'Nueva clase' }}</span>
        </a>
        <div class="status-toggle">
           <span>Estado</span>
           <div class="toggle-btn" [class.active]="formData.isActive" (click)="toggleStatus()">
              {{ formData.isActive ? 'Activo' : 'Inactivo' }}
              <ion-icon [name]="formData.isActive ? 'chevron-down' : 'chevron-up'"></ion-icon>
           </div>
        </div>
      </div>

      <div class="card info-banner">
        <h3>Clase grupal</h3>
        <p>Una clase grupal le permite tener varios participantes. Puede ser una clase online o presencial.</p>
      </div>

      <div class="card main-form">
        <h2>Detalles</h2>
        
        <div class="form-group">
          <label>Nombre</label>
          <p class="label-hint">Escribe un nombre sólido para tu clase. Recuerda, este será visible para el público.</p>
          <input type="text" [(ngModel)]="formData.name" placeholder="Ingresa un nombre">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Tipo de clase <span class="optional">Opcional</span></label>
            <p class="label-hint">Tus clientes verán el tipo de clase desde tu sitio web.</p>
            <select [(ngModel)]="formData.classType">
              <option value="">Selecciona una opción</option>
              <option value="Grupal">Grupal</option>
              <option value="Privada">Privada (1-1)</option>
              <option value="Taller">Taller</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Descripción <span class="optional">Opcional</span></label>
          <p class="label-hint">Esta descripción aparecerá en tu página. Úsala para explicar al espectador qué esperar de tu clase.</p>
          <textarea rows="6" [(ngModel)]="formData.description" placeholder="Ingresa una descripción"></textarea>
        </div>

        <div class="form-group">
          <label>Fotos <span class="optional">Opcional</span></label>
          <p class="label-hint">Medida recomendada: 750x585 px</p>
          <div class="upload-box">
             <ion-icon name="image-outline"></ion-icon>
             <span>Agregar foto</span>
          </div>
        </div>
      </div>

      <div class="card section-card">
         <div class="section-header" (click)="visibilidadOpen = !visibilidadOpen">
            <h2>Visibilidad</h2>
            <ion-icon [name]="visibilidadOpen ? 'chevron-up' : 'chevron-down'"></ion-icon>
         </div>
         <div class="section-content" *ngIf="visibilidadOpen">
            <ion-item lines="none" class="toggle-item">
              <ion-label>
                <h3>Publicado</h3>
                <p>Si está activo, tus clientes podrán ver y reservar esta clase.</p>
              </ion-label>
              <ion-toggle slot="end" [(ngModel)]="formData.isActive"></ion-toggle>
            </ion-item>
         </div>
      </div>

      <div class="form-actions">
        <button class="btn-cancel" (click)="goBack()">Cancelar</button>
        <button class="btn-save" (click)="onSave()" [disabled]="loading">
           {{ loading ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </ion-content>
  `,
  styles: [`
    .form-bg { --background: #f8f9fa; }
    
    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .back-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #1e3a8a;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
    }

    .status-toggle {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 0.9rem;
      color: #666;
    }

    .toggle-btn {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      background: #eee;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      font-weight: 500;
      
      &.active {
        background: #e6f7ed;
        color: #1a8754;
      }
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      border: 1px solid #f0f0f0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }

    .info-banner {
      h3 { margin: 0 0 0.5rem 0; color: #1e3a8a; font-size: 1.2rem; }
      p { margin: 0; color: #666; font-size: 0.95rem; }
    }

    h2 { font-size: 1.3rem; color: #333; margin: 0 0 1.5rem 0; }

    .form-group {
      margin-bottom: 1.5rem;
      
      label { display: block; font-weight: 600; color: #333; margin-bottom: 0.2rem; }
      .optional { color: #999; font-weight: normal; font-size: 0.8rem; margin-left: 0.5rem; }
      .label-hint { font-size: 0.85rem; color: #777; margin: 0 0 0.8rem 0; }
      
      input, select, textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        outline: none;
        &:focus { border-color: #007bff; }
      }
    }

    .upload-box {
      border: 2px dashed #ddd;
      border-radius: 12px;
      padding: 3rem;
      text-align: center;
      color: #007bff;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      
      ion-icon { font-size: 2rem; }
      &:hover { background: #f0f7ff; border-color: #007bff; }
    }

    .section-card {
      padding: 0;
      overflow: hidden;
      
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2rem 2rem;
        cursor: pointer;
        h2 { margin: 0; }
      }

      .section-content {
        padding: 0 1rem 1.5rem 1rem;
        
        .toggle-item {
          --padding-start: 1rem;
          --background: #f9fafb;
          border-radius: 8px;
          
          h3 { margin: 0; font-size: 1rem; font-weight: 600; }
          p { margin: 0.2rem 0 0 0; font-size: 0.85rem; color: #666; }
          
          ion-toggle {
            --handle-background: #fff;
            --handle-background-checked: #fff;
            --background-checked: #3b82f6;
          }
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      margin-bottom: 3rem;
    }

    .btn-cancel {
      background: transparent;
      color: #666;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-save {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.8rem 2.5rem;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
  `]
})
export class GymClassFormPage implements OnInit {
  isEdit = false;
  loading = false;
  visibilidadOpen = false;
  studioId = '';

  formData: any = {
    id: '',
    name: '',
    description: '',
    classType: '',
    isActive: true,
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gymClassService: GymClassService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.studioId = localStorage.getItem('studioId') || '';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadClass(id);
    }
  }

  loadClass(id: string) {
    this.gymClassService.getById(id).subscribe(res => {
      this.formData = { 
        ...res, 
        description: res.description || '',
        classType: res.classType || '',
        imageUrl: res.imageUrl || ''
      };
    });
  }

  toggleStatus() {
    this.formData.isActive = !this.formData.isActive;
  }

  async onSave() {
    if (!this.formData.name) {
      this.showMessage('Validación', 'Por favor ingresa un nombre para la clase');
      return;
    }

    this.loading = true;
    const obs = this.isEdit 
      ? this.gymClassService.update(this.formData)
      : this.gymClassService.create(this.studioId, this.formData);

    obs.subscribe({
      next: () => {
        this.router.navigate(['/tabs/gym-classes']);
      },
      error: async (err) => {
        console.error(err);
        this.loading = false; // Importante: volver a habilitar el botón
        const errorMsg = err.error?.message || 'Ocurrió un error al intentar guardar la clase. Por favor verifica los datos.';
        await this.showMessage('Error', errorMsg);
      },
      complete: () => this.loading = false
    });
  }

  async showMessage(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'premium-alert'
    });
    await alert.present();
  }

  goBack() {
    this.router.navigate(['/tabs/gym-classes']);
  }
}
