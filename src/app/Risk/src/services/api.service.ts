import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HTTP } from '@ionic-native/http';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { Body } from '@angular/http/src/body';
import { ContentType } from '@angular/http/src/enums';
import "rxjs/Rx";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map' ;
import { Http2Server } from 'http2';



@Injectable()
export class ApiService extends BaseService  {
  private baseApi: string =   'http://172.16.155.154:53169/api';         //'http://172.16.210.101:53169/api/'    ;// 'http://169.254.193.167:53169/api/';  // 'http://localhost:53169/api/';      <--- eigen ip address invullen 

  AuhtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZ3dSRVl3TkRjMk56aENOMFUwTXprek5rUTJRemxDUTBFNVJrTTRRVGsyUmpCRVF6TTRRUSJ9.eyJpc3MiOiJodHRwczovL2luaWFzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJPSDZMdFdQdTZwMnU0VlNuU3ducDRQbmFleGJVVWd6d0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BbnR3ZXJwUmlzay9hcGkiLCJpYXQiOjE1NDMwNzA3MzgsImV4cCI6MTU0MzE1NzEzOCwiYXpwIjoiT0g2THRXUHU2cDJ1NFZTblN3bnA0UG5hZXhiVVVnenciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.QMt7oHNpHNRqcRTqtL8nsp-gHGpJrRdMH3hRlDr86N1QVE-8kuSRL0L0CAUTOEiro4UbidmzAHLfAhwKFwizlSlToB1dV81_hakFks06Tak_2w3UXoy_MotjdfenxOJGnMPiCYGuOPEIzkK-0JyP_mi2-wPwHDJ2cpPkGOBnyu0WKmX-Mev5-hR6BVy1B5Sqwdtvw5pU6D_nMFvOlnF5DQjZ0kyyQ1enlKbMkNmS9HFS--SN2d2qDPwjIUXu4PLlnhvy88F2oW5wGNZBJ8JrgMbcV65PfqBkG463p3laxR6KM2AFZLh_-BoeXpFDAwhctFBiUs177onlelz62A-apA";
  token2 :Token ;
  Body :any ;

  constructor(private http2: Http, private http: HttpClient) {
    super();
  }



  GetPlayer(id: string): Observable<Players[]> {
    const authToken = `${this.AuhtToken}`//localStorage.getItem('access_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    /*return this.http.get(this.baseApi + 'player/' + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }*/
   return this.http2.get(`${this.baseApi}/player/${id}`,options)
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
  

      return this.http2.get(this.baseApi + '/player' )//, options)
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
  url: `${this.baseApi}/player`,  /**api/values',*/
  headers: {   "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*", 'content-type': 'application/json' , Authorization: `Bearer ${this.AuhtToken}` } };

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
//console.log(this.token2.access_token);


}

testapi2(){
var request = require("request");

var options = { method: 'GET',
  url: `${this.baseApi}/player`, 
  headers: { 'content-type': 'application/json',
             authorization: `Bearer ${this.AuhtToken}` }     
            };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
console.log("getest");
}


testdata(){
  var request = require("request");

var options = { method: 'GET', url: `${this.baseApi}/player` ,
               headers: { 'content-type': 'application/json' },
};
console.log("gedrukt testdata")

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}

testdata2(): Observable<Players[]>{
  /*const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZ3dSRVl3TkRjMk56aENOMFUwTXprek5rUTJRemxDUTBFNVJrTTRRVGsyUmpCRVF6TTRRUSJ9.eyJpc3MiOiJodHRwczovL2luaWFzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJPSDZMdFdQdTZwMnU0VlNuU3ducDRQbmFleGJVVWd6d0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BbnR3ZXJwUmlzay9hcGkiLCJpYXQiOjE1NDMwMDY4MDYsImV4cCI6MTU0MzA5MzIwNiwiYXpwIjoiT0g2THRXUHU2cDJ1NFZTblN3bnA0UG5hZXhiVVVnenciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.r3ZPYvHo_uZGjY-LA5z1g3EMaY57qrXV5qbH210_dn_paBuCusnyAz2ncXdEZvyiZhpv4DG23iHrZevMCV1dqfIpW1JD1UIIp_G1gVEami-upJry1T7NFXJtj7eqGEzqAgyTEn_Vj1yVrSLJm9FvJ8ywLkyRA4I8YswnIc8rS2F9LRcNWUhvEEky-YLZZvMBmfhmgDU6lZa1Bo_ZGLkYUroJoXJnQ6UCFS1xv_QW3X_yZyON7OPiUDjEle9MLjJztbJ-TemwUtJlhFbDXg0HszHUrZyK0S51afEzxZnZE7PBLiHZsw12Bo0EZTFmjcSW-3qiXmvmSosmhOkFRZ0CUg"//localStorage.getItem('access_token');
  let headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${authToken}`);
  let options = new RequestOptions({ headers: headers });


console.log("gedrukt testdata2")

 return this.http.get(`${this.baseApi}/values`,options)
    .map(res => res.json())
    .catch(this.handleError);*/
    console.log("gedrukt testdata2")
    return this.http2.get(`${this.baseApi}/player`)
    .map(res => res.json())
    .catch(this.handleError);
    
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
    url: `${this.baseApi}/player`,  /**api/values',*/
    headers: { authorization: `${this.tokenA.access_token}` } };
  
    return this.http.get(`${this.baseApi}/player/`,options.headers)
    .map(res => res.json())
    .catch(this.handleError);
/*

  request(options, function (error, response, body) {
    console.log("test1");

    if (error) throw new Error(error);
    console.log("test2");
    console.log(body);
  });
  
  console.log("einde");
*/
});

}


testFIX():Observable<Players[]>{

return this.http.get<Players[]>(`${this.baseApi}/player/1`)
//.map(res => res)
//.catch(this.handleError);
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