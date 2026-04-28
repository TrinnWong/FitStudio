import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GymClass {
  id: string;
  name: string;
  description?: string;
  classType?: string;
  imageUrl?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GymClassService {
  private apiUrl = `${environment.apiUrl}/GymClasses`;

  constructor(private http: HttpClient) {}

  getByStudio(studioId: string): Observable<GymClass[]> {
    return this.http.get<GymClass[]>(`${this.apiUrl}/studio/${studioId}`);
  }

  getById(id: string): Observable<GymClass> {
    return this.http.get<GymClass>(`${this.apiUrl}/${id}`);
  }

  create(studioId: string, gymClass: any): Observable<GymClass> {
    return this.http.post<GymClass>(`${this.apiUrl}/studio/${studioId}`, gymClass);
  }

  update(gymClass: any): Observable<GymClass> {
    return this.http.put<GymClass>(this.apiUrl, gymClass);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
