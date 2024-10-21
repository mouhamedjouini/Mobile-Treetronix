import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { ReclamationService } from '../reclamation.service';
import { Router } from '@angular/router';
export enum TypeReclamation {
  SAV = 'SAV',
  occasionnelle = 'occasionnelle'
}
@Component({
  selector: 'app-add-rec',
  templateUrl: './add-rec.page.html',
  styleUrls: ['./add-rec.page.scss'],
})
export class AddRecPage implements OnInit {
  isLoading: any;


  constructor(private auth : AuthService,private storageService : TokenStorageService,private reclamationService  : ReclamationService , private router : Router , private authService :AuthService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  TypeReclamationOptions: TypeReclamation[] = [
    TypeReclamation.SAV,
    TypeReclamation.occasionnelle
  ]; 
  user:any;
  reclamation={
  
    "name": "",
    "Serie": "",
    "description": "",
    "piecejointe": "",
    "user": "",
    "Date":"",
  "typereclamation": TypeReclamation.SAV

  }
  image : any;
  currentuser:any
selectedimage(event:any){
  this.image=event.target.files[0];
console.log(event.target.files[0]);

}
getCurrentUser(): void {

  const user2 =this.storageService.getUserData();
  console.log(user2)
  const id = user2._id;
  this.auth.userbyid(id).subscribe({
    next:data=>{
      this.currentuser=data
      console.log(data)
    }
    ,error:err=>{
      console.log(err)

    }
    
  })
}
ajouter() {
  this.isLoading = true; // Démarrage du spinner pendant le traitement

    // Simulation d'une opération asynchrone (comme un appel API)
    setTimeout(() => {
      this.isLoading = false; // Arrêter le spinner après l'opération
      console.log('Réclamation ajoutée avec succès !');
    }, 2000);
  const user2 =this.storageService.getUserData();
  const id = user2._id;
  this.reclamation.user = id;
  console.log(this.reclamation)
  let formData = new FormData();
  formData.append('user', this.reclamation.user);
  formData.append('name', this.reclamation.name);
  formData.append('Serie', this.reclamation.Serie);
  formData.append('Date', this.getcurrentdate());
  formData.append('description', this.reclamation.description);
  formData.append('piecejointe', this.image);
  formData.append('typereclamation', this.reclamation.typereclamation.toString());

console.log(formData.getAll)
  this.reclamationService.ajouter(formData).subscribe(
    (res) => {
      console.log(res);
      
      this.router.navigate(['/list-rec']);
    },
    (err) => {
      console.log('Erreur lors de l\'ajout de la réclamation:', err);
      
    }
  );
}
getcurrentdate() {
  return new Date().toISOString(); 
}
selectedImage(event: any) {
  this.image = event.target.files[0];
  console.log(event.target.files[0]);
}

}



