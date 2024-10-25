import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  constructor(private http:HttpClient) { }
  private  url = 'http://localhost:5000/comm';
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  commbyid(id:any){
    return this.http.get(this.url+'/getcommbyidform/'+id,{ headers: this.headers })
  }
}
