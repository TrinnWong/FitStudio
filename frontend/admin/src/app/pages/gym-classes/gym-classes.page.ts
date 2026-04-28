import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GymClass, GymClassService } from '../../services/gym-class.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gym-classes',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  template: `
    <ion-content class="ion-padding">
      <div class="page-header">
        <h1>Clases</h1>
        <button class="btn-new" (click)="onNewClass()">+ Nueva clase</button>
      </div>

      <div class="table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Programado</th>
              <th>Estado</th>
              <th class="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let class of classes">
              <td>
                <div class="class-info">
                   <div class="class-icon"><ion-icon name="people-outline"></ion-icon></div>
                   <span>{{ class.name }}</span>
                </div>
              </td>
              <td>0 programado</td>
              <td>
                <span class="badge" [class.active]="class.isActive">
                  {{ class.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="text-right">
                <ion-button fill="clear" size="small" (click)="onEdit(class)">
                  <ion-icon name="create-outline" slot="icon-only"></ion-icon>
                </ion-button>
                <ion-button fill="clear" size="small" color="danger" (click)="onDelete(class)">
                  <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
                </ion-button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="classes.length === 0 && !loading">
          <div class="empty-illustration">
             <img src="assets/empty-classes.png" alt="No classes">
          </div>
          <p>No tienes ninguna actividad</p>
          <a (click)="onNewClass()">+ Crear actividad</a>
        </div>
        
        <div class="loading-state" *ngIf="loading">
           <ion-spinner name="crescent"></ion-spinner>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 0 1rem;
    }
    
    h1 { font-size: 2rem; color: #1e3a8a; font-weight: bold; margin: 0; }
    
    .btn-new {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border: 1px solid #f0f0f0;
      overflow: hidden;
      min-height: 400px;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      
      th {
        text-align: left;
        padding: 1.2rem 1.5rem;
        background: white;
        color: #444;
        font-weight: 600;
        border-bottom: 1px solid #f0f0f0;
        font-size: 0.9rem;
      }
      
      td {
        padding: 1.2rem 1.5rem;
        border-bottom: 1px solid #f9f9f9;
        color: #333;
        vertical-align: middle;
      }
    }

    .class-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .class-icon {
        width: 32px;
        height: 32px;
        background: #f0f7ff;
        color: #007bff;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      background: #f0f2f5;
      color: #666;
      
      &.active {
        background: #e6f7ed;
        color: #1a8754;
      }
    }

    .text-right { text-align: right; }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
      
      .empty-illustration {
        width: 200px;
        margin-bottom: 1.5rem;
        opacity: 0.6;
      }
      
      p { color: #666; font-weight: 500; margin-bottom: 0.5rem; }
      a { color: #007bff; font-weight: bold; cursor: pointer; text-decoration: none; }
    }
    
    .loading-state {
      display: flex;
      justify-content: center;
      padding: 4rem;
    }
  `]
})
export class GymClassesPage implements OnInit {
  classes: GymClass[] = [];
  loading = false;
  studioId = ''; 

  constructor(
    private gymClassService: GymClassService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studioId = localStorage.getItem('studioId') || '';
  }

  ionViewWillEnter() {
    if (this.studioId) {
      this.loadClasses();
    } else {
      // Re-check studioId just in case
      this.studioId = localStorage.getItem('studioId') || '';
      if (this.studioId) this.loadClasses();
    }
  }

  loadClasses() {
    this.loading = true;
    this.gymClassService.getByStudio(this.studioId).subscribe({
      next: (res) => {
        this.classes = res;
      },
      error: (err) => console.error(err),
      complete: () => this.loading = false
    });
  }

  onNewClass() {
    this.router.navigate(['/tabs/gym-classes/new']);
  }

  onEdit(gymClass: GymClass) {
    this.router.navigate(['/tabs/gym-classes/edit', gymClass.id]);
  }

  onDelete(gymClass: GymClass) {
    if (confirm('¿Estás seguro de eliminar esta clase?')) {
      this.gymClassService.delete(gymClass.id).subscribe(() => {
        this.loadClasses();
      });
    }
  }
}
