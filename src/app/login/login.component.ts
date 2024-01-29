import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';
  errorMessage: string = '';

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  OnUserLogin(){
    if (this.email == ''){
      alert('please enter your email');
      return;
    }

    if (this.password == ''){
      alert('please enter your password');
      return;
    }

  this.auth.login({email: this.email, password: this.password}).subscribe({

    next: (response) => {
      const token = response.access;
      this.auth.saveToken(token);
      this.router.navigate(['/dashboard']);

    },
    error: (error) => {
      console.error('Login failed', error);
      this.errorMessage = 'Invalide email or password';
    }
  })

  this.email = '';
  this.password = '';
  }
  OnSignInWithGoogle(){
    // this.auth.googleSignIn();
  }
}
