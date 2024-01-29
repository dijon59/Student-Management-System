import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { ToastService } from './toastr.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/'

  constructor(private http: HttpClient) { }

  //login method

  login(data): Observable<any> {
    return this.http.post(this.apiUrl + 'login/', data);
  }

  saveToken(token: string): void {
    localStorage.setItem('access', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  logout(): void {
    localStorage.removeItem('access');
  }

  isAuthenticated(): boolean {
    // Check if the token exists and is not expired
    const token = this.getToken();
    return !!token;
  }

  // students

  addStudent(data, token): Observable<any> {
    return this.http.post(this.apiUrl + 'students/', data, {headers: { Authorization: 'Bearer ' + token}});
  }

  fetchStudents(token: string): Observable<any> {
    return this.http.get(this.apiUrl, { headers: { Authorization: 'Bearer ' + token}});
  }

  fetchSpecificStudent(studentId, token: string): Observable<any> {
    return this.http.get(this.apiUrl + 'student/');
  }



 //register method

 //sign out method

  // logout() {
  //   this.OnShowUserLoggedOutInfo();
  //   this.fireauth.signOut().then(() =>{
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //   })
}
