import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // Propriétés pour stocker les données de l'utilisateur
  user = {
    username: '',
    email: '',
    password: ''
  };
  
  isLoading = false; // Pour gérer l'état de chargement
  isRegisterFailed = false; // Pour indiquer l'échec de l'inscription
  errorMessage = ''; // Pour stocker le message d'erreur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Code d'initialisation, si nécessaire
  }

  // Méthode pour enregistrer un nouvel utilisateur
  register(): void {
    console.log(this.user); // Affiche les informations de l'utilisateur dans la console

    this.isLoading = true; // Démarre l'état de chargement
    this.isRegisterFailed = false; // Réinitialise l'état d'échec

    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Utilisateur enregistré avec succès :', response);
        this.router.navigate(['/login']); // Redirige vers la page de connexion
      },
      error: (error) => {
        this.isLoading = false; // Arrête l'état de chargement
        this.isRegisterFailed = true; // Indique que l'inscription a échoué
        this.errorMessage = error.error?.message || 'Erreur inconnue lors de l\'inscription.'; // Récupère le message d'erreur
        console.error('Erreur lors de l\'inscription de l\'utilisateur :', error); // Affiche l'erreur dans la console
      }
    });
  }
}
