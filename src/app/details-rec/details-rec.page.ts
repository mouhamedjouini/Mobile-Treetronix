import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../reclamation.service';
import { CommService } from '../comm.service';
import { TokenStorageService } from '../token-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-details-rec',
  templateUrl: './details-rec.page.html',
  styleUrls: ['./details-rec.page.scss'],
})
export class DetailsRecPage implements OnInit {

  constructor(private auth: AuthService,private storageService: TokenStorageService,private route:ActivatedRoute,private _reclamation: ReclamationService,private _comm:CommService) { }
id:any
commst: any; 
  image: any; 
  currentuser: any; 
  form: any; 
  comms = {
    form: "",
    description: "",
    piecejointe: "",
    user: "",
    Date: ""
  };
  ngOnInit() {
   this.id= this.route.snapshot.paramMap.get('id')
   console.log(this.id )
   this.commbyid(this.id);
   this.formbyid(this.id);
   this.getCurrentUser();
  }
  getCurrentUser(): void {
    const user2 = this.storageService.getUserData();
    console.log(user2);
    const id = user2._id;
    this.auth.userbyid(id).subscribe({
      next: data => {
        this.currentuser = data;
        console.log(data);
        // Vérification du rôle
        this.currentuser.isAdmin = this.currentuser.Roles.includes('Admin'); 
      console.log("aaaa"+this.currentuser.isAdmin)
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getcurrentdate() {
    return new Date().toISOString(); 
  }
// Récupérer les détails de la réclamation par ID
formbyid(id: any) {
  this._reclamation.formbyid(this.id).subscribe({
    next: (data) => {
      this.form = data;
      console.log(this.form);
    },
    error: (err) => {
      console.log(err);
    }
  });
}
commbyid(id: any) {
  this._comm.commbyid(this.id).subscribe({
    next: (data) => {
      this.commst = data;
      console.log(this.commst);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}
