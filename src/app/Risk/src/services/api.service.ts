import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';



@Injectable()
export class ApiService extends BaseService  {
  private baseApi: string = 'http://169.254.193.167:53169/api/';  // 'http://localhost:53169/api/';      <--- eigen ip address invullen 

  constructor(private http: Http) {
    super();
  }

  GetPlayer(id: string): Observable<Player> {
    const authToken = localStorage.getItem('access_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'player/' + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  
}


export interface Player{
    PlayerId: string;
    PlayerUsername: string;
    PlayerEmail: string;
  }