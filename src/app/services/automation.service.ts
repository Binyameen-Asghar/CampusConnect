import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {
  private apiUrl = 'https://campusconnect-u3ax.onrender.com/api';

  constructor(private http: HttpClient) {}

  startAutomation(system: 'slate' | 'erp'): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/${system}`, {});
  }
}