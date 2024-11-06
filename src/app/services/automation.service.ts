import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  startAutomation(system: 'slate' | 'erp'): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/${system}`, {});
  }
}