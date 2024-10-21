import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = { username: '', password: '' };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  token: any | undefined;
  role: any;
  isLoading = false;  // Ajout pour indiquer si le système est en train de traiter la connexion

  constructor(private authService: AuthService , private storageService: TokenStorageService ,private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}

  login(): void {
    this.isLoading = true;  // Activer l'indicateur de chargement
    this.authService.login(this.user).subscribe({
      next: (data: any) => {
        this.token = data.token; 
        if (this.token) {
          localStorage.setItem('token', this.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          const user2 = this.storageService.getUserData();
          const id = user2._id;
  
          this.authService.getrole(id).subscribe(
            (response: any) => {
              this.role = response.role;
  
              if (this.role == 'User') {
                this.router.navigate(['/list-rec']);
              } else {
                this.router.navigate(['/login']);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.errorMessage = 'Le jeton est indéfini';
          this.isLoginFailed = true;
        }
        this.isLoading = false;  // Désactiver l'indicateur de chargement après le succès ou l'échec
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoading = false;  // Désactiver l'indicateur de chargement après une erreur
      }
    });
  }
}

