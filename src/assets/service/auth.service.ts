import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private baseUrl = 'https://jsonplaceholder.typicode.com'; // Demo base URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): boolean {
    // Placeholder login logic
    if (email === 'user@example.com' && password === 'password123') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatus():boolean{
    return true
  }

 

  // Generic error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Give points to a user
  async givePoints(userId: number, points: number): Promise<any> {
    try {
      const url = `${this.baseUrl}/points`;
      const payload = { userId, points };
      return await this.http.post(url, payload).toPromise();
    } catch (error:any) {
      this.handleError(error);
    }
  }

  // Create an event
  async createEvent(eventData: any): Promise<any> {
    try {
      const url = `${this.baseUrl}/events`;
      return await this.http.post(url, eventData).toPromise();
    } catch (error:any) {
      this.handleError(error);
    }
  }

  // Send event notification
  async sendEventNotification(eventId: number, message: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/events/${eventId}/notify`;
      const payload = { message };
      return await this.http.post(url, payload).toPromise();
    } catch (error:any) {
      this.handleError(error);
    }
  }

  // Send an alert
  async sendAlert(alertData: any): Promise<any> {
    try {
      const url = `${this.baseUrl}/alerts`;
      return await this.http.post(url, alertData).toPromise();
    } catch (error:any) {
      this.handleError(error);
    }
  }

  // Fetch data with RxJS and error handling
  getDataObservable(): Observable<any> {
    return this.http.get(this.baseUrl + '/posts').pipe(
      catchError(this.handleError)
    );
  }
}