import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Body } from '@angular/http/src/body';




@Injectable()
export class ApiService extends BaseService  {
  private baseApi: string =   'http://192.168.0.248:53169/api/';         //'http://172.16.210.101:53169/api/'    ;// 'http://169.254.193.167:53169/api/';  // 'http://localhost:53169/api/';      <--- eigen ip address invullen 

  token2 :Token ;
  Body :any ;

  constructor(private http: Http) {
    super();
  }



  GetPlayer(id: string): Observable<Players[]> {
    const authToken = localStorage.getItem('access_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    /*return this.http.get(this.baseApi + 'player/' + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }*/
   return this.http.get(`http://192.168.0.247:53169/api/player/${id}`,options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  GetPlayer2(): Observable<Players[]> {
   /* const authToken = localStorage.getItem('access_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    /*return this.http.get(this.baseApi + 'player/' + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }*/
  

      return this.http.get(this.baseApi + 'player' )//, options)
      .map(res => res.json())
      .catch(this.handleError);
  
  }

  

GetToken(){
  var request = require("request");

var options = { method: 'POST',
  url: 'https://inias.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"OH6LtWPu6p2u4VSnSwnp4PnaexbUUgzw","client_secret":"tRpfMy--Vv3b2rlNFNLwMqVey2YAVj4W0dy3C33VaJrfaPdzGOInqbXbDtijinn0","audience":"https://AntwerpRisk/api","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  this.token2 = body;
  console.log(this.token2)
});
}



TestApi(){
  var request = require("request");
console.log("test word gedrukt");
var options = { method: 'GET',
  url: 'http://192.168.0.247:53169/api/player',  /**api/values',*/
  headers: { authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZ3dSRVl3TkRjMk56aENOMFUwTXprek5rUTJRemxDUTBFNVJrTTRRVGsyUmpCRVF6TTRRUSJ9.eyJpc3MiOiJodHRwczovL2luaWFzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJPSDZMdFdQdTZwMnU0VlNuU3ducDRQbmFleGJVVWd6d0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BbnR3ZXJwUmlzay9hcGkiLCJpYXQiOjE1NDI2NTY2MzksImV4cCI6MTU0Mjc0MzAzOSwiYXpwIjoiT0g2THRXUHU2cDJ1NFZTblN3bnA0UG5hZXhiVVVnenciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.NW_6_MtmEg5xm9mY5d4V0du3zbk6dVnIkoxZkKczF3-YeeNmCAIDfs7NpkglFBwSGOftft634c3Kk2Mei18C1Bc1zdqAvJ31tCnrsCtQiuBBpYt0g3mJ9saVkBlD8Bev7NzePB47Us6E2cQ4Z8H6hNb74H-SzCBCixpQxrVqsazDPxQv4tS1gc4x-gkzA5hqM2tiY-AYH67qZ5KLwxtf6O-tTDKiGNhQDuXjKRev6enr9Syzer04yHyxLmHDe4NpuQ6KoXDjkiHNsRi2x9j2spwBBt7NLnlEw-ZmjmEoUC9B3jOYVoQu7FZeFq9n-0MCzNr0kRBY4pLrek9EL3Lp-Q` } };

request(options, function (error, response, body) {
  this.Body = body;
  console.log("hello your in1");
  if (error) throw new Error(error);
  this.Body = body;
  console.log("hello your in2");
  console.log(body);
});
console.log(this.Body);
console.log("komt tot einde");
console.log(this.token2);


}

tokenA :Token;
TestAll(){
  
  var request = require("request");

var options = { method: 'POST',
  url: 'https://inias.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"OH6LtWPu6p2u4VSnSwnp4PnaexbUUgzw","client_secret":"tRpfMy--Vv3b2rlNFNLwMqVey2YAVj4W0dy3C33VaJrfaPdzGOInqbXbDtijinn0","audience":"https://AntwerpRisk/api","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  this.tokenA = body;

  var request = require("request");
  var options = { method: 'GET',
    url: 'http://192.168.0.247:53169/api/player',  /**api/values',*/
    headers: { authorization: `${this.tokenA.access_token}` } };
  
  request(options, function (error, response, body) {
    console.log("test1");

    if (error) throw new Error(error);
    console.log("test2");
    console.log(body);
  });
 
  console.log("einde");

});
}

}


export interface Players{
    PlayerId: string;
    PlayerUsername: string;
    PlayerEmail: string;
  }

  export interface Token{
    access_token: string;
    expires_in: number;
    token_type: string;
  }