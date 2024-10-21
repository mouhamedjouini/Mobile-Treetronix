import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http : HttpClient) { }
  private  url = 'http://localhost:5000/form';
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  ajouter( reclamation: any){
    console.log(reclamation)
    return this.http.post(this.url +'/ajouter',reclamation)
  }
  updatestatus( reclamationId: any,newStatus:any){
   
    return this.http.patch(`${this.url}/update/${reclamationId}/${newStatus}`, {})
  }
  getall():Observable<any>{
    return this.http.get<any>(this.url +'/all')
  }
  formbyid(id:any):Observable<any>{
    return this.http.get(this.url+'/getbyid/'+id,{ headers: this.headers })
  }
  claimbyiduser(id:any):Observable<any>{
    return this.http.get(this.url+'/getbyiduser/'+id,{ headers: this.headers })
  }
}
